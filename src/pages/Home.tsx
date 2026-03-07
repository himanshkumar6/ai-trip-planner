import { PageWrapper } from "@/layouts/PageWrapper";
import { HeroSection } from "@/components/landing/HeroSection";
import { TravelDealsSection } from "@/components/travel/TravelDealsSection";
import { AIGeneratorPreview } from "@/components/landing/AIGeneratorPreview";
import { CTASection } from "@/components/landing/CTASection";

export function Home() {
  return (
    <PageWrapper className="bg-saas-gradient min-h-screen">
      <HeroSection />

      {/* Travel Deals Section */}
      <TravelDealsSection />

      {/* AI Generator Preview */}
      <AIGeneratorPreview />

      {/* CTA Section */}
      <CTASection />
    </PageWrapper>
  );
}
