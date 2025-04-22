
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero background image */}
        <img
          src= " /5.jpeg"
          alt="Vivenza Luxury Farmhouse"
          className="h-full w-full object-cover"
        />
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
    </div>
  );
};

export default Hero;
