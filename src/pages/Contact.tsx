
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Contact Us
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl mb-4">Location</h3>
                <p className="text-vivenza-black/80">
                  SY NUMBER: 108, near Mirja Farms,<br />
                  Murthuzaguda, Moinabad,<br />
                  Telangana – 501504
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p className="text-vivenza-black/80">Phone: +91 XXXXXXXXXX</p>
                  <p className="text-vivenza-black/80">Email: info@vivenza.com</p>
                  <p className="text-vivenza-black/80">WhatsApp: +91 XXXXXXXXXX</p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-4">Business Hours</h3>
                <p className="text-vivenza-black/80">
                  Monday - Sunday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
