import { Review } from '@/types';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 italic">No reviews yet for this trip.</p>;
  }

  return (
    <div className="space-y-4 shadow-none">
      {reviews.map((review) => (
        <Card key={review.id} className="shadow-none border border-gray-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
                  {review.userAvatar ? (
                    <img src={review.userAvatar} alt={review.userName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                      {review.userName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{review.userName}</h4>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-200'
                      }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{review.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
