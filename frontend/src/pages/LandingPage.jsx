import Hero from '../components/Hero';
import Features from '../components/Features';
import CompanionTeaser from '../components/CompanionTeaser';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 pt-32">
      <Hero />
      <Features />
      <CompanionTeaser />
    </div>
  );
}
