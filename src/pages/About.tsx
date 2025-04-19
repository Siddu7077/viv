
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            About Vivenza
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Vivenza Luxury Farmhouse" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-vivenza-black/80">
                Experience luxury and elegance at Vivenza, the most premium farmhouse in Moinabad, Telangana. With expansive spaces and world-class amenities, we create unforgettable memories.
              </p>
              <p className="text-lg text-vivenza-black/80">
                Nestled in a serene 4-acre property, Vivenza offers the perfect blend of luxury and nature. Our farmhouse features 8 air-conditioned bedrooms, 4 spacious halls, and multiple lounges designed for your comfort.
              </p>
              <p className="text-lg text-vivenza-black/80">
                Whether you're planning a family getaway, a corporate retreat, or a grand celebration, our versatile spaces can accommodate your needs. The open garden area can host up to 500 guests, making it ideal for weddings and large events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Location</h3>
              <p className="text-vivenza-black/80">
                SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Accommodation</h3>
              <p className="text-vivenza-black/80">
                8 AC bedrooms, 4 bathrooms, 4 spacious halls, multiple lounges and private suites
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Events</h3>
              <p className="text-vivenza-black/80">
                Perfect for weddings, corporate events, family gatherings, and celebrations
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
