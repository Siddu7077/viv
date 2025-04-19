import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow  bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-16 font-medium mb-4 text-center">Privacy Policy</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: April 20, 2025
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Introduction</h2>
            <p className="text-vivenza-black/80 mb-6">
              Welcome to Vivenza. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Information We Collect</h2>
            <p className="text-vivenza-black/80 mb-6">
              We may collect personal identification information, including but not limited to your name, email address, 
              postal address, phone number, and other information you voluntarily provide when using our services.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">How We Use Your Information</h2>
            <p className="text-vivenza-black/80 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website experience</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you for customer service, updates, and marketing purposes</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-vivenza-black/80 mb-6">
              We may use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-vivenza-black/80 mb-10">
              Email: privacy@vivenza.com<br />
              Phone: +91 9697798888
            </p>
            
            <div className="text-center mt-12 mb-6">
              <Link to="/" className="luxury-button">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;