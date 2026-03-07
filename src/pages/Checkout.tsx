import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrip, useUserBookings } from '@/hooks/useQueryHooks';
import { useAuthStore, useBookingStore } from '@/store';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Users, Loader2, Info } from 'lucide-react';
import { createBooking } from '@/services/firestoreService';
import { loadRazorpayScript, createRazorpayOrder, verifyPayment } from '@/services/razorpayService';

// Tell TypeScript about the window.Razorpay object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: trip, isLoading: isTripLoading } = useTrip(id || '');
  const { user } = useAuthStore();
  const { guests, selectedDate, resetBooking } = useBookingStore();
  const { refetch: refetchBookings } = useUserBookings(user?.uid || '');

  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalPrice = (trip?.price || 0) * guests;

  const handlePayment = async () => {
    if (!user || !trip) return;

    setIsProcessing(true);

    try {
      // 1. Load Razorpay SDK
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      // 2. Create Order on our (mock) backend
      const order = await createRazorpayOrder({
        amount: totalPrice,
        currency: 'USD',
        tripId: trip.id
      });

      // 3. Initialize Razorpay options
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Mock key for frontend-only demo
        amount: order.amount.toString(),
        currency: order.currency,
        name: 'AI Trip Planner',
        description: `Booking for ${trip.title}`,
        image: trip.imageUrl,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 4. Verify Signature (Mock)
            const isVerified = await verifyPayment(response);

            if (isVerified) {
              // 5. Create Booking in Firestore
              await createBooking({
                userId: user.uid,
                tripId: trip.id,
                guests,
                totalPrice,
                paymentStatus: 'completed',
              });

              // 6. Confirmation UX
              refetchBookings();
              resetBooking();
              setSuccess(true);

              // Redirect after showing success
              setTimeout(() => {
                navigate('/dashboard', { replace: true });
              }, 2000);
            } else {
              alert('Payment signature verification failed.');
              setIsProcessing(false);
            }
          } catch (err) {
            console.error('Booking Error:', err);
            alert('An error occurred during booking creation.');
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
        },
        theme: {
          color: '#0EA5A4', // Our Teal Primary
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);

      // Handle early failure (e.g. invalid key in strict mode)
      paymentObject.on('payment.failed', function (response: any) {
        console.error('Payment Failed', response.error);
        alert(`Payment Failed: ${response.error.description || 'Unknown Error'}`);
        setIsProcessing(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('An error occurred opening the checkout window.');
      setIsProcessing(false);
    }
  };

  if (isTripLoading) {
    return (
      <PageWrapper className="bg-gray-50 flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </PageWrapper>
    );
  }

  if (!trip) {
    return (
      <PageWrapper className="bg-gray-50 flex flex-col items-center justify-center py-32">
        <h2 className="text-2xl font-bold mb-4">Trip not found</h2>
        <Button onClick={() => navigate('/search')}>Browse Trips</Button>
      </PageWrapper>
    );
  }

  if (success) {
    return (
      <PageWrapper className="bg-saas-gradient flex flex-col items-center justify-center py-40 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-soft">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Payment Successful!</h2>
        <p className="text-gray-500 max-w-sm mb-8">Your booking for {trip.title} has been confirmed. Redirecting you to your dashboard...</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-saas-gradient min-h-screen py-10 lg:py-16">
      <Container className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="shadow-soft overflow-hidden border-0 ring-1 ring-gray-100">
              <div className="relative h-48 w-full">
                <img src={trip.imageUrl} alt={trip.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{trip.title}</h3>
                  <div className="flex items-center text-sm font-medium opacity-90">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.destination}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-medium">Date</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedDate ? selectedDate.toLocaleDateString() : 'To be confirmed'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-medium">Guests</span>
                  </div>
                  <span className="font-bold text-gray-900">{guests}</span>
                </div>

                <div className="mt-6 bg-blue-50/50 rounded-lg p-4 flex items-start">
                  <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    By completing this booking, you agree to our Terms of Service and Cancellation Policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Details */}
          <div>
            <Card className="shadow-lift border-0 sticky top-24">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Price (x{guests})</span>
                    <span className="font-medium text-gray-900">${(trip.price * guests).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees</span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/30"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${totalPrice.toFixed(2)}`
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">Secured by Razorpay</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
