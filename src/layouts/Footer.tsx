import { Container } from './Container';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <PlaneTakeoff className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">TripMate</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Your ultimate travel companion. Discover, plan, and book your seamless journey with modern ease.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground uppercase text-xs tracking-widest">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Tours</Link></li>
              <li><Link to="/offers" className="hover:text-primary transition-colors">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-border pt-8">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} TripMate. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
