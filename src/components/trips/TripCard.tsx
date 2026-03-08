import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trip } from '@/types';
import { useWishlistStore } from '@/store/index';
import { Button } from '@/components/ui/Button';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const { hasInWishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = hasInWishlist(trip.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the trip detail page
    toggleWishlist(trip.id);
  };

  return (
    <div className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative border border-border/50 bg-card rounded-2xl flex flex-col">

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-destructive text-destructive-foreground font-semibold border-0 shadow-md">
            -20% OFF
          </Badge>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
          <button
            onClick={handleWishlistClick}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50 backdrop-blur-md text-white hover:text-destructive hover:bg-background/80 shadow-sm transition-all hover:scale-110 active:scale-95 border border-white/20"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
          </button>
        </div>

        <Link to={`/trips/${trip.id}`} className="block relative aspect-[4/3] overflow-hidden">
          <img
            src={trip.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'}
            alt={trip.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
        </Link>

        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 backdrop-blur-sm -mt-10 z-10">
              <MapPin className="h-3 w-3" />
              <span>{trip.destination}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-2 py-1 rounded-full border border-border shadow-sm -mt-10 z-10">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-bold text-foreground">{trip.rating.toFixed(1)}</span>
              <span className="text-[10px] text-muted-foreground font-medium">({trip.reviewsCount || 0})</span>
            </div>
          </div>

          <Link to={`/trips/${trip.id}`}>
            <h3 className="font-bold text-xl line-clamp-1 mb-2 group-hover:text-primary transition-colors text-foreground">
              {trip.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-medium">
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4 text-primary/80" />
              {trip.durationDays} Days, {trip.durationDays - 1} Nights
            </div>
            {trip.category && (
              <span className="text-xs font-semibold bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground">{trip.category}</span>
            )}
          </div>

          {(trip.attractions && trip.attractions.length > 0) ? (
            <div className="mb-5 line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
              <span className="font-semibold text-foreground/70">Includes: </span>
              {trip.attractions.join(', ')}
            </div>
          ) : (
            <div className="mb-5 line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
              <span className="font-semibold text-foreground/70">Includes: </span>
              Premium Accommodation, Guided Tours, Daily Breakfast
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Est. Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-xl sm:text-2xl text-foreground leading-none">${trip.price}</span>
                  <span className="text-xs text-muted-foreground">/ person</span>
                </div>
              </div>
            </div>
            <Link to={`/trips/${trip.id}`} className="w-full">
              <Button size="default" className="w-full rounded-xl font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.98]" onClick={(e) => e.stopPropagation()}>
                View Trip Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
