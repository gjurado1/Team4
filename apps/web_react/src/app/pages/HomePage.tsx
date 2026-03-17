import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { PricingSection } from '../components/PricingSection';
import { DownloadsSection } from '../components/DownloadsSection';
import { ResourcesSection } from '../components/ResourcesSection';
import { HelpSection } from '../components/HelpSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <DownloadsSection />
      <ResourcesSection />
      <HelpSection />
    </>
  );
}
