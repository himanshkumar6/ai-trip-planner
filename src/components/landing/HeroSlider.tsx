import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// High-quality Pixabay / Unsplash images representing India AI travel destinations
const images = [
  {
    url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop",
    title: "Taj Mahal, Agra",
    alt: "Beautiful view of the Taj Mahal at sunrise",
  },
  {
    url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop",
    title: "Beaches of Goa",
    alt: "Serene sandy beach in Goa with palm trees",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    title: "Himalayan Mountains",
    alt: "Snow-capped peaks of the Himalayas",
  },
  {
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
    title: "Kerala Backwaters",
    alt: "Tranquil backwaters in Kerala",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-slide every 10 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
      {/* 
        We map through all images to avoid flashing/layout shift on load. 
        Only the active image has opacity 1. This ensures images are preloaded gracefully.
      */}
      {images.map((img, idx) => (
        <motion.img
          key={idx}
          src={img.url}
          alt={img.alt}
          initial={false}
          animate={{
            opacity: idx === currentIndex ? 1 : 0,
            scale: idx === currentIndex ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          loading={idx === 0 ? "eager" : "lazy"} // Eager load the first one for performance
        />
      ))}

      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-0 drop-shadow-lg">
              {images[currentIndex].title}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex gap-2 sm:gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/20 ${
              idx === currentIndex
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 w-2 sm:w-2.5 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
