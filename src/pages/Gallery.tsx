
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const galleryImages = [
    {
      category: "Farmhouse",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      ]
    },
    {
      category: "Events",
      images: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      ]
    },
    {
      category: "Garden",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Gallery
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="space-y-16">
            {galleryImages.map((section) => (
              <div key={section.category}>
                <h2 className="font-display text-3xl mb-8">{section.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group overflow-hidden rounded-lg shadow-lg"
                    >
                      <img
                        src={image}
                        alt={`${section.category} ${index + 1}`}
                        className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
