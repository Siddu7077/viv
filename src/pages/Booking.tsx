
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Booking = () => {
  const [checkIn, setCheckIn] = React.useState<Date>();
  const [checkOut, setCheckOut] = React.useState<Date>();
  const [totalPrice, setTotalPrice] = React.useState(36000);

  const handlePackageChange = (value: string) => {
    setTotalPrice(value === "farmhouse" ? 36000 : 26000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow  bg-vivenza-offWhite pt-24">
        <div className="luxury-container py-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Book Your Stay
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-6">Select Package & Dates</h3>
              
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

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          initialFocus
                          disabled={(date) => !checkIn || date < checkIn}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
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
