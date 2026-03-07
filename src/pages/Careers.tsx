import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function Careers() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Join the <span className="text-primary italic">TripMate</span> Team
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Help us build the next generation of travel experiences.
            </p>
          </div>

          <div className="bg-muted/30 p-12 rounded-[2.5rem] border border-border text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">We're not hiring at the moment.</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Check back soon for new opportunities to join our remote-first team. We're always
              looking for passionate travelers and innovators who want to make an impact.
            </p>
            <Button size="lg" variant="outline" onClick={() => navigate('/')}>
              Return Home
            </Button>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
