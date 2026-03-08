import { PageWrapper } from '@/layouts/PageWrapper';
import { Container } from '@/layouts/Container';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';

export function ManageTrips() {
  return (
    <PageWrapper className="py-8 bg-transparent">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Manage Trips</h1>
            <p className="text-muted-foreground mt-2">View, edit, and orchestrate the active trip catalog.</p>
          </div>
          <Link to="/admin/add-trip">
            <Button className="rounded-full gap-2 font-bold shadow-md">
              <PlusCircle className="h-4 w-4" />
              Add New Trip
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground font-medium text-center">
            Data table of trips placeholder.<br />
            Will contain search filtering, pagination, and edit/delete actions.
          </p>
        </div>
      </Container>
    </PageWrapper>
  );
}
