import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/layouts/Container";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Wallet, Sparkles, Navigation, Loader2, AlertCircle, Clock } from "lucide-react";
import { generateTrip } from "@/services/aiTripService";
import ReactMarkdown from "react-markdown";

interface ItineraryDay {
  dayStr: string;
  title: string;
  content: string;
}

interface ParsedItinerary {
  intro: string;
  days: ItineraryDay[];
}

function parseItinerary(markdown: string): ParsedItinerary {
  const result: ParsedItinerary = { intro: "", days: [] };
  const lines = markdown.split('\n');
  let currentDay: ItineraryDay | null = null;

  // Regex matches things like: "Day 1", "Day 01", "**Day 1**:", "### Day 2 - Activity" 
  const dayRegex = /^(?:#{1,6}\s*|\*\*\s*|\-\s*\*\*\s*)?(Day\s+\d+)(?:[:\-\|]\s*|\s+-\s+|\s*)(.*?)(?:\*\*|\*|:)?$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.trim().match(dayRegex);

    if (match) {
      currentDay = {
        dayStr: match[1].trim(),
        title: match[2] ? match[2].trim() : "",
        content: ""
      };
      result.days.push(currentDay);
    } else {
      if (currentDay) {
        currentDay.content += line + '\n';
      } else {
        result.intro += line + '\n';
      }
    }
  }

  return result;
}

// Helper: contextual icons
function getActivityIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("beach")) return "🏝️";
  if (lowerTitle.includes("breakfast") || lowerTitle.includes("lunch") || lowerTitle.includes("dinner") || lowerTitle.includes("restaurant") || lowerTitle.includes("cafe") || lowerTitle.includes("food")) return "🍽️";
  if (lowerTitle.includes("temple") || lowerTitle.includes("church") || lowerTitle.includes("monument") || lowerTitle.includes("fort")) return "🏛️";
  if (lowerTitle.includes("market") || lowerTitle.includes("shopping") || lowerTitle.includes("mall")) return "🛍️";
  if (lowerTitle.includes("airport") || lowerTitle.includes("flight") || lowerTitle.includes("train") || lowerTitle.includes("travel")) return "✈️";
  if (lowerTitle.includes("hotel") || lowerTitle.includes("check-in") || lowerTitle.includes("resort")) return "🏨";
  if (lowerTitle.includes("sunset") || lowerTitle.includes("sunrise") || lowerTitle.includes("viewpoint")) return "🌅";
  if (lowerTitle.includes("party") || lowerTitle.includes("club") || lowerTitle.includes("nightlife")) return "🎉";
  return "📍";
}

interface Activity {
  time?: string;
  title: string;
  description: string;
}

function parseActivities(markdown: string): Activity[] {
  const lines = markdown.split('\n');
  const activities: Activity[] = [];
  let currentActivity: Activity | null = null;

  // Regex matches: "- **10:00 AM: Anjuna Beach**", "**Morning - Sightseeing**", or "* 10:00 AM: Beach"
  // Group 1: Time (optional), Group 2: Title/Location
  const activityRegex = /^(?:[\*\-]\s*)?(?:\*\*)?(?:([^:\*]+?)(?:[:\-]\s+))(.*?)(?:\*\*)?(.*?)$/i;
  const genericBoldRegex = /^(?:[\*\-]\s*)?\*\*(.*?)\*\*(.*?)$/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let match = trimmed.match(activityRegex);
    if (!match) match = trimmed.match(genericBoldRegex);

    if (match) {
      if (currentActivity) activities.push(currentActivity);

      if (match.length >= 4) {
        // Has time and title
        currentActivity = {
          time: match[1].trim(),
          title: match[2].trim(),
          description: match[3] ? match[3].trim() : ""
        };
      } else if (match.length === 3) {
        // Just bold title
        currentActivity = {
          title: match[1].trim(),
          description: match[2] ? match[2].trim() : ""
        };
      }
    } else {
      if (currentActivity) {
        currentActivity.description += "\n" + trimmed;
      } else {
        // Loose text before any bullet point
        activities.push({
          title: "Overview",
          description: trimmed
        });
      }
    }
  }
  if (currentActivity) activities.push(currentActivity);

  return activities;
}

function ActivityList({ content }: { content: string }) {
  const activities = parseActivities(content);

  if (activities.length === 0) {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {activities.map((activity, idx) => {
        // Fallback for loose markdown text
        if (activity.title === "Overview" && !activity.time) {
          return (
            <div key={idx} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 space-y-2">
              <ReactMarkdown>{activity.description.replace(/[*#]/g, '').trim()}</ReactMarkdown>
            </div>
          );
        }

        const icon = getActivityIcon(activity.title);

        return (
          <div key={idx} className="group bg-card/30 backdrop-blur-md border border-border/40 shadow-sm rounded-xl p-4 sm:p-5 hover:bg-card/50 transition-all duration-300 w-full flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Contextual Icon Container */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-background/80 border border-border/50 rounded-full flex items-center justify-center text-xl sm:text-2xl text-foreground">
              {icon}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-col items-start gap-1.5">
                {activity.time && (
                  <span className="inline-flex shrink-0 items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-muted text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    {activity.time.replace(/[*#]/g, '').trim()}
                  </span>
                )}
                <h5 className="font-semibold text-foreground text-base md:text-lg tracking-tight leading-snug mt-1">
                  {activity.title.replace(/[*#]/g, '').replace(/^-\s*/, '').trim()}
                </h5>
              </div>

              {activity.description && activity.description.trim() !== "[]" && (
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-prose text-muted-foreground leading-relaxed space-y-2 text-sm md:text-base">
                  <ReactMarkdown>{activity.description.replace(/^[-\s]*|:\s*$/g, '').trim()}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AIGeneratorPreview() {
  const [destination, setDestination] = useState("Goa");
  const [duration, setDuration] = useState("4 Days");
  const [budget, setBudget] = useState("₹25,000");

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parsedItinerary = useMemo(() => parseItinerary(aiResult), [aiResult]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowResult(false);
    setError(null);
    setAiResult("");

    try {
      const response = await generateTrip(destination, duration, budget);
      setAiResult(response);
      setShowResult(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-muted/30 relative overflow-hidden">
      <Container>
        <div className="flex flex-col max-w-4xl mx-auto gap-12 px-2 sm:px-6 w-full">

          {/* Top Section: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">AI Trip Planner</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
              Generate Your Perfect Trip With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">AI</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Tell us your destination, trip duration, and budget. Our AI will instantly craft the perfect travel itinerary for you.
            </p>

            <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-sm border border-border space-y-6 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" /> Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  >
                    <option value="Goa">Goa</option>
                    <option value="Manali">Manali</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Kashmir">Kashmir</option>
                  </select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4 text-primary" /> Trip Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  >
                    <option value="2 Days">2 Days</option>
                    <option value="4 Days">4 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="10 Days">10 Days</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                    <Wallet className="w-4 h-4 text-primary" /> Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  >
                    <option value="₹10,000">₹10,000</option>
                    <option value="₹25,000">₹25,000</option>
                    <option value="₹50,000">₹50,000</option>
                    <option value="₹1,00,000+">₹1,00,000+</option>
                  </select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-12 text-base font-semibold shadow-lift shadow-primary/20 overflow-hidden relative"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Magic...</>
                  ) : (
                    <><Sparkles className="w-5 h-5 mr-2" /> Generate Trip</>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section: Timeline Preview */}
          <div className="relative flex flex-col justify-start w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10 w-full bg-destructive/10 border border-destructive/20 p-6 rounded-2xl flex flex-col items-center text-center backdrop-blur-sm mt-8"
                >
                  <AlertCircle className="w-12 h-12 text-destructive mb-3" />
                  <h3 className="text-lg font-bold text-destructive mb-2">Generation Failed</h3>
                  <p className="text-sm text-destructive/80">{error}</p>
                </motion.div>
              ) : !showResult ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  className="text-center relative z-10 p-12 border-2 border-dashed border-border/50 rounded-3xl w-full backdrop-blur-sm mt-8"
                >
                  <Navigation className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-medium">Your generated itinerary will appear here</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-full mt-8"
                >
                  {/* Top Header Card */}
                  <div className="bg-card/80 backdrop-blur-xl border border-border shadow-lg rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-xl">AI Generated Trip</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Your perfect plan awaits.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="bg-background/80 px-3 py-1.5 rounded-lg font-medium border border-border/50">{destination}</span>
                      <span className="bg-background/80 px-3 py-1.5 rounded-lg font-medium border border-border/50">{duration}</span>
                    </div>
                  </div>

                  {parsedItinerary?.days && parsedItinerary.days.length > 0 ? (
                    <div className="space-y-10 sm:space-y-12 w-full pb-12">
                      {parsedItinerary.intro?.trim() && (
                        <div className="w-full">
                          <div className="bg-card/40 backdrop-blur-sm border border-border border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-muted-foreground prose prose-sm dark:prose-invert max-w-none prose-p:last:mb-0 w-full overflow-hidden">
                            <ReactMarkdown>
                              {parsedItinerary.intro}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}

                      {parsedItinerary.days.map((day, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          className="w-full flex flex-col gap-5 sm:gap-6"
                        >
                          {/* Day Header */}
                          <div className="flex flex-col gap-1 border-b border-border/50 pb-3 sm:pb-4 w-full">
                            <h4 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-snug">
                              {day.dayStr.replace(/[*#]/g, '').trim()}
                            </h4>
                            {day.title && (
                              <p className="text-base md:text-lg font-semibold text-primary uppercase tracking-wider">
                                {day.title.replace(/[*#]/g, '').replace(/^-\s*/, '').trim()}
                              </p>
                            )}
                          </div>

                          <div className="w-full">
                            <ActivityList content={day.content} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl p-6 md:p-8">
                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary-hover">
                        <ReactMarkdown>
                          {aiResult}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </Container>
    </section>
  );
}
