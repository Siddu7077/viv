
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Amenities = () => {
  const amenitiesCategories = [
    {
      title: "Essentials",
      items: ["Free WiFi", "Air Conditioning", "Power Backup", "Geyser", "Refrigerator", "Heating/Cooling"]
    },
    {
      title: "Entertainment & Leisure",
      items: ["Swimming Pool", "Music System", "Carrom", "Board Games", "Bonfire", "Barbeque"]
    },
    {
      title: "Kids & Family Friendly",
      items: ["Kids Play Area", "Highchair", "Pack-n-Play", "Pet Friendly", "Outdoor Games"]
    },
    {
      title: "Event-Ready",
      items: ["Garden Lawn", "Dining Area", "Sound System", "Fully-stocked Kitchen"]
    },
    {
      title: "Safety & Comfort",
      items: ["CCTV", "Security Guard", "Wardrobe", "Towels", "Soap", "Gas Stove", "Television", "Bathtub", "Walking Trails", "Welcome Basket", "Washer/Dryer"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Amenities
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenitiesCategories.map((category) => (
              <div key={category.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center text-vivenza-black/80">
                      <svg className="w-5 h-5 mr-3 text-vivenza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Amenities;
