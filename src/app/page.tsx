'use client';

import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Team } from '@/components/sections/Team';
import { SectionQuote } from '@/components/sections/SectionQuote';
import { HERO, STATS, SERVICES, TEAM } from '@/lib/constants';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  useScrollAnimation();

  return (
    <>
      <Hero
        title={HERO.title}
        subtitle={HERO.subtitle}
        description={HERO.description}
        cta1={HERO.cta1}
        cta2={HERO.cta2}
      />
      <Stats stats={STATS} />
      <Services services={SERVICES} />
      <Team team={TEAM} />
      <SectionQuote />
    </>
  );
}
