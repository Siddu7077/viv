
import React from 'react';
import { Home, Calendar, Users, Image } from 'lucide-react';

const QuickInfo: React.FC = () => {
  const features = [
    {
      icon: <Home className="h-8 w-8 text-vivenza-gold" />,
      title: "Luxury Farmhouse",
      description: "8 air-conditioned bedrooms and 4 spacious halls in a 4-acre property"
    },
    {
      icon: <Calendar className="h-8 w-8 text-vivenza-gold" />,
      title: "Host Events",
      description: "Large garden area perfect for weddings and celebrations up to 500 guests"
    },
    {
      icon: <Users className="h-8 w-8 text-vivenza-gold" />,
      title: "Private Experience",
      description: "Exclusive property use with premium amenities and services"
    },
    {
      icon: <Image className="h-8 w-8 text-vivenza-gold" />,
      title: "Scenic Views",
      description: "Beautiful landscapes and serene environment for perfect getaways"
    }
  ];

  return (
    <section className="py-16 bg-vivenza-offWhite">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Discover Vivenza</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            A premium farmhouse destination that combines luxury with nature for unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 shadow-md flex flex-col items-center text-center animated-card"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-vivenza-black/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;
