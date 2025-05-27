import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Events = () => {
  const eventTypes = [
    {
      title: "Weddings",
      description: "Create magical memories in our stunning outdoor venue, perfect for ceremonies and receptions.",
      image: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b7307be2e1_1738240775.webp"
    },
    {
      title: "Corporate Retreats",
      description: "An ideal setting for team building, conferences, and business meetings.",
      image: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b758c8e177_1738241420.webp"
    },
    {
      title: "Birthday Celebrations",
      description: "Celebrate your special day in style with our versatile event spaces.",
      image: "https://adminmahaspice.in/ms3/uploads/event_categories/679c857bd2de2_birthday.webp"
    },
    {
      title: "Private Parties",
      description: "From bachelor parties to family reunions, we cater to all your celebration needs.",
      image: "https://adminmahaspice.in/ms3/uploads/event_categories/679c85f62436f_cocktail.webp"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 bg-vivenza-offWhite">
        <div className="luxury-container mt-4 py-20">
          <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Events
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {eventTypes.map((event) => (
              <div key={event.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-96 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-3xl mb-4">{event.title}</h3>
                  <p className="text-vivenza-black/80 mb-6 text-lg">{event.description}</p>
                  <Link to="/booking" className="luxury-button inline-block">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-lg shadow-lg text-center">
            <h3 className="font-display text-3xl mb-4">Custom Event Planning</h3>
            <p className="text-vivenza-black/80 mb-6 text-lg">
              Have a unique event in mind? Contact our event planning team to create your perfect celebration.
            </p>
            <Link to="/contact" className="luxury-button inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;