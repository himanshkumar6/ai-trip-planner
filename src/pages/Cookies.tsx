import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';

export function Cookies() {
  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-8 text-center">
            Cookie <span className="text-primary italic">Policy</span>
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <p className="text-lg">
              TripMate uses cookies and similar technologies to provide, protect, and improve our services.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website.
                They help us remember your preferences and provide a better user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the basic functioning of the service.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our platform.</li>
                <li><strong>Functionality Cookies:</strong> Remember your settings and preferences.</li>
                <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Managing Cookies</h2>
              <p>
                You can manage or disable cookies through your browser settings. However,
                disabling certain cookies may affect the functionality of our service.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
