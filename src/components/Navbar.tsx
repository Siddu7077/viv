
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-95 shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`font-display text-3xl font-bold ${isScrolled || isMenuOpen ? 'text-vivenza-black' : 'text-white'}`}>
            Vivenza
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`gold-underline font-medium ${isScrolled ? 'text-vivenza-black' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Book Now Button (Desktop) */}
        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="luxury-button"
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
            <X className={`h-7 w-7 ${isScrolled ? 'text-vivenza-black' : 'text-white'}`} />
          ) : (
            <Menu className={`h-7 w-7 ${isScrolled ? 'text-vivenza-black' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl animate-fade-in">
          <div className="flex flex-col py-6 space-y-3 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-2 px-4 hover:bg-gray-50 text-vivenza-black font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                to="/booking"
                className="block luxury-button text-center"
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
