import React from 'react';

const EventsSection: React.FC = () => {
  const eventCategories = [
    {
      title: "Celebrations & Social Gatherings",
      description: "Birthday parties, anniversaries, reunions and more",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      items: [
        "Birthday Parties (Kids, Teens, Adults)",
        "Anniversary Celebrations",
        "Retirement Parties",
        "Kitty Parties",
        "Baby Showers",
        "Bridal Showers"
      ]
    },
    {
      title: "Corporate & Formal Events",
      description: "Professional gatherings with premium amenities",
      image: "https://ohmyfacts.com/wp-content/uploads/2024/10/30-facts-about-social-gatherings-1730181720.jpg",
      items: [
        "Corporate Offsites",
        "Team-Building Retreats",
        "Product Launches",
        "Networking Mixers",
        "Board Meetings with a View"
      ]
    },
    {
      title: "Weddings & Related Events",
      description: "Make your special day unforgettable",
      image: "https://www.wedamor.com/wp-content/uploads/2024/06/indian-wedding-traditions-2.jpeg",
      items: [
        "Weddings",
        "Engagement Ceremonies",
        "Haldi, Mehndi & Sangeet",
        "Pre-Wedding Photoshoots",
        "Reception Parties"
      ]
    },
    {
      title: "Wellness & Retreats",
      description: "Rejuvenate in our peaceful environment",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      items: [
        "Yoga Retreats",
        "Meditation Camps",
        "Detox & Wellness Retreats",
        "Spiritual Gatherings"
      ]
    },
    {
      title: "Cultural & Community Events",
      description: "Celebrate diversity and traditions",
      image: "https://thumbs.dreamstime.com/b/house-lightning-eve-diwali-india-193913179.jpg",
      items: [
        "Festivals (Holi, Diwali, Christmas)",
        "Theme Nights",
        "Community Picnics",
        "Seasonal Markets or Fairs"
      ]
    },
    {
      title: "Workshops & Learning",
      description: "Creative and educational experiences",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      items: [
        "Art & Craft Workshops",
        "Cooking/Baking Classes",
        "Gardening Demos",
        "Photography Workshops"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-vivenza-offWhite to-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Host Your Perfect Event</h2>
          <div className="gold-divider mx-auto"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            Our luxury farmhouse provides the ideal setting for all types of gatherings and celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-vivenza-gold mb-3">{category.description}</p>
                </div>
                <div className="max-h-0 overflow-hidden group-hover:max-h-64 transition-all duration-700 ease-in-out">
                  <ul className="text-white/90 text-sm space-y-1.5">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-vivenza-gold mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 px-4 py-2 bg-vivenza-gold text-white rounded-md hover:bg-opacity-90 transition-colors">
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="luxury-button mx-auto">
            View All Event Options
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;