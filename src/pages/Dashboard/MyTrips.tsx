import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent } from '@/components/ui/Card';

export function MyTrips() {
  return (
    <PageWrapper className="py-8 bg-background min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My AI Trips</h1>
          <p className="text-muted-foreground mt-2 text-lg">View and manage your generated itineraries.</p>
        </div>

        <Card className="border-border shadow-soft">
          <CardContent className="py-20 text-center text-muted-foreground font-semibold text-lg">
            You haven't generated any trips yet.
          </CardContent>
        </Card>
      </Container>
    </PageWrapper>
  );
}
