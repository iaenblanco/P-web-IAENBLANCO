'use client';

import React, { useState } from 'react';
import {
  Header,
  Hero,
  Services,
  Pricing,
  LearningPath,
  GeminiGenerator,
  Testimonials,
  Contact,
  Footer,
  BackgroundSwitcher
} from '@/components';

export default function Home() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header />
        <Hero />
        <Services />
        <Pricing />
        <LearningPath />
        <GeminiGenerator />
        <Testimonials />
        <Contact />
        <Footer />
        <BackgroundSwitcher onBackgroundChange={handleBackgroundChange} />
      </div>
    </div>
  );
}
