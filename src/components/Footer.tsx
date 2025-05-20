import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vivenza-black text-white">
      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-medium text-white mb-4">Vivenza</h3>
            <p className="text-white/70 mb-6">
              Experience luxury and elegance at Vivenza, the most premium farmhouse in Moinabad, Telangana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-vivenza-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-vivenza-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-vivenza-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/amenities" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-cancellation" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-white/70 hover:text-vivenza-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="not-italic text-white/70">
              <p className="mb-2">SY NUMBER: 108, near Mirja Farms</p>
              <p className="mb-2">Murthuzaguda, Moinabad</p>
              <p className="mb-4">Telangana – 501504</p>
              <p className="mb-2">
                <a href="tel:+919876543210" className="hover:text-vivenza-gold transition-colors">
                  +91 9876543210
                </a>
              </p>
              <p>
                <a href="mailto:info@vivenza.in" className="hover:text-vivenza-gold transition-colors">
                  info@vivenza.in
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10">
        <div className="luxury-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Vivenza Luxury Farmhouse. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 md:space-x-6">
              <Link to="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/return-policy" className="text-white/60 text-sm hover:text-white transition-colors">
                Return Policy
              </Link>
              <Link to="/refund-cancellation" className="text-white/60 text-sm hover:text-white transition-colors">
                Refund & Cancellation
              </Link>
              <Link to="/shipping-policy" className="text-white/60 text-sm hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;