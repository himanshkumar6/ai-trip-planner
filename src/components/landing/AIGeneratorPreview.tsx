import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/layouts/Container";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Wallet, Sparkles, Navigation, Loader2, AlertCircle } from "lucide-react";
import { generateTrip } from "@/services/aiTripService";

export function AIGeneratorPreview() {
  const [destination, setDestination] = useState("Goa");
  const [duration, setDuration] = useState("4 Days");
  const [budget, setBudget] = useState("₹25,000");

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col max-w-xl"
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
              {/* Subtle container glow */}
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

          {/* Right Column: Preview Panel */}
          <div className="relative h-full min-h-[500px] flex items-center justify-center">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10 w-full max-w-md bg-destructive/10 border border-destructive/20 p-6 rounded-2xl flex flex-col items-center text-center backdrop-blur-sm"
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
                  className="text-center relative z-10 p-8 border-2 border-dashed border-border/50 rounded-3xl w-full max-w-sm backdrop-blur-sm"
                >
                  <Navigation className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-medium">Your generated itinerary will appear here</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative z-10 w-full max-w-md bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl overflow-hidden"
                >
                  {/* Glowing header */}
                  <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-lg">AI Generated Trip</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="bg-background/50 px-2 py-1 rounded-md">{destination}</span>
                      <span className="bg-background/50 px-2 py-1 rounded-md">{duration}</span>
                      <span className="bg-background/50 px-2 py-1 rounded-md">{budget}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="whitespace-pre-wrap text-sm text-foreground max-h-[350px] overflow-y-auto pr-2 custom-scrollbar leading-relaxed">
                      {aiResult ? aiResult : (
                        <p className="italic text-muted-foreground">No itinerary data could be extracted.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </Container>
    </section>
  );
}
