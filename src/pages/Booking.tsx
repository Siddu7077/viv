
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Booking = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [totalPrice, setTotalPrice] = React.useState(36000); // Default price

  const handlePackageChange = (value: string) => {
    setTotalPrice(value === "farmhouse" ? 36000 : 26000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Book Your Stay
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-6">Select Package & Date</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Package</label>
                  <Select onValueChange={handlePackageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmhouse">Full Farmhouse Stay (₹36,000)</SelectItem>
                      <SelectItem value="garden">Garden Area (₹26,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <Input type="number" min="1" placeholder="Enter number of guests" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-6">Additional Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dj" />
                    <label
                      htmlFor="dj"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      DJ Services (+₹10,000)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="drinking" />
                    <label
                      htmlFor="drinking"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Drinking Permission (+₹15,000)
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-6">Price Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6">
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
