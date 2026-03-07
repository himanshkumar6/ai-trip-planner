import { useState, useMemo } from "react";
import { Container } from "@/layouts/Container";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchSuggestions } from "./SearchSuggestions";
import { TravelSlider } from "./TravelSlider";
import { SearchX } from "lucide-react";
import { TRIPS } from "@/data/trips";

const CATEGORIES = [
  "All",
  "Delhi",
  "Goa",
  "Kerala",
  "Rajasthan",
  "Himachal",
  "Kashmir",
];

export function TravelDealsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // State for the suggestions dropdown
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSelectedIndex, setSearchSelectedIndex] = useState(-1);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(""); // Selecting a category clears the search
    setIsSearchOpen(false);
  };

  const filteredTrips = useMemo(() => {
    return TRIPS.filter((trip) => {
      const matchesCategory =
        activeCategory === "All" || trip.category === activeCategory;

      const matchesSearch =
        searchQuery === "" ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute right-0 top-0 w-1/3 h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <Container>
        <div className="mb-12">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-10">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                Best holiday options
                <br className="hidden md:block" />
                <span className="text-primary font-extrabold text-transparent bg-clip-text bg-primary-gradient">
                  {" "}curated for you.
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Discover premium travel experiences selected by our AI for the ultimate getaway.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <SearchSuggestions
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setActiveCategory={setActiveCategory}
                trips={TRIPS}
                isOpen={isSearchOpen}
                setIsOpen={setIsSearchOpen}
                selectedIndex={searchSelectedIndex}
                setSelectedIndex={setSearchSelectedIndex}
              />
            </motion.div>
          </div>

          {/* Category Pills (Horizontal Scroll on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 custom-scrollbar-hidden"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lift border border-primary/20"
                    : "bg-card text-muted-foreground border border-border/50 hover:bg-muted/80 hover:text-foreground hover:border-border"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Travel Card Slider or Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative w-full min-h-[400px]"
        >
          {filteredTrips.length > 0 ? (
            <>
              {/* Slightly fade out edges for premium look on large screens */}
              <div className="absolute top-0 -left-4 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 hidden xl:block pointer-events-none" />
              <div className="absolute top-0 -right-4 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 hidden xl:block pointer-events-none" />

              {/* Note: We pass a key here based on filteredTrips.length so the embla carousel re-initializes properly when the card count jumps, preventing broken DOM offsets */}
              <TravelSlider key={filteredTrips.map(t => t.id).join(',')} cards={filteredTrips} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[2.5rem] border border-border/50 h-full text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <SearchX className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No trips found</h3>
              <p className="text-muted-foreground max-w-sm">
                We couldn't find any trips matching your current filters. Try selecting "All" or searching for a different destination.
              </p>
              <button
                onClick={() => handleCategoryClick("All")}
                className="mt-6 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-colors"
              >
                View all destinations
              </button>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
