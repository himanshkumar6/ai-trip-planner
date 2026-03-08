import { PageWrapper } from '@/layouts/PageWrapper';
import { Container } from '@/layouts/Container';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function AddTrip() {
  return (
    <PageWrapper className="py-8 bg-transparent">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Add New Trip</h1>
            <p className="text-muted-foreground mt-2">Create a new travel package for the catalog.</p>
          </div>
          <Link to="/admin/manage-trips">
            <Button variant="outline" className="rounded-full">Cancel</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground font-medium text-center">
            Trip creation form placeholder.<br />
            Include details like destination, price, duration, and attractions.
          </p>
        </div>
      </Container>
    </PageWrapper>
  );
}
