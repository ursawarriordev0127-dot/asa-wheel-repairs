import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustedPartnersSection } from "@/components/home/TrustedPartnersSection";
import { ProcessPreview } from "@/components/home/ProcessPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TrustedPartnersSection />
      <ProcessPreview />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
