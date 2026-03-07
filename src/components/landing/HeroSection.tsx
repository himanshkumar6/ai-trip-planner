import { useNavigate } from "react-router-dom";
import { Container } from "@/layouts/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HeroSlider } from "./HeroSlider";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-background">
      {/* SaaS Style Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-[100%] blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content Area - Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Travel Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] sm:leading-[1.15]"
            >
              Plan Your Ultimate <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-primary-gradient">
                AI Travel Experience
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Discover the world's best destinations perfectly curated by advanced AI.
              Personalized itineraries, exclusive deals, and seamless planning all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg h-14 px-8 shadow-lift shadow-primary/25 rounded-full"
                onClick={() => navigate("/search")}
              >
                Start Planning Trip
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 hover:bg-muted/50"
                onClick={() => navigate("/destinations")}
              >
                Explore Destinations
              </Button>
            </motion.div>

            {/* Micro Stats / Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-bold text-2xl sm:text-3xl text-foreground">100k+</span>
                <span className="text-sm font-medium text-muted-foreground">Trips Planned</span>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-bold text-2xl sm:text-3xl text-foreground">4.9/5</span>
                <span className="text-sm font-medium text-muted-foreground">User Ratings</span>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="hidden sm:flex flex-col items-center lg:items-start">
                <span className="font-bold text-2xl sm:text-3xl text-foreground">24/7</span>
                <span className="text-sm font-medium text-muted-foreground">AI Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content Area - Hero Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 h-[400px] sm:h-[500px] lg:h-[650px] w-full relative group mt-8 lg:mt-0"
          >
            {/* Glassmorphism Border Wrap / Glow Effect */}
            <div className="absolute -inset-1 sm:-inset-2 bg-primary-gradient opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700 rounded-[3rem]" />
            <div className="relative w-full h-full rounded-[2.5rem] p-1.5 sm:p-2 bg-card/40 backdrop-blur-md border border-border shadow-2xl">
              <HeroSlider />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
