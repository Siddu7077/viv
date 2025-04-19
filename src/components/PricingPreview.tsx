
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingPreview: React.FC = () => {
  const packages = [
    {
      title: "Full Farmhouse Stay",
      price: "₹36,000",
      period: "weekdays",
      description: "Exclusive access to the entire luxury farmhouse",
      features: [
        "8 Air-conditioned Bedrooms",
        "4 Bathrooms",
        "4 Spacious Halls",
        "Multiple Lounges",
        "Private Garden Access",
        "Swimming Pool Access"
      ]
    },
    {
      title: "Garden Area",
      price: "₹26,000",
      period: "for 12 hours",
      description: "Perfect for hosting large events and celebrations",
      features: [
        "Large Open Garden",
        "Capacity for 500 Guests",
        "Event Setup Space",
        "Parking Area",
        "Basic Amenities",
        "Staffing Support"
      ]
    }
  ];

  return (
    <section className="py-16 bg-vivenza-offWhite">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Our Packages</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80 mb-4">
            Choose the perfect package for your needs with transparent pricing
          </p>
          <p className="text-vivenza-black/70 text-sm">
            *Weekend prices vary. Contact us for special pricing and custom packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded shadow-lg overflow-hidden animated-card">
              <div className="bg-vivenza-black p-6 text-white text-center">
                <h3 className="font-display text-2xl font-medium">{pkg.title}</h3>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-3xl font-semibold text-vivenza-gold">{pkg.price}</span>
                  <span className="ml-1 text-white/70">/{pkg.period}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-center mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-vivenza-gold flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link to="/packages" className="luxury-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-xl mb-4">Add-on Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4">
            <div className="bg-white p-4 shadow">
              <span className="font-medium">DJ Services:</span> ₹10,000
            </div>
            <div className="bg-white p-4 shadow">
              <span className="font-medium">Drinking Allowed:</span> ₹15,000
            </div>
          </div>
          
          <Link to="/booking" className="luxury-button mt-8 inline-block">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
