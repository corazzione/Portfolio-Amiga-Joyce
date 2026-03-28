import { HeroSection } from '@/components/hero/HeroSection'
import { PhotoStripSection } from '@/components/sections/PhotoStripSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { ProofStripSection } from '@/components/sections/ProofStripSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { BentoSection } from '@/components/sections/BentoSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
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
      <ProcessSection />
      <BentoSection />
      <PortfolioSection />
      <BlogSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}
