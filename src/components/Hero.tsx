import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const images = [
    "/5.jpeg",
    "/1.jpeg", // Add your other image paths here
    "/3.jpeg",
    "/6.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[80vh]"> {/* Reduced height from h-screen to h-[80vh] */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero background image carousel */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Vivenza Luxury Farmhouse"
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0'
            }`}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Welcome to <span className="text-vivenza-gold">Vivenza</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
          Experience luxury and elegance at Telangana's most premium farmhouse
        </p>
        <div className="mt-10 animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
          <Link to="/booking" className="luxury-button">
            Book Your Stay
          </Link>
          <Link to="/gallery" className="luxury-button-outline ml-4 bg-transparent border-white text-white hover:bg-white hover:text-vivenza-black">
            Explore Gallery
          </Link>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
          <div className="text-white text-sm tracking-widest uppercase">Discover More</div>
          <div className="mt-2 animate-bounce">
            <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;