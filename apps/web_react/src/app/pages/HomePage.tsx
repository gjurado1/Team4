import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { PricingSection } from '../components/PricingSection';
import { DownloadsSection } from '../components/DownloadsSection';
import { ResourcesSection } from '../components/ResourcesSection';
import { HelpSection } from '../components/HelpSection';

export function HomePage() {
  return (
    <>
      <HeroSection 
        backgroundImage="https://images.unsplash.com/photo-1758206523860-0583e7b51a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY2FyZWdpdmVyJTIwZmFtaWx5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NzI2OTc1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      <FeaturesSection />
      <PricingSection />
      <DownloadsSection />
      <ResourcesSection />
      <HelpSection />
    </>
  );
}
