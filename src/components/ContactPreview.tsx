
import React from 'react';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPreview: React.FC = () => {
  return (
    <section className="py-16 bg-vivenza-offWhite">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Connect With Us</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            We're here to answer your questions and help plan your perfect stay or event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <MapPin className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Our Location</h3>
            <p className="text-vivenza-black/80">
              SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504
            </p>
          </div>
          
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <Phone className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Contact Us</h3>
            <p className="text-vivenza-black/80 mb-2">
              <a href="tel:+919876543210" className="hover:text-vivenza-gold transition-colors">
                +91 9876543210
              </a>
            </p>
            <p className="text-vivenza-black/80">
              <a href="mailto:info@vivenza.in" className="hover:text-vivenza-gold transition-colors">
                info@vivenza.in
              </a>
            </p>
          </div>
          
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <Calendar className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Book a Visit</h3>
            <p className="text-vivenza-black/80 mb-4">
              Schedule a property tour to experience Vivenza in person
            </p>
            <Link to="/contact" className="luxury-button-outline text-sm py-2">
              Request a Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
