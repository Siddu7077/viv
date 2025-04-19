
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-9 flex items-center justify-center bg-vivenza-offWhite py-20">
        <div className="text-center px-4 mt-10">
          <h1 className="font-display text-5xl md:text-6xl font-medium mb-4">404</h1>
          <div className="gold-divider"></div>
          <p className="text-xl text-vivenza-black/80 mb-8 max-w-md mx-auto">
            The page you were looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="luxury-button">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
