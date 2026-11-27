import { About } from '@/components/About';
import { AppConnect } from '@/components/AppConnect';
import { AppDock } from '@/components/AppDock';
import { Courses } from '@/components/Courses';
import { Esports } from '@/components/Esports';
import { Finale } from '@/components/Finale';
import { Hero } from '@/components/Hero';
import { Schedule } from '@/components/Schedule';
import { Talks } from '@/components/Talks';
import { Ticker } from '@/components/Ticker';
import { Venue } from '@/components/Venue';
import { PageHydrated } from '@/engine/next';

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AppConnect />
      <About />
      <Schedule />
      <Talks />
      <Courses />
      <Esports />
      <Venue />
      <Finale />
      <AppDock />
      <PageHydrated />
    </>
  );
}
