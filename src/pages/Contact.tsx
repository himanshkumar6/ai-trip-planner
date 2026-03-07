import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export function Contact() {
  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Get in <span className="text-primary italic">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions or need support? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-soft text-center hover:shadow-lift transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-4">For general inquiries and support.</p>
              <a href="mailto:support@tripmate.com" className="text-primary font-medium hover:underline">
                support@tripmate.com
              </a>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-soft text-center hover:shadow-lift transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time.</p>
              <button className="text-primary font-medium hover:underline">
                Start Chatting
              </button>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-soft text-center hover:shadow-lift transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-4">Mon-Fri from 9am to 6pm IST.</p>
              <a href="tel:+1234567890" className="text-primary font-medium hover:underline">
                +91 8659765895
              </a>
            </div>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
