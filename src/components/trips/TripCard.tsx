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
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lift hover:-translate-y-2 relative border border-border bg-card">

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-destructive text-destructive-foreground font-semibold border-0 shadow-md">
            -20% OFF
          </Badge>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
          <button
            onClick={handleWishlistClick}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-background/80 backdrop-blur-md text-muted-foreground hover:text-destructive shadow-sm transition-all hover:scale-110 active:scale-95 border border-border"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
          </button>
        </div>

        <Link to={`/trips/${trip.id}`} className="block relative aspect-[4/3] overflow-hidden">
          <img
            src={trip.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'}
            alt={trip.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Subtle gradient overlay at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <CardContent className="p-5 flex flex-col min-h-[200px]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/10">
              <MapPin className="h-3 w-3" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">
              <Star className="mr-1 h-3.5 w-3.5 fill-yellow-500 text-yellow-600" />
              <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{trip.rating.toFixed(1)}</span>
            </div>
          </div>

          <Link to={`/trips/${trip.id}`}>
            <h3 className="font-bold text-xl line-clamp-1 mb-2 group-hover:text-primary transition-colors text-foreground">
              {trip.title}
            </h3>
          </Link>

          <div className="flex items-center text-sm text-muted-foreground mb-6 font-medium">
            <Clock className="mr-1.5 h-4 w-4 text-muted-foreground/60" />
            {trip.durationDays} Days / {trip.durationDays - 1} Nights
          </div>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Starting from</span>
              <span className="font-extrabold text-2xl text-primary leading-none">${trip.price}</span>
            </div>
            <Link to={`/trips/${trip.id}`}>
              <Button size="sm" className="rounded-full px-5 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all" onClick={(e) => e.stopPropagation()}>
                Enquire Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
