import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl mt-5  md:text-5xl font-medium mb-4 text-center">Terms of Service</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: April 20, 2025
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Agreement to Terms</h2>
            <p className="text-vivenza-black/80 mb-6">
              These Terms of Service constitute a legally binding agreement made between you and Vivenza, concerning your 
              access to and use of our website. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Intellectual Property Rights</h2>
            <p className="text-vivenza-black/80 mb-6">
              Unless otherwise indicated, the website and all content, features, and functionality are owned by Vivenza, 
              its licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">User Representations</h2>
            <p className="text-vivenza-black/80 mb-6">
              By using our services, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>You have the legal capacity to accept these Terms</li>
              <li>You are at least 18 years of age</li>
              <li>You will not access the website through automated or non-human means</li>
              <li>You will not use the website for any illegal or unauthorized purpose</li>
              <li>Your use of the website will not violate any applicable law or regulation</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Prohibited Activities</h2>
            <p className="text-vivenza-black/80 mb-6">
              You may not access or use the website for any purpose other than that for which we make it available. The website 
              may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Limitation of Liability</h2>
            <p className="text-vivenza-black/80 mb-6">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, 
              indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, 
              loss of data, or other damages arising from your use of the website.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-vivenza-black/80 mb-10">
              Email: legal@vivenza.com<br />
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

export default Terms;