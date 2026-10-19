import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { StorySection } from "@/components/home/StorySection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { CommitmentGrid } from "@/components/home/CommitmentGrid";
import { TestimonialsBand } from "@/components/home/TestimonialsBand";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <PartnerMarquee />
      <StorySection />
      <ServicesPreview />
      <ProductsPreview />
      <CommitmentGrid />
      <TestimonialsBand />
      <CtaBand />
    </>
  );
}
