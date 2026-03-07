import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TravelCard, TravelCardProps } from "./TravelCard";
import { cn } from "@/lib/utils";

interface TravelSliderProps {
  cards: TravelCardProps[];
}

export function TravelSlider({ cards }: TravelSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false },
    [Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden -ml-4 md:-ml-6 touchscreen:ml-0">
          {cards.map((card, index) => (
            <div
              className="flex-none min-w-0 pl-4 md:pl-6 w-full sm:w-[50%] lg:w-[33.33%] xl:w-[25%]"
              key={index}
            >
              <TravelCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lift text-foreground transition-all duration-300",
          "hover:bg-primary hover:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "opacity-0 sm:group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed -translate-x-full group-hover:translate-x-0"
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lift text-foreground transition-all duration-300",
          "hover:bg-primary hover:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "opacity-0 sm:group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed translate-x-full group-hover:translate-x-0"
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
