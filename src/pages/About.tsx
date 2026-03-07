import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';

export function About() {
  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              About <span className="text-primary italic">TripMate</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to revolutionize how people discover and plan their journeys.
            </p>
          </div>

          <div className="space-y-12">
            <section className="bg-card p-8 rounded-2xl border border-border shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                TripMate was founded on a simple belief: travel planning should be as exciting as the trip itself.
                Leveraging the latest in AI and machine learning, we've built a platform that understands your
                preferences and crafts seamless, personalized itineraries that turn dreams into reality.
              </p>
            </section>

            <section className="bg-card p-8 rounded-2xl border border-border shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-4">AI-Powered Travel Planning</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced algorithms analyze millions of data points, from flight prices and hotel ratings
                to local weather and hidden gems, to provide you with the most efficient and enjoyable
                travel plans. We handle the complexity so you can focus on making memories.
              </p>
            </section>

            <section className="bg-card p-8 rounded-2xl border border-border shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-4">Seamless Experience</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're planning a weekend getaway or a month-long transcontinental adventure,
                TripMate offers a unified interface for booking and managing every aspect of your trip.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
