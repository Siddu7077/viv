import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Packages = () => {
  const packages = [
    {
      name: "Full Farmhouse Stay",
      weekdayPrice: "₹36,000",
      description: "Access to all 8 bedrooms, halls, and amenities",
      features: [
        "All 4 AC bedrooms",
        "4 spacious halls",
        "Swimming pool access",
        "Garden area access",
        "24/7 security"
      ]
    },
    {
      name: "Garden Area",
      weekdayPrice: "₹26,000",
      description: "12 hours use of our expansive garden area",
      features: [
        "Up to 500 guests capacity",
        "Event setup space",
        "Parking facility",
        "Basic amenities access",
        "Security service"
      ]
    }
  ];

  const addOns = [
    { name: "DJ Services", price: "₹10,000" },
    { name: "Drinking Permission", price: "₹15,000" },
    { name: "Bonfire", price: "₹2,500" },
    { 
      name: "Food Services (Vegetarian)", 
      price: "₹800", 
      note: "Per person"
    },
    { 
      name: "Food Services (Non-Vegetarian)", 
      price: "₹1,200", 
      note: "Per person"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Our Packages
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          {/* Package information */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-4">{pkg.name}</h3>
                <p className="text-vivenza-gold text-3xl font-medium mb-4">
                  {pkg.weekdayPrice}
                  <span className="text-sm text-vivenza-black/60"> / weekday</span>
                </p>
                <p className="text-vivenza-black/80 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center text-vivenza-black/80">
                      <svg className="w-5 h-5 mr-3 text-vivenza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="luxury-button block text-center">
                  Book Now
                </Link>
              </div>
            ))}
          </div>

          {/* Timing information */}
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg mb-16">
            <h3 className="font-display text-xl mb-4 text-center">Check-in & Check-out Times</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">Check-in Time</p>
                <p className="text-lg">12:00 PM on arrival day</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">Check-out Time</p>
                <p className="text-lg">11:00 AM on departure day</p>
              </div>
            </div>
          </div>

          {/* Additional services */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="font-display text-2xl mb-6">Additional Services</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon) => (
                <div key={addon.name} className="flex justify-between items-center p-4 border border-vivenza-gold/20 rounded-lg">
                  <div>
                    <span className="text-vivenza-black/80">{addon.name}</span>
                    {addon.note && (
                      <span className="block text-sm text-vivenza-black/60 mt-1">{addon.note}</span>
                    )}
                  </div>
                  <span className="text-vivenza-gold font-medium">{addon.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-vivenza-black/70">
              <p><strong>Note:</strong> Food service pricing is per person. The final cost will be calculated based on your guest count and preference (vegetarian or non-vegetarian).</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
