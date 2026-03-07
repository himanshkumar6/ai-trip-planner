import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';

export function Terms() {
  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-8 text-center">
            Terms of <span className="text-primary italic">Service</span>
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using TripMate, you agree to be bound by these Terms of Service.
                If you do not agree to all of these terms, you may not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of the Service</h2>
              <p>
                You must be at least 18 years old to use TripMate. You are responsible for
                maintaining the confidentiality of your account information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Booking and Payments</h2>
              <p>
                All bookings made through TripMate are subject to availability. Prices and availability
                are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
              <p>
                The TripMate platform and all its content are protected by copyright and other
                intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
              <p>
                TripMate shall not be liable for any direct, indirect, incidental, special,
                or consequential damages resulting from the use or inability to use the service.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
