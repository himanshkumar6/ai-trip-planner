import { PageWrapper } from '@/layouts/PageWrapper';
import { Container } from '@/layouts/Container';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function EditTrip() {
  const { id } = useParams();

  return (
    <PageWrapper className="py-8 bg-transparent">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Edit Trip <span className="text-primary italic">#{id?.slice(0, 6)}</span></h1>
            <p className="text-muted-foreground mt-2">Modify existing trip details and offerings.</p>
          </div>
          <Link to="/admin/manage-trips">
            <Button variant="outline" className="rounded-full">Cancel</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground font-medium text-center">
            Trip edit form placeholder.<br />
            Will pre-populate fields for trip ID {id}.
          </p>
        </div>
      </Container>
    </PageWrapper>
  );
}
