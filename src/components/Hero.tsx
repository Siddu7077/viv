import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const heroContent = [
    {
      image: "/5.jpeg",
      title: "Welcome to Vivenza",
      subtitle: "Experience luxury and elegance at Telangana's most premium farmhouse",
      primaryButton: "Book Your Stay",
      secondaryButton: "Explore Gallery"
    },
    {
      image: "/1.jpeg",
      title: "Luxury Redefined",
      subtitle: "Immerse yourself in world-class amenities and breathtaking natural beauty",
      primaryButton: "View Packages",
      secondaryButton: "Virtual Tour"
    },
    {
      image: "/3.jpeg",
      title: "Perfect Getaway",
      subtitle: "Create unforgettable memories with family and friends in our exclusive retreat",
      primaryButton: "Plan Your Event",
      secondaryButton: "See Amenities"
    },
    {
      image: "/6.jpeg",
      title: "Peaceful Paradise",
      subtitle: "Escape the city chaos and reconnect with nature in our serene farmhouse",
      primaryButton: "Book Now",
      secondaryButton: "Contact Us"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroContent.length]);

  const currentContent = heroContent[currentImageIndex];

  return (
    <div className="relative h-[80vh]"> {/* Reduced height from h-screen to h-[80vh] */}
      <div className="absolute mt-5 inset-0 overflow-hidden">
        {/* Hero background image carousel */}
        {heroContent.map((content, index) => (
          <img
            key={index}
            src={content.image}
            alt="Vivenza Luxury Farmhouse"
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 
          key={`title-${currentImageIndex}`}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight animate-fade-up"
        >
          {currentContent.title.split(' ').map((word, index) => 
            word === 'Vivenza' ? (
              <span key={index} style={{ color: 'rgb(255, 215, 0)' }}>{word}</span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </h1>
        <p 
          key={`subtitle-${currentImageIndex}`}
          className="mt-6 max-w-2xl text-lg md:text-xl animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {currentContent.subtitle}
        </p>
        <div 
          className="mt-10 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Link 
            to="/booking" 
            className="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mr-4"
            style={{
              background: 'linear-gradient(to right, rgb(255, 215, 0), rgb(255, 193, 7))',
              color: 'rgb(118, 37, 79)'
            }}
          >
            {currentContent.primaryButton}
          </Link>
          <Link 
            to="/gallery" 
            className="px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:text-white transition-all duration-300"
            style={{
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(118, 37, 79)';
              e.currentTarget.style.borderColor = 'rgb(118, 37, 79)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'white';
            }}
          >
            {currentContent.secondaryButton}
          </Link>
        </div>
        <div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
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
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentImageIndex 
                ? 'w-6' 
                : 'w-2 bg-white bg-opacity-50'
            }`}
            style={{
              backgroundColor: index === currentImageIndex ? 'rgb(255, 215, 0)' : undefined
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;