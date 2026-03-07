import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/layouts/Container";
import { Plane, Map, MapPin } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Premium Background Layering */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative group"
        >
          {/* Glassmorphic Container Inner Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[3rem] blur-lg opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-card/60 backdrop-blur-2xl border border-border/50 p-10 sm:p-16 md:p-20 rounded-[3rem] shadow-soft flex flex-col items-center text-center overflow-hidden">

            {/* Embedded Floating Travel Icons */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-12 left-12 text-primary/20 hidden md:block"
            >
              <Plane className="w-16 h-16 rotate-45" />
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [15, -15, 15] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute bottom-16 right-16 text-blue-500/20 hidden md:block"
            >
              <Map className="w-20 h-20" />
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-20 right-24 text-primary/20 hidden lg:block"
            >
              <MapPin className="w-12 h-12" />
            </motion.div>

            {/* Core Content */}
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                <span className="text-foreground">Start Planning Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 pb-2 inline-block">Perfect AI Trip</span>
              </h2>

              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let AI design your perfect travel itinerary in seconds. Discover new breathtaking destinations, plan significantly smarter, and travel better.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto h-14 px-8 text-lg shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] hover:-translate-y-1 transition-all duration-300"
                >
                  Start Planning for Free
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full sm:w-auto h-14 px-8 text-lg font-medium hover:bg-primary/5 hover:text-primary hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Destinations
                </Button>
              </div>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
