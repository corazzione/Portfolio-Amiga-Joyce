import { HeroSection } from '@/components/hero/HeroSection'
import { PhotoStripSection } from '@/components/sections/PhotoStripSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { ProofStripSection } from '@/components/sections/ProofStripSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PhotoStripSection />
      <ManifestoSection />
      <ProofStripSection />
      <ServicesSection />
      {/* Phase 5: Process sticky cards */}
      <section id="process" aria-hidden="true" />
      <PortfolioSection />
      <BlogSection />
      {/* Phase 5: Testimonial carousel */}
      <section id="testimonials" aria-hidden="true" />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}
