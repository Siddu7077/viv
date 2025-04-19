
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Events = () => {
  const eventTypes = [
    {
      title: "Weddings",
      description: "Create magical memories in our stunning outdoor venue, perfect for ceremonies and receptions.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      title: "Corporate Retreats",
      description: "An ideal setting for team building, conferences, and business meetings.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      title: "Birthday Celebrations",
      description: "Celebrate your special day in style with our versatile event spaces.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Private Parties",
      description: "From bachelor parties to family reunions, we cater to all your celebration needs.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Events
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {eventTypes.map((event) => (
              <div key={event.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-2xl mb-4">{event.title}</h3>
                  <p className="text-vivenza-black/80 mb-6">{event.description}</p>
                  <Link to="/booking" className="luxury-button inline-block">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="font-display text-2xl mb-4">Custom Event Planning</h3>
            <p className="text-vivenza-black/80 mb-6">
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
