import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import WhySection from '../components/landing/WhySection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CultureSection from '../components/landing/CultureSection';
import LearningPreview from '../components/landing/LearningPreview';
import VideoPreview from '../components/landing/VideoPreview';
import GallerySection from '../components/landing/GallerySection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const LandingPage: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <WhySection />
        <FeaturesSection />
        <CultureSection />
        <LearningPreview />
        <VideoPreview />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
