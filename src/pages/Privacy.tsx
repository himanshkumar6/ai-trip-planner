import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';

export function Privacy() {
  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-8 text-center">
            Privacy <span className="text-primary italic">Policy</span>
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <p className="text-lg">
              At TripMate, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, and protect your personal information.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when you create an account,
                make a booking, or contact our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>
                We use your information to process bookings, provide customer support, and improve
                our services. We may also use your email to send you updates and promotional offers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Sharing Your Information</h2>
              <p>
                We do not sell your personal information to third parties. We only share your
                information with service providers (like airlines and hotels) as necessary to
                complete your bookings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Your Data Protection Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information at
                any time through your account settings.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
