import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format, addDays, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon, InfoIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FoodService from './FoodService';

const Booking = () => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [basePrice, setBasePrice] = useState(36000);
  const [guestCount, setGuestCount] = useState(1);
  const [additionalServices, setAdditionalServices] = useState({
    dj: false,
    drinking: false,
    bonfire: false
  });

  // Food related state
  const [includeFoodService, setIncludeFoodService] = useState(false);
  const [foodCost, setFoodCost] = useState(0);
  const [mealCosts, setMealCosts] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });
  const [mealDates, setMealDates] = useState({
    breakfast: [] as Date[],
    lunch: [] as Date[],
    dinner: [] as Date[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Date[]>([]);

  // Update date range when check-in or check-out changes
  useEffect(() => {
    if (checkIn && checkOut) {
      const dates = [];
      let currentDate = new Date(checkIn);
      
      while (currentDate <= checkOut) {
        dates.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
      }
      
      setDateRange(dates);
    } else {
      setDateRange([]);
    }
  }, [checkIn, checkOut]);

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

  const handlePay = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      alert("Redirecting to payment gateway...");
      // You can navigate to the payment page here
    }, 3000); // Simulate 3 seconds loading
  };

  // Handle food service toggle
  const handleFoodServiceChange = (checked: boolean) => {
    if (checked && (!checkIn || !checkOut)) {
      alert("Please select check-in and check-out dates first");
      return;
    }
    
    setIncludeFoodService(checked);
    if (!checked) {
      setFoodCost(0);
      setMealCosts({
        breakfast: 0,
        lunch: 0,
        dinner: 0
      });
      setMealDates({
        breakfast: [],
        lunch: [],
        dinner: []
      });
    }
  };

  // Handle food cost updates from FoodService component
  const handleFoodCostUpdate = (
    totalFoodCost: number, 
    mealCostsObj: { breakfast: number, lunch: number, dinner: number },
    selectedDates: { breakfast: Date[], lunch: Date[], dinner: Date[] }
  ) => {
    setFoodCost(totalFoodCost);
    setMealCosts(mealCostsObj);
    setMealDates(selectedDates);
  };

  // Handle guest count change
  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setGuestCount(value > 0 ? value : 1);
  };

  // Calculate total price based on all selections
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
    
    // Add food service cost if selected
    if (includeFoodService) {
      total += foodCost;
    }
    
    return total;
  };
  
  // Total price calculation
  const totalPrice = calculateTotalPrice();

  // Format meal dates for display
  const formatMealDates = (dates: Date[]) => {
    if (dates.length === 0) return "Not selected";
    return dates.map(date => format(date, "MMM d")).join(", ");
  };

  // Order Summary Component
  const OrderSummary = ({ className = "" }) => (
    <div className={`bg-white border p-6 rounded-lg shadow-lg ${className}`}>
      <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Base Package:</span>
          <span>₹{basePrice.toLocaleString()}</span>
        </div>
        
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
        
        {includeFoodService && foodCost > 0 && (
          <>
            <div className="pt-2 border-t border-dashed">
              <div className="text-lg font-medium mb-2">Food Services</div>
              
              {mealCosts.breakfast > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Breakfast ({guestCount} guests):</span>
                    <span>₹{mealCosts.breakfast.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Dates: {formatMealDates(mealDates.breakfast)} at 9:00 AM
                  </div>
                </div>
              )}
              
              {mealCosts.lunch > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Lunch ({guestCount} guests):</span>
                    <span>₹{mealCosts.lunch.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Dates: {formatMealDates(mealDates.lunch)} at 2:00 PM
                  </div>
                </div>
              )}
              
              {mealCosts.dinner > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Dinner ({guestCount} guests):</span>
                    <span>₹{mealCosts.dinner.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Dates: {formatMealDates(mealDates.dinner)} at 10:00 PM
                  </div>
                </div>
              )}
              
              <div className="flex justify-between font-medium pt-2">
                <span>Total Food Cost:</span>
                <span>₹{foodCost.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}
        
        <div className="pt-4 border-t border-gray-300">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-amber-500 hover:bg-amber-600"
        onClick={handlePay} 
        disabled={isLoading || !checkIn || !checkOut}
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-stone-50 pt-24">
        <div className="container mx-auto py-16 px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Book Your Stay
          </h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>

          <div className="bg-amber-50 p-4 rounded-lg mb-8 text-center">
            <p className="text-sm md:text-base">
              <strong>Check-in time:</strong> 12:00 PM on arrival day &nbsp;|&nbsp; 
              <strong>Check-out time:</strong> 11:00 AM on departure day
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-serif text-2xl mb-6">Select Package & Dates</h3>
              
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
                <h3 className="font-serif text-2xl mb-6">Additional Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dj" 
                      checked={additionalServices.dj}
                      onCheckedChange={(checked) => 
                        handleAdditionalServiceChange("dj", checked === true)
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
                        handleAdditionalServiceChange("drinking", checked === true)
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
                        handleAdditionalServiceChange("bonfire", checked === true)
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
                          handleFoodServiceChange(checked === true)
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
                            <p className="w-64">Select from breakfast, lunch, and dinner options with different price tiers.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary - Show here if food service is not included */}
              {!includeFoodService && <OrderSummary />}
            </div>
          </div>

          {/* Food Options Section with Order Summary - Only visible when food service is selected */}
          {includeFoodService && (
            <div className="mt-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Food Service Section - 70% width on large screens */}
                <div className="lg:w-[70%]">
                  <FoodService 
                    guestCount={guestCount} 
                    onFoodCostUpdate={handleFoodCostUpdate}
                    dateRange={dateRange}
                  />
                </div>
                
                {/* Order Summary - 30% width on large screens, sticky on top */}
                <div className="lg:w-[30%]">
                  <div className="lg:sticky lg:top-36">
                    <OrderSummary />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-pulse">
            <p className="text-xl font-semibold mb-4">Proceeding to Payment...</p>
            <div className="h-2 w-2/3 mx-auto bg-amber-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;