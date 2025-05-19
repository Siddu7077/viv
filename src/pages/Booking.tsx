import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { CalendarIcon, InfoIcon } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Booking = () => {
  const [checkIn, setCheckIn] = React.useState<Date>();
  const [checkOut, setCheckOut] = React.useState<Date>();
  const [basePrice, setBasePrice] = React.useState(36000);
  const [includeFoodService, setIncludeFoodService] = React.useState(false);
  const [foodType, setFoodType] = React.useState<string>("");
  const [guestCount, setGuestCount] = React.useState<number>(1);
  const [additionalServices, setAdditionalServices] = React.useState({
    dj: false,
    drinking: false,
    bonfire: false
  });

  // Calculate food cost based on guest count and food type
  const calculateFoodCost = () => {
    if (!includeFoodService || !guestCount) return 0;
    
    // Base prices per person
    const pricePerPerson = foodType === 'vegetarian' ? 800 : 1200;
    
    return pricePerPerson * guestCount;
  };

  // Calculate total price based on selections
  const calculateTotalPrice = () => {
    let total = basePrice;
    
    // Add DJ service cost if selected
    if (additionalServices.dj) {
      total += 10000;
    }
    
    // Add drinking permission cost if selected
    if (additionalServices.drinking) {
      total += 15000;
    }
    
    // Add bonfire cost if selected
    if (additionalServices.bonfire) {
      total += 2500;
    }
    
    // Add food service cost if selected (based on guest count and food type)
    if (includeFoodService) {
      total += calculateFoodCost();
    }
    
    return total;
  };

  // Handle package selection
  const handlePackageChange = (value: string) => {
    setBasePrice(value === "farmhouse" ? 36000 : 26000);
  };

  // Handle additional services changes
  const handleAdditionalServiceChange = (service: string, checked: boolean) => {
    setAdditionalServices({
      ...additionalServices,
      [service]: checked
    });
  };

  // Handle food service toggle
  const handleFoodServiceChange = (checked: boolean) => {
    setIncludeFoodService(checked);
    if (!checked) {
      setFoodType("");
    }
  };

  // Handle guest count change
  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setGuestCount(value > 0 ? value : 1);
  };

  // Total price calculation
  const totalPrice = calculateTotalPrice();
  const foodCost = calculateFoodCost();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite pt-24">
        <div className="luxury-container py-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Book Your Stay
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="bg-amber-50 p-4 rounded-lg mb-8 text-center">
            <p className="text-sm md:text-base">
              <strong>Check-in time:</strong> 12:00 PM on arrival day &nbsp;|&nbsp; 
              <strong>Check-out time:</strong> 11:00 AM on departure day
            </p>
          </div>

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
                  <Input 
                    type="number" 
                    min="1" 
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    placeholder="Enter number of guests" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-6">Additional Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dj" 
                      checked={additionalServices.dj}
                      onCheckedChange={(checked) => 
                        handleAdditionalServiceChange("dj", checked as boolean)
                      }
                    />
                    <label
                      htmlFor="dj"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      DJ Services (+₹10,000)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="drinking" 
                      checked={additionalServices.drinking}
                      onCheckedChange={(checked) => 
                        handleAdditionalServiceChange("drinking", checked as boolean)
                      }
                    />
                    <label
                      htmlFor="drinking"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Drinking Permission (+₹15,000)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="bonfire" 
                      checked={additionalServices.bonfire}
                      onCheckedChange={(checked) => 
                        handleAdditionalServiceChange("bonfire", checked as boolean)
                      }
                    />
                    <label
                      htmlFor="bonfire"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Bonfire (+₹2,500)
                    </label>
                  </div>
                  
                  {/* Food Service Option */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="food" 
                        checked={includeFoodService}
                        onCheckedChange={(checked) => 
                          handleFoodServiceChange(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="food"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include Food Services
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64">Vegetarian: ₹800 per person<br />Non-Vegetarian: ₹1,200 per person</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {includeFoodService && (
                      <div className="mt-4 ml-6">
                        <label className="block text-sm font-medium mb-2">Food Preference</label>
                        <Select onValueChange={setFoodType} value={foodType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select food preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-6">Price Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
                  
                  {/* Show additional services in summary */}
                  {additionalServices.dj && (
                    <div className="flex justify-between">
                      <span>DJ Services:</span>
                      <span>₹10,000</span>
                    </div>
                  )}
                  
                  {additionalServices.drinking && (
                    <div className="flex justify-between">
                      <span>Drinking Permission:</span>
                      <span>₹15,000</span>
                    </div>
                  )}
                  
                  {additionalServices.bonfire && (
                    <div className="flex justify-between">
                      <span>Bonfire:</span>
                      <span>₹2,500</span>
                    </div>
                  )}
                  
                  {includeFoodService && (
                    <div className="flex justify-between">
                      <span>Food Services ({foodType || "not specified"}, {guestCount} guest{guestCount !== 1 ? 's' : ''}):</span>
                      <span>₹{foodCost.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
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