
import React from 'react';
import { Link } from 'react-router-dom';

const GalleryPreview: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      alt: "Vivenza Garden at Night",
      category: "Night View"
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Vivenza Lake View",
      category: "Garden"
    },
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      alt: "Vivenza Relaxation Area",
      category: "Farmhouse"
    },
    {
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      alt: "Vivenza Natural Surroundings",
      category: "Garden"
    },
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Wildlife at Vivenza",
      category: "Events"
    },
    {
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Vivenza Suite Room",
      category: "Farmhouse"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Gallery</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            Take a visual tour of our stunning property
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden h-64 md:h-72"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs bg-vivenza-gold px-2 py-1 mb-2">{image.category}</span>
                <h3 className="text-white text-center px-4">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/gallery" className="luxury-button">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
