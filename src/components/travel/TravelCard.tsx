import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface TravelCardProps {
  image: string;
  destination: string;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  className?: string;
}

export function TravelCard({
  image,
  destination,
  rating,
  reviews,
  description,
  price,
  className,
}: TravelCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group h-full flex flex-col bg-card rounded-[2rem] border border-border/50 shadow-soft overflow-hidden hover:shadow-lift transition-shadow duration-300",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {/* Skeleton loading state */}
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse transition-opacity duration-500",
            imageLoaded ? "opacity-0 z-0" : "opacity-100 z-20"
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <img
          src={image}
          alt={destination}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
            // Provide a visual cue that it loaded even if fallback triggers
            setImageLoaded(true);
          }}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          )}
        />

        {/* Floating Rating Badge */}
        <div className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {destination}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            ({reviews.toLocaleString()} reviews)
          </span>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 flex-1 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Starting from
            </span>
            <span className="text-xl font-extrabold text-foreground">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
