import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Tent, CreditCard, Loader2 } from 'lucide-react';
import { useTrips, useAllBookings, useAllUsers } from '@/hooks/useQueryHooks';
import { cn } from '@/utils/cn';

export function AdminDashboard() {
  const { data: trips, isLoading: tripsLoading } = useTrips();
  const { data: bookings, isLoading: bookingsLoading } = useAllBookings();
  const { data: users, isLoading: usersLoading } = useAllUsers();

  const isLoading = tripsLoading || bookingsLoading || usersLoading;

  return (
    <PageWrapper className="bg-background min-h-screen py-8">
      <Container>
        <div className="mb-10 flex justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Admin Control Center</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage trips, monitor bookings, and platform activity.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lift transition-all duration-300 border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Trips</CardTitle>
                  <Tent className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-foreground">{trips?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active in catalog</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lift transition-all duration-300 border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Platform Bookings</CardTitle>
                  <CreditCard className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-foreground">{bookings?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Total records</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lift transition-all duration-300 border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Registered Users</CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-foreground">{users?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Includes administrators</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-smooth border-border overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <CardTitle className="font-bold">Recent Platform Bookings</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bookings?.slice(0, 5).map(booking => {
                      const trip = trips?.find(t => t.id === booking.tripId);
                      const user = users?.find(u => u.uid === booking.userId);
                      return (
                        <div key={booking.id} className="flex justify-between items-center p-4 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground">{trip?.title || 'Unknown Trip'}</p>
                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                              <Users className="h-3 w-3" />
                              {user?.name || booking.userId}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-sm font-black text-primary">${booking.totalPrice}</p>
                            <p className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                              booking.paymentStatus === 'completed' ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            )}>
                              {booking.paymentStatus}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="outline" className="mt-8 w-full font-bold rounded-full h-11 border-primary/20 text-primary hover:bg-primary/5">View Full Ledger</Button>
                </CardContent>
              </Card>

              <Card className="shadow-smooth border-border overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <CardTitle className="font-bold">Active Trip Catalog</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {trips?.slice(0, 4).map(trip => (
                      <div key={trip.id} className="flex justify-between items-center p-4 bg-muted/40 border border-border/50 rounded-xl hover:bg-muted/60 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                            <img src={trip.imageUrl} alt={trip.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground line-clamp-1">{trip.title}</p>
                            <p className="text-xs text-muted-foreground font-medium">${trip.price} • {trip.durationDays} Days</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/10 rounded-full px-4">Edit</Button>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 w-full font-bold rounded-full h-11 shadow-lift shadow-primary/20">Create New Offering</Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </Container>
    </PageWrapper>
  );
}

export * from './AddTrip';
export * from './ManageTrips';
export * from './EditTrip';
