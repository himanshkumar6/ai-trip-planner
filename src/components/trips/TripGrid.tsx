import { Trip } from '@/types';
import { TripCard } from './TripCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface TripGridProps {
  trips?: Trip[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function TripGrid({ trips = [], isLoading = false, skeletonCount = 6 }: TripGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-foreground">No trips found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search filters or browse our popular destinations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
