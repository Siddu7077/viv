
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuickInfo from '../components/QuickInfo';
import Accommodations from '../components/Accommodations';
import PricingPreview from '../components/PricingPreview';
import GalleryPreview from '../components/GalleryPreview';
import Testimonials from '../components/Testimonials';
import ContactPreview from '../components/ContactPreview';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <QuickInfo />
      <Accommodations />
      <PricingPreview />
      <GalleryPreview />
      <Testimonials />
      <ContactPreview />
      <Footer />
    </div>
  );
};

export default Index;
