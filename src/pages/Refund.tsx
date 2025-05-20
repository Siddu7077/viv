import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-16 font-medium mb-4 text-center">Refund & Cancellation Policy</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: April 20, 2025
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Cancellation</h2>
            <p className="text-vivenza-black/80 mb-6">
              Any Capitalized terms used but not defined herein shall have the meaning
              assigned to them under the Terms of Use which govern your use of our
              website <strong>Vivenza.co.in</strong> (the "Website") and our 'Vivenza.co.in'
              application for mobile and handheld devices (the "App"). The Website and
              the App are jointly referred to as the "Platform".
            </p>
            <p className="text-vivenza-black/80 mb-6">
              As a general rule Buyer shall not be entitled to cancel Order once
              placed. Buyer may choose to cancel Order at any time but it may lead to
              put penalty of 10-30% of the price of the product. However, subject to
              Buyer's previous cancellation history, Vivenza.co.in reserves the right
              to deny any refund to Buyer pursuant to a cancellation initiated by
              Buyer.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Refunds</h2>
            <p className="text-vivenza-black/80 mb-6">
              Buyer may be entitled to a refund for prepaid Orders. Vivenza.co.in
              retains the right to retain the penalty payable by the Buyer mentioned
              in cancellation section from the amount refundable to him/her. The Buyer
              shall also be entitled to a refund of proportionate value in the event
              packaging of an item in an Order or the complete Order, is either
              tampered or damaged and the Buyer refuses to accept at the time of
              delivery for the said reason.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Buyer may be entitled to a refund upto 100% of the Order value if PDP
              fails to deliver the Order due to a cause attributable to either PDP or
              Vivenza.co.in, however such refunds will be assessed on a case to case
              basis by Vivenza.co.in.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Our decision on refunds shall be final and binding.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              All refund amounts shall be credited to Buyer's account as may be
              stipulated as per the payment mechanism of Buyer's choice, the
              estimated timelines are detailed as below, in case Buyer don't choose
              to credit it to Buyer's wallet with his/her Vivenza.co.in Account:
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Process</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Payment Method</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Refund Source</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">TAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80" rowSpan={3}>Order Edit/Cancellation/Compensation/Payment Failure</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Net Banking</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80">Debit/Credit Cards</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80">UPI</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">3-4 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Additional Cancellation Terms</h2>
            <p className="text-vivenza-black/80 mb-6">
              A user can cancel an order before the order completes its cooking. After the order completes cooking, 
              a user is disabled to cancel the order. Payments can be made through cash on Delivery (COD) OR using our
              Online Payment Methods.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Once the order completes cooking it will be out for delivery & Payments once made will not be refunded back.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions about our Refund and Cancellation Policy, please contact us at:
            </p>
            <p className="text-vivenza-black/80 mb-10">
              Email: support@vivenza.com<br />
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

export default RefundPolicy;