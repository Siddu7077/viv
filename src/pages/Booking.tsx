import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Info as InfoIcon, CreditCard, CheckCircle, Loader2 } from "lucide-react";
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

// Mock FoodService component
const FoodService = ({ guestCount, onFoodCostUpdate }) => {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null
  });

  const mealOptions = {
    breakfast: [
      { tier: 'basic', price: 150, name: 'Basic Breakfast' },
      { tier: 'premium', price: 250, name: 'Premium Breakfast' },
      { tier: 'luxury', price: 350, name: 'Luxury Breakfast' }
    ],
    lunch: [
      { tier: 'basic', price: 300, name: 'Basic Lunch' },
      { tier: 'premium', price: 450, name: 'Premium Lunch' },
      { tier: 'luxury', price: 600, name: 'Luxury Lunch' }
    ],
    dinner: [
      { tier: 'basic', price: 350, name: 'Basic Dinner' },
      { tier: 'premium', price: 500, name: 'Premium Dinner' },
      { tier: 'luxury', price: 700, name: 'Luxury Dinner' }
    ]
  };

  useEffect(() => {
    const mealCosts = {
      breakfast: selectedMeals.breakfast ? selectedMeals.breakfast.price * guestCount : 0,
      lunch: selectedMeals.lunch ? selectedMeals.lunch.price * guestCount : 0,
      dinner: selectedMeals.dinner ? selectedMeals.dinner.price * guestCount : 0
    };
    
    const totalFoodCost = Object.values(mealCosts).reduce((sum, cost) => sum + cost, 0);
    onFoodCostUpdate(totalFoodCost, mealCosts);
  }, [selectedMeals, guestCount, onFoodCostUpdate]);

  const handleMealSelection = (mealType, option) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: option
    }));
  };

  return (
    <div className="bg-white mt-8 p-8 rounded-lg shadow-lg">
      <h3 className="font-serif text-2xl mb-6">Food Service Options</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(mealOptions).map(([mealType, options]) => (
          <div key={mealType} className="space-y-3">
            <h4 className="font-medium capitalize">{mealType}</h4>
            {options.map((option) => (
              <div key={option.tier} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${mealType}-${option.tier}`}
                  name={mealType}
                  onChange={() => handleMealSelection(mealType, option)}
                  className="w-4 h-4"
                />
                <label htmlFor={`${mealType}-${option.tier}`} className="text-sm">
                  {option.name} (₹{option.price}/person)
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Booking = () => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
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

  // Payment loading state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('processing'); // 'processing', 'success'

  // Handle package selection
  const handlePackageChange = (value) => {
    setBasePrice(value === "farmhouse" ? 36000 : 26000);
  };

  // Handle additional services changes
  const handleAdditionalServiceChange = (service, checked) => {
    setAdditionalServices({
      ...additionalServices,
      [service]: checked
    });
  };

  // Handle food service toggle
  const handleFoodServiceChange = (checked) => {
    setIncludeFoodService(checked);
    if (!checked) {
      setFoodCost(0);
      setMealCosts({
        breakfast: 0,
        lunch: 0,
        dinner: 0
      });
    }
  };

  // Handle food cost updates from FoodService component
  const handleFoodCostUpdate = (totalFoodCost, mealCostsObj) => {
    setFoodCost(totalFoodCost);
    setMealCosts(mealCostsObj);
  };

  // Handle guest count change
  const handleGuestCountChange = (e) => {
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

  // Handle payment processing
  const handleProceedToPayment = () => {
    setIsProcessingPayment(true);
    setPaymentStep('processing');
    
    // Simulate payment processing for 50 seconds, then show success for 10 seconds
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        setIsProcessingPayment(false);
        setPaymentStep('processing');
      }, 10000); // Show success for 10 seconds
    }, 50000); // Process for 50 seconds
  };
  
  // Total price calculation
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Main Content */}
      <div className={`flex-grow bg-stone-50 pt-8 transition-all duration-300 ${isProcessingPayment ? 'blur-md' : ''}`}>
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
            </div>
          </div>

          {/* Food Options Section - Only visible when food service is selected */}
          {includeFoodService && (
            <FoodService 
              guestCount={guestCount} 
              onFoodCostUpdate={handleFoodCostUpdate}
            />
          )}

          <div className="bg-white mt-16 border p-8 rounded-lg shadow-lg">
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
                      <div className="flex justify-between">
                        <span>Breakfast ({guestCount} guests):</span>
                        <span>₹{mealCosts.breakfast.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {mealCosts.lunch > 0 && (
                      <div className="flex justify-between">
                        <span>Lunch ({guestCount} guests):</span>
                        <span>₹{mealCosts.lunch.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {mealCosts.dinner > 0 && (
                      <div className="flex justify-between">
                        <span>Dinner ({guestCount} guests):</span>
                        <span>₹{mealCosts.dinner.toLocaleString()}</span>
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
              onClick={handleProceedToPayment}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Loading Modal */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {paymentStep === 'processing' ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-amber-600" />
                  </div>
                  <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-4" />
                </div>
                
                <h3 className="text-2xl font-serif font-medium mb-4">
                  Processing Payment
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Please wait while we securely process your payment for ₹{totalPrice.toLocaleString()}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Transaction ID:</span>
                    <span className="text-sm font-mono">#TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-amber-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
                
                <p className="text-xs text-gray-500">
                  Do not close this window or refresh the page
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-medium text-green-700 mb-4">
                  Payment Successful!
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Your booking has been confirmed. You will receive a confirmation email shortly.
                </p>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Booking Confirmed:</span>
                    <span className="text-sm font-semibold text-green-700">✓ Success</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Paid:</span>
                    <span className="text-sm font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;