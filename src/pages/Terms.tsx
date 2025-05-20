import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-16 font-medium mb-4 text-center">Terms & Conditions</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: May 15, 2025
            </p>
            
            <p className="text-vivenza-black/80 mb-6">
              Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the 
              www.vivenza.co.in website (the "Website") and our 'Vivenza' application for mobile and handheld devices (the "App").
              We are a brand of VIVENZA FARM, unless otherwise stated.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">1. Definitions</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li><strong>"Agreement"</strong> shall mean these Terms of Use, the Privacy Policy, any order form and payment instructions provided to you;</li>
              <li><strong>"Privacy Policy"</strong> shall mean the policy displayed on our Website which details how we collect and store your personal data;</li>
              <li><strong>"you"</strong>, <strong>"your"</strong> and <strong>"yours"</strong> shall refer to the customer accessing, ordering any Items on the Platform;</li>
              <li><strong>"Items"</strong> shall refer to any item i.e., prepared food & beverages which are displayed on platform of the Company;</li>
              <li><strong>"Delivery"</strong> shall refer to any form of delivery service with respect to the prepared food & beverages which are provided by Merchant and who takes the full responsibility of the adherence of Quality and Quantity of the Food Ordered;</li>
              <li><strong>"Platform"</strong> is a reference to our website www.vivenza.co.in which offers its Items for sale.</li>
              <li><strong>"Merchant"</strong> shall mean restaurant/Caterers or eatery partners who have agreed to provide and offer sale of their prepared food & beverages on the Platform, for which we enable the service of collecting and delivery.</li>
              <li><strong>"Event Delight Manager"</strong> means the person assigned via Platform upon receiving the order to supervise the execution of Order diligently and as per the requirements of the customer.</li>
              <li><strong>"Customer Care Service"</strong> is a Call Centre service provided by the Company to the Customers and as well as to the Merchants for various requirements and enquiries.</li>
              <li><strong>"Order Status"</strong> means the delivery track report of the Items that are ordered by the Customers through the Platform.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">2. Registration</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>You shall be eligible to Order Items on the Platform upon registration on this platform.</li>
              <li>You shall be responsible for confidentiality of your registration credentials and the activities that occur under your profile from the unauthorized access of third parties.</li>
              <li>Your email address and mobile number shall be your primary identifier and you shall update the same before the Items are booked on the Platform.</li>
              <li>You shall allow the Platform to access your location settings to enable us to provide you the area specific list of Merchants available to you and as well tracking of your Order after confirmation.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">3. Ordering</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>You can place the Order with us subject to the terms and conditions set out herein.</li>
              <li>Any contract for Order on this Platform is between you and the Merchant; whereas for the Delivery of Order on this Platform is a contract between you and VIVENZA FARM.</li>
              <li>You shall warrant that the credit or/debit card details that you provide are for your own credit or debit card.</li>
              <li>You shall warrant that items ordered from the Portal are not for resale.</li>
              <li>You can track the live status of the Order from the time of confirmation of the Order to the point of delivery at the given address on the Platform.</li>
              <li>All the images of the Items displayed on the Platform are for representation purpose only and may vary from its actual presentation.</li>
              <li>When you place your order on the Platform, you will be notified about the Order receipt either by email/SMS detailing the order placed on our Platform.</li>
              <li>The order can be modified/cancelled only through Customer care before the Order is confirmed by the Merchant.</li>
              <li>Once Order is accepted by the Merchant, Order Confirmation shall be notified through email or SMS to you. The status of the Order on the Platform changes from "Order received" to "Order Confirmed".</li>
              <li>You shall get a notification about the delivery personnel of VIVENZA FARM 3 hours before the order delivery time.</li>
              <li>VIVENZA FARM Event Delight Manager will supervise the complete execution of the order at the customer location.</li>
              <li>Our liability ends once your order has been delivered and executed to you.</li>
              <li>After delivery, you will be prompted with a feedback form which in turn help us to improve our services.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">4. Item Value and Payment</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>All prices listed on the Platform are correct at the time of publication and have been input by the Merchant.</li>
              <li>All payments made against the Orders on the Platform by you shall be compulsorily in Indian Currency in the payment modes available on the Platform.</li>
              <li>You understand, accept and agree that the payment facility provided by us is neither a banking nor financial service but is merely a facilitator providing electronic payment services.</li>
              <li>All charges for Convenience/Handling by VIVENZA FARM or a third-party provider assigned by VIVENZA FARM listed on the Platform are correct at the time of publication.</li>
              <li>All applicable taxes and levies, the rates thereof and the manner of applicability of such taxes are determined and charged by the Merchant and VIVENZA FARM is merely collecting the same on behalf of such Merchant.</li>
              <li>The transaction of sale Items is between Merchant and the customer, we are not liable to charge or deposit any taxes applicable/charged on such transaction with the required tax authorities.</li>
              <li>The final tax invoice will be issued by the Merchant and delivered to the customer along with the order.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">5. Delivery</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Delivery periods quoted at the time of ordering are approximate only and may vary. Items will be delivered to the address provided by you at the time of booking the order.</li>
              <li>We will take great care to deliver the Order on time, however no responsibility is taken for late dispatch by the Merchant.</li>
              <li>If the Items are not delivered within the estimated delivery time quoted by Merchant, please contact the Customer Care Service.</li>
              <li>In case of a late delivery, the delivery charge will neither be voided nor refunded by VIVENZA FARM.</li>
              <li>You must ensure that at the time of delivery adequate arrangements, including access where necessary, are in place for the safe delivery of the items.</li>
              <li>You shall ensure the safety of the delivery personnel in your premises and shall be responsible for any damage caused to them due to your willful negligence.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">6. Complaints</h2>
            <p className="text-vivenza-black/80 mb-6">
              We take complaints very seriously and aim to respond to your complaints within 2 business days. All complaints should be addressed to admin@gsrhospitality.com. We also provide a Chat window for addressing the complaints and queries swiftly as and when required by you.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">7. Limitation of Liability</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Great care has been taken to ensure that the information available on this Platform is correct and error free. However, we apologize for any errors or omissions that may have occurred inadvertently.</li>
              <li>Though all care has been taken, we do not warrant that use of the Platform will be error free or fit for purpose.</li>
              <li>By accepting these terms of use you agree to relieve us from any liability whatsoever arising from your use of information or website of any third party, or your consumption of any food or beverages from a Merchant.</li>
              <li>We disclaim any and all liability to you for the Delivery of Order to the fullest extent permissible under applicable law.</li>
              <li>We do not accept any liability for any delays, failures, errors or omissions or loss of transmitted information, viruses or other contamination or destructive properties transmitted to you or your computer system via our website.</li>
              <li>We shall not be held liable for any failure or delay in performing delivering items where such failure arises as a result of any act or omission which is outside our reasonable control.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">8. Refer & Earn Program</h2>
            <p className="text-vivenza-black/80 mb-2">How it Works:</p>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>Start earning, login to the latest VIVENZA FARM Android or iOS app and website.</li>
              <li>Go to the Refer & Earn section and share your unique referral link/code with your friends using any social channel of your choice.</li>
              <li>Your friends would need to download the app using your unique referral link/code to get benefits.</li>
              <li>Sign Up: When your friend signs up to VIVENZA FARM using your referral code, you will earn 10 points equal to Rs. 100 bonus as cash in your VIVENZA FARM Wallet.</li>
              <li>Place Order: When your friends make their first order, you will earn 50 points equal to Rs. 500 bonus as cash in your VIVENZA FARM Wallet.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">9. General</h2>
            <ul className="list-disc pl-6 mb-6 text-vivenza-black/80">
              <li>We may subcontract any part or parts of the Services that we provide to you from time to time.</li>
              <li>We may alter or vary the Terms and Conditions at any time without notice to you.</li>
              <li>You shall not use or launch any automated system or program in connection with our website or its online ordering functionality.</li>
              <li>The Terms and Conditions together with the Privacy Policy, any order form and payment instructions constitute the entire agreement between you and us.</li>
              <li>These Terms and Conditions and our Agreement shall be governed by and construed in accordance with the laws of India. The parties hereto submit to the exclusive jurisdiction of the courts of India.</li>
            </ul>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-vivenza-black/80 mb-10">
              Email: admin@gsrhospitality.com<br />
              Phone: +91 800 825 8888
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

export default TermsAndConditions;