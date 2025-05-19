
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in time is 12:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request."
    },
    {
      question: "What is the booking and payment policy?",
      answer: "We require 50% advance payment for booking confirmation. The remaining balance is due at check-in, along with a ₹10,000 refundable security deposit."
    },
    {
      question: "What documents are required for check-in?",
      answer: "Valid government-issued ID proof is mandatory for all guests at check-in."
    },
    {
      question: "Are outside food and beverages allowed?",
      answer: "Yes, outside food and beverages are allowed. We also offer catering services on request."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellations made 7 days prior to check-in date are eligible for a full refund. Cancellations within 7 days will incur charges as per our policy."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we offer complimentary parking for our guests."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Frequently Asked Questions
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-display">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-vivenza-black/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
