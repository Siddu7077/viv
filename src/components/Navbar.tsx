import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Events', path: '/events' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full mb-52 z-50 transition-all duration-300 ${isScrolled
        ? 'shadow-lg py-3'
        : 'backdrop-blur-sm py-4'
      }`} style={{
        background: isScrolled
          ? 'linear-gradient(to right, rgb(118, 37, 79), rgb(118, 37, 79))'
          : 'linear-gradient(to right, rgba(118, 37, 79), rgba(118, 37, 79))'
      }}>

      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/log.png"
            alt="Vivenza Logo"
            className="h-24 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative font-medium text-white hover:text-yellow-400 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Book Now Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            to="/booking"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-2 lg:text-base rounded-full font-semibold whitespace-nowrap hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ color: 'rgb(118, 37, 79)' }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <Menu className="h-7 w-7 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden shadow-xl animate-fade-in" style={{
          background: 'linear-gradient(to bottom, rgb(118, 37, 79), rgb(118, 37, 79))'
        }}>
          <div className="flex flex-col py-6 space-y-3 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-2 px-4 text-white font-medium transition-colors rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                to="/booking"
                className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
                style={{ color: 'rgb(118, 37, 79)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;