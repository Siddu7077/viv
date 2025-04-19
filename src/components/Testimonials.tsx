
import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "My family had the most amazing weekend at Vivenza. The property is beautiful, well-maintained, and the staff was extraordinarily attentive. We'll definitely be back!",
      author: "Rahul Sharma",
      title: "Family Getaway"
    },
    {
      quote: "We hosted our daughter's wedding at Vivenza and it was magical. The garden area was perfect for our 300 guests, and the farmhouse accommodation was luxurious for our immediate family.",
      author: "Priya Patel",
      title: "Wedding Host"
    },
    {
      quote: "Our corporate retreat at Vivenza exceeded all expectations. The spacious halls were perfect for our workshops, and the serene environment inspired creativity and teamwork.",
      author: "Vikram Mehta",
      title: "CEO, Horizon Technologies"
    }
  ];

  return (
    <section className="py-16 bg-vivenza-black text-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">What Our Guests Say</h2>
          <div className="gold-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-vivenza-black border border-vivenza-gold/30 p-8">
              <div className="mb-4 text-vivenza-gold">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-6 italic">{testimonial.quote}</p>
              <div>
                <p className="font-medium text-vivenza-gold">{testimonial.author}</p>
                <p className="text-white/70 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
