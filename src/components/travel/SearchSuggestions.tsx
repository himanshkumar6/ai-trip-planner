import { useRef, useEffect, KeyboardEvent, useMemo } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Trip } from "@/data/trips";

interface SearchSuggestionsProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setActiveCategory: (val: string) => void;
  trips: Trip[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (val: number | ((prev: number) => number)) => void;
}

export function SearchSuggestions({
  searchQuery,
  setSearchQuery,
  setActiveCategory,
  trips,
  isOpen,
  setIsOpen,
  selectedIndex,
  setSelectedIndex,
}: SearchSuggestionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive top 5 matches dynamically based on destination or title
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    // Use a Map to ensure unique destinations in suggestions
    const uniqueMatches = new Map<string, Trip>();

    for (const trip of trips) {
      if (
        trip.destination.toLowerCase().includes(query) ||
        trip.title.toLowerCase().includes(query)
      ) {
        if (!uniqueMatches.has(trip.destination)) {
          uniqueMatches.set(trip.destination, trip);
        }
      }
      if (uniqueMatches.size >= 5) break;
    }

    return Array.from(uniqueMatches.values());
  }, [searchQuery, trips]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        typeof prev === "number" && prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (typeof prev === "number" && prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectSuggestion = (trip: Trip) => {
    setSearchQuery(trip.destination);
    setActiveCategory(trip.category);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={i} className="font-bold text-primary">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full md:w-80" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations, tours..."
          className="w-full pl-10 pr-4 py-3 rounded-full bg-card border-2 border-transparent focus:border-primary/30 focus:bg-background outline-none transition-all shadow-sm focus:shadow-md text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-card rounded-2xl shadow-xl border border-border overflow-hidden py-2"
          >
            <ul className="max-h-64 overflow-y-auto custom-scrollbar">
              {suggestions.map((suggestion, idx) => (
                <li
                  key={`${suggestion.id}-${idx}`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${selectedIndex === idx ? "bg-muted/50" : "hover:bg-muted/30"
                    }`}
                >
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${suggestion.category === "All"
                      ? "bg-purple-500/10 text-purple-500"
                      : "bg-blue-500/10 text-blue-500"
                      }`}
                  >
                    {suggestion.category === "All" ? (
                      <Navigation className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-sm text-foreground">
                    <div className="truncate">{highlightMatch(suggestion.title)}</div>
                    <span className="block text-xs text-muted-foreground capitalize truncate">
                      {suggestion.destination} • {suggestion.category}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
