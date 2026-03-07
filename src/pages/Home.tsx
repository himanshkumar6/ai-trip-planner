import { useState } from 'react';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TripGrid } from '@/components/trips/TripGrid';
import { useTrips } from '@/hooks/useQueryHooks';
import { Search, MapPin, Calendar, Users, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Home() {
  const { data: trips, isLoading } = useTrips();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'London', 'Birmingham', 'Nottingham', 'Leicester', 'Plymouth', 'Derby'];

  return (
    <PageWrapper className="bg-saas-gradient min-h-screen">

      {/* SaaS Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content: Search Card */}
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
              >
                What Is Your <br /> <span className="text-gradient">Destination?</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card p-6 rounded-2xl shadow-lift border border-border relative group"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> From
                    </label>
                    <Input placeholder="Current Location" className="bg-muted border-0 h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> To
                    </label>
                    <Input placeholder="Where to?" className="bg-muted border-0 h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Departure date
                    </label>
                    <Input type="date" className="bg-muted border-0 h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Return date
                    </label>
                    <Input type="date" className="bg-muted border-0 h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Guests
                    </label>
                    <Input type="number" min="1" placeholder="2" className="bg-muted border-0 h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-primary" /> Rooms
                    </label>
                    <Input type="number" min="1" placeholder="1" className="bg-muted border-0 h-11" />
                  </div>
                </div>

                <Button className="w-full text-lg shadow-lift shadow-primary/25" size="lg" onClick={() => navigate('/search')}>
                  Get your deal now
                </Button>
              </motion.div>
            </div>

            {/* Right Content: Floating Illustration */}
            <div className="hidden lg:flex justify-center items-center relative h-full">
              {/* Decorative blobs behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[80px] -z-10 animate-pulse" />
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[60px] -z-10 animate-pulse delay-700" />

              <motion.img
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1000&auto=format&fit=crop"
                alt="Travel Illustration"
                className="w-full max-w-md rounded-[2.5rem] shadow-2xl object-cover h-[600px] border-4 border-white"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Holiday Deals Section */}
      <section className="py-20 relative bg-background">
        <Container>
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6">Best holiday deals</h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm",
                    activeFilter === filter
                      ? "bg-primary text-white shadow-lift"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}

              <div className="ml-auto relative w-full md:w-64 mt-4 md:mt-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search city..."
                  className="pl-10 rounded-full bg-muted border-border"
                />
              </div>
            </div>
          </div>

          <TripGrid trips={trips?.slice(0, 3)} isLoading={isLoading} skeletonCount={3} />

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-full shadow-sm hover:shadow-soft" onClick={() => navigate('/search')}>
              Explore more deals
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-primary-gradient opacity-5" />
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto bg-card p-12 rounded-[2.5rem] shadow-xl border border-border">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Ready to start planning?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of travelers who trust TripMate for their perfect vacations. Exclusive deals await.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg shadow-lift shadow-primary/30 hover:-translate-y-1 transition-all" onClick={() => navigate('/register')}>
              Create an Account for Free
            </Button>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
