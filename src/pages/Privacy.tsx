import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-16 font-medium mb-4 text-center">Privacy Policy</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: April 20, 2025
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Vivenza.co.in stores user's personally information that you may
                voluntarily provide on online forms such as during registration &
                Login, Online. The personally identifiable information (Personal
                Information) collected on this Site OR in our Mobile Application can
                include your name, address, Mobile number, Email addresses, and any
                other information you may need to provide.</li>
              <li>Your IP is stored while placing an order through our Web Application
                OR Mobile Application. This is to avoid fraud Orders. Fraud orders
                will be recorded and will be reported to the higher authority to
                perform legal actions.</li>
              <li>In addition to the Personal Information stored which are mentioned,
                our web application automatically identifies device by their IP
                address and device used for placing the order. Vivenza.co.in may use
                IP addresses to get through trends, track fraud users and dynamic
                information for legal processes.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Disclaimer</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Company reserves the right to change any part or piece of
                information on this web site without any notice to customers or
                visitors.</li>
              <li>It is the user's responsibility to read & accept these terms and
                conditions before placing an order using our Vivenza.co.in Web
                Application OR Mobile Application.</li>
              <li>The Graphical images or the Photographic images displayed in our
                application are specially designed for the application purpose & may
                vary in colour, Size, add-ons, etc.</li>
              <li>Vivenza.co.in (GSR HOSPITALITY SERVICES) reserves the right to
                change / modify the terms & conditions anytime.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Vivenza.co.in Service Use</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>User is allowed to use the Vivenza.co.in application subject to
                acceptance of the terms and conditions and the Privacy Policy on the
                Vivenza.co.in App and/or Web App.</li>
              <li>Vivenza.co.in claims the right to change the Terms & Conditions and
                are immediately applicable.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Ordering</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Users of Vivenza.co.in warrants to accept that the Banking or any
                other Payment mode details that you provide are of your own credit
                or debit cards or wallets information.</li>
              <li>It's a user's sole responsibility to check whether the Food you have
                ordered is suitable for the intended recipient and the age criteria.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Prices and Payment</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>All prices listed on the Vivenza.co.in Web APP or Mobile App for
                Food is correct at the time of listing and is decided by
                Vivenza.co.in Authority.</li>
              <li>Vivenza.co.in reserves the right to alter the menu of Food available
                for sale on the Web App or Mobile APP and to De-Activate and remove
                from listing of the Menu.</li>
              <li>User agrees that the price change before the order placed will not
                be liable to the delivery boy.</li>
              <li>The total price for Food and Food Delivery including all other
                charges, taxes, costs, if any, will be displayed on the
                Vivenza.co.in Web App or Mobile App while a user place's a order.
                Full payment must be made for all the particulars mentioned in the
                order.</li>
              <li>If you choose online payment, you shall ensure that online payment
                mode is secured, your debit/credit card details will be encrypted to
                prevent the possibility of someone being able to read them as they
                are sent over the web. Your Banking Company may also conduct
                necessary security checks to confirm about your identification
                before making any such payments, as you are redirected to third
                party Payment Gateways for Payment Processes.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Delivery</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Delivery period assured at the time of ordering are approximate only
                and may vary with different types of foods and depending up on the
                traffic.</li>
              <li>In case of a late delivery, the delivery charge will neither be
                voided nor refunded by vivenza.co.in Even a user cannot force a
                delivery boy to do so which may lead to legal actions.</li>
              <li>If you fail to accept delivery of Food at the time the delivery boy
                reaches the destination or vivenza.co.in delivery is unable to
                deliver at the assured time due to your failure in providing of
                appropriate land mark or address instructions or authorizations,
                then the Food shall be claimed to have been delivered to the user
                and all legal risk and responsibility in relation to such orders
                shall pass to the user.</li>
              <li>Vivenza.co.in cannot be held liable for any damage, cost or expense
                incurred to such Food as a result of a failure to provide adequate
                access or arrangements for delivery.</li>
            </ul>
            
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