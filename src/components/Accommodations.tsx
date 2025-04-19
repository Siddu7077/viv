
import React from 'react';

const Accommodations: React.FC = () => {
  const accommodations = [
    {
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      title: "Farmhouse Stay",
      description: "Private, luxurious villa-style accommodation with 8 air-conditioned bedrooms and 4 spacious halls.",
      features: ["8 AC Bedrooms", "4 Bathrooms", "4 Spacious Halls", "Multiple Lounges"]
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      title: "Open Garden Area",
      description: "Perfect venue for large events with beautiful landscaping that can accommodate up to 500 guests.",
      features: ["Large Event Space", "Beautifully Landscaped", "Up to 500 Guests", "Open-air Experience"]
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Accommodations</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            Choose from our exclusive accommodation options designed for luxury and comfort
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {accommodations.map((accommodation, index) => (
            <div key={index} className="group overflow-hidden shadow-lg">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-medium">{accommodation.title}</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="mb-4">{accommodation.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {accommodation.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-vivenza-gold rounded-full mr-2"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
