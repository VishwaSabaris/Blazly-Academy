import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { CourseGrid } from "@/components/landing/CourseGrid";
import { WhySection } from "@/components/landing/WhySection";
import { CertificateSection } from "@/components/landing/CertificateSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaAndFooter } from "@/components/landing/CtaAndFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <CourseGrid />
      <WhySection />
      <CertificateSection />
      <Testimonials />
      <CtaAndFooter />
    </>
  );
}
