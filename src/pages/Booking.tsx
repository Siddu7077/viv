import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon, InfoIcon, CheckIcon, CheckCircle2 } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample food menu data
const foodMenuData = {
  vegetarian: {
    silver: {
      name: "Silver Package",
      price: 1000,
      description: "Essential vegetarian menu with quality ingredients",
      starters: [
        { id: "vs1", name: "Paneer Tikka", image: "https://cdn.pixabay.com/photo/2019/09/16/14/43/india-4480420_640.jpg", description: "Marinated cottage cheese grilled to perfection" },
        { id: "vs2", name: "Vegetable Spring Rolls", image: "https://cdn.pixabay.com/photo/2015/03/20/19/05/spring-rolls-682903_640.jpg", description: "Crispy rolls filled with vegetables" },
        { id: "vs3", name: "Hara Bhara Kabab", image: "https://cdn.pixabay.com/photo/2017/11/08/15/34/recipe-2930786_640.jpg", description: "Spinach and pea patties" },
        { id: "vs4", name: "Aloo Tikki", image: "https://cdn.pixabay.com/photo/2017/06/02/13/59/potato-cakes-2366168_640.jpg", description: "Spiced potato patties" }
      ],
      mainCourse: [
        { id: "vm1", name: "Paneer Butter Masala", image: "https://cdn.pixabay.com/photo/2020/03/02/15/38/paneer-butter-masala-4896193_640.jpg", description: "Cottage cheese in rich tomato gravy" },
        { id: "vm2", name: "Dal Makhani", image: "https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158702_640.jpg", description: "Creamy black lentils" },
        { id: "vm3", name: "Veg Biryani", image: "https://cdn.pixabay.com/photo/2019/11/15/08/54/india-4628055_640.jpg", description: "Fragrant rice with vegetables" }
      ],
      desserts: [
        { id: "vd1", name: "Gulab Jamun", image: "https://cdn.pixabay.com/photo/2020/03/16/10/47/gulab-jamun-4936601_640.jpg", description: "Sweet milk dumplings" },
        { id: "vd2", name: "Rice Kheer", image: "https://cdn.pixabay.com/photo/2017/07/25/10/35/desserts-2537241_640.jpg", description: "Rice pudding with nuts" }
      ]
    },
    gold: {
      name: "Gold Package",
      price: 1500,
      description: "Premium vegetarian dishes with enhanced flavors",
      starters: [
        { id: "vgs1", name: "Dahi Ke Kebab", image: "https://cdn.pixabay.com/photo/2015/05/01/09/56/kebab-748457_640.jpg", description: "Yogurt-based soft kebabs" },
        { id: "vgs2", name: "Stuffed Mushrooms", image: "https://cdn.pixabay.com/photo/2015/03/26/09/39/food-690570_640.jpg", description: "Mushrooms with herb filling" },
        { id: "vgs3", name: "Crispy Corn", image: "https://cdn.pixabay.com/photo/2018/02/05/22/52/corn-3133321_640.jpg", description: "Sweet and spicy fried corn" },
        { id: "vgs4", name: "Paneer Shashlik", image: "https://cdn.pixabay.com/photo/2018/04/16/12/13/appetizer-3324638_640.jpg", description: "Grilled paneer with vegetables" }
      ],
      mainCourse: [
        { id: "vgm1", name: "Malai Kofta", image: "https://cdn.pixabay.com/photo/2019/09/24/12/46/kofta-4500201_640.jpg", description: "Potato dumplings in creamy sauce" },
        { id: "vgm2", name: "Kadai Paneer", image: "https://cdn.pixabay.com/photo/2020/09/21/19/00/kadhai-paneer-5590654_640.jpg", description: "Paneer in spiced bell pepper gravy" },
        { id: "vgm3", name: "Vegetable Jalfrezi", image: "https://cdn.pixabay.com/photo/2017/05/05/19/06/indian-food-2288118_640.jpg", description: "Mixed vegetables in tangy sauce" },
        { id: "vgm4", name: "Hyderabadi Biryani", image: "https://cdn.pixabay.com/photo/2021/01/22/18/00/shahi-biryani-5940740_640.jpg", description: "Aromatic rice with vegetables" }
      ],
      desserts: [
        { id: "vgd1", name: "Rasmalai", image: "https://cdn.pixabay.com/photo/2018/07/11/21/36/bowl-3532464_640.jpg", description: "Cheese patties in sweet milk" },
        { id: "vgd2", name: "Gajar Ka Halwa", image: "https://cdn.pixabay.com/photo/2019/04/14/11/06/carrot-4126569_640.jpg", description: "Carrot pudding with nuts" },
        { id: "vgd3", name: "Kulfi", image: "https://cdn.pixabay.com/photo/2023/09/14/14/57/ice-8253792_640.jpg", description: "Traditional Indian ice cream" }
      ]
    },
    diamond: {
      name: "Diamond Package",
      price: 2000,
      description: "Gourmet vegetarian cuisine with signature specialties",
      starters: [
        { id: "vds1", name: "Tandoori Broccoli", image: "https://cdn.pixabay.com/photo/2015/03/26/09/42/broccoli-690598_640.jpg", description: "Marinated broccoli from clay oven" },
        { id: "vds2", name: "Avocado Papdi Chaat", image: "https://cdn.pixabay.com/photo/2017/08/11/00/32/avocado-2629216_640.jpg", description: "Crispy crackers with avocado topping" },
        { id: "vds3", name: "Truffle Mushroom Tikka", image: "https://cdn.pixabay.com/photo/2022/01/01/16/45/mushrooms-6908654_640.jpg", description: "Mushrooms with truffle oil" },
        { id: "vds4", name: "Zucchini Kebabs", image: "https://cdn.pixabay.com/photo/2017/08/10/06/31/kebab-2619533_640.jpg", description: "Spiced zucchini patties" },
        { id: "vds5", name: "Stuffed Jalapeno Poppers", image: "https://cdn.pixabay.com/photo/2016/11/11/01/23/appetizer-1815541_640.jpg", description: "Cheese filled jalapenos" }
      ],
      mainCourse: [
        { id: "vdm1", name: "Paneer Lababdar", image: "https://cdn.pixabay.com/photo/2022/03/07/07/53/chef-7052808_640.jpg", description: "Cottage cheese in rich gravy" },
        { id: "vdm2", name: "Subz Nargisi Kofta", image: "https://cdn.pixabay.com/photo/2018/06/04/13/58/food-3453233_640.jpg", description: "Vegetable dumplings with egg-less filling" },
        { id: "vdm3", name: "Achaari Baingan", image: "https://cdn.pixabay.com/photo/2014/07/31/23/49/baingan-burtha-407115_640.jpg", description: "Eggplant in pickle spices" },
        { id: "vdm4", name: "Quinoa Biryani", image: "https://cdn.pixabay.com/photo/2014/10/22/18/43/quinoa-498468_640.jpg", description: "Quinoa with aromatic spices" },
        { id: "vdm5", name: "Kashmiri Dum Aloo", image: "https://cdn.pixabay.com/photo/2022/02/08/19/12/potatoes-7001889_640.jpg", description: "Baby potatoes in yogurt gravy" }
      ],
      desserts: [
        { id: "vdd1", name: "Pista Kulfi", image: "https://cdn.pixabay.com/photo/2016/05/05/02/41/ice-cream-1373161_640.jpg", description: "Pistachio ice cream" },
        { id: "vdd2", name: "Saffron Phirni", image: "https://cdn.pixabay.com/photo/2019/05/01/13/54/phirni-4171510_640.jpg", description: "Rice pudding with saffron" },
        { id: "vdd3", name: "Rose Sandesh", image: "https://cdn.pixabay.com/photo/2018/06/10/20/30/moods-3467623_640.jpg", description: "Rose-flavored cheese dessert" },
        { id: "vdd4", name: "Apple Jalebi with Ice Cream", image: "https://cdn.pixabay.com/photo/2019/03/06/14/05/jalebi-4037580_640.jpg", description: "Apple fritters with ice cream" }
      ]
    }
  },
  nonVegetarian: {
    silver: {
      name: "Silver Package",
      price: 1200,
      description: "Classic non-vegetarian favorites",
      starters: [
        { id: "nvs1", name: "Chicken Tikka", image: "https://cdn.pixabay.com/photo/2019/05/29/10/39/chicken-tikka-4236996_640.jpg", description: "Marinated chicken pieces grilled" },
        { id: "nvs2", name: "Fish Amritsari", image: "https://cdn.pixabay.com/photo/2016/08/23/23/12/fish-1615821_640.jpg", description: "Battered and fried fish" },
        { id: "nvs3", name: "Keema Samosa", image: "https://cdn.pixabay.com/photo/2021/06/13/06/35/samosa-6332023_640.jpg", description: "Pastry filled with minced meat" },
        { id: "nvs4", name: "Chicken 65", image: "https://cdn.pixabay.com/photo/2018/09/23/09/15/chicken-3697334_640.jpg", description: "Spicy fried chicken" }
      ],
      mainCourse: [
        { id: "nvm1", name: "Butter Chicken", image: "https://cdn.pixabay.com/photo/2020/04/11/18/13/butter-5031203_640.jpg", description: "Chicken in tomato butter sauce" },
        { id: "nvm2", name: "Mutton Curry", image: "https://cdn.pixabay.com/photo/2018/01/01/17/57/fish-soup-3054627_640.jpg", description: "Traditional mutton curry" },
        { id: "nvm3", name: "Chicken Biryani", image: "https://cdn.pixabay.com/photo/2015/05/31/13/59/biryani-791324_640.jpg", description: "Rice cooked with chicken" }
      ],
      desserts: [
        { id: "nvd1", name: "Gulab Jamun", image: "https://cdn.pixabay.com/photo/2020/03/16/10/47/gulab-jamun-4936601_640.jpg", description: "Sweet milk dumplings" },
        { id: "nvd2", name: "Rice Kheer", image: "https://cdn.pixabay.com/photo/2017/07/25/10/35/desserts-2537241_640.jpg", description: "Rice pudding with nuts" }
      ]
    },
    gold: {
      name: "Gold Package",
      price: 1800,
      description: "Premium non-vegetarian selection with specialty dishes",
      starters: [
        { id: "nvgs1", name: "Tandoori Prawns", image: "https://cdn.pixabay.com/photo/2014/04/05/11/41/shrimp-316407_640.jpg", description: "Prawns marinated and grilled" },
        { id: "nvgs2", name: "Mutton Seekh Kebab", image: "https://cdn.pixabay.com/photo/2016/06/25/21/20/meat-1479686_640.jpg", description: "Minced mutton skewers" },
        { id: "nvgs3", name: "Chicken Malai Tikka", image: "https://cdn.pixabay.com/photo/2022/01/01/09/59/chicken-6908504_640.jpg", description: "Creamy chicken tikka" },
        { id: "nvgs4", name: "Fish Koliwada", image: "https://cdn.pixabay.com/photo/2013/07/19/09/45/fish-165220_640.jpg", description: "Spiced fried fish" }
      ],
      mainCourse: [
        { id: "nvgm1", name: "Rogan Josh", image: "https://cdn.pixabay.com/photo/2020/12/31/12/18/curry-5876421_640.jpg", description: "Kashmiri mutton curry" },
        { id: "nvgm2", name: "Chicken Chettinad", image: "https://cdn.pixabay.com/photo/2016/01/15/06/57/chicken-1141397_640.jpg", description: "Spicy South Indian chicken" },
        { id: "nvgm3", name: "Fish Curry", image: "https://cdn.pixabay.com/photo/2015/05/01/08/09/fish-748386_640.jpg", description: "Fish in tangy curry" },
        { id: "nvgm4", name: "Hyderabadi Dum Biryani", image: "https://cdn.pixabay.com/photo/2022/05/20/13/36/biriyani-7210029_640.jpg", description: "Layered rice with meat" }
      ],
      desserts: [
        { id: "nvgd1", name: "Rasmalai", image: "https://cdn.pixabay.com/photo/2018/07/11/21/36/bowl-3532464_640.jpg", description: "Cheese patties in sweet milk" },
        { id: "nvgd2", name: "Gajar Ka Halwa", image: "https://cdn.pixabay.com/photo/2019/04/14/11/06/carrot-4126569_640.jpg", description: "Carrot pudding with nuts" },
        { id: "nvgd3", name: "Shahi Tukda", image: "https://cdn.pixabay.com/photo/2019/03/03/15/47/shahi-tukda-4032586_640.jpg", description: "Bread pudding with cream" }
      ]
    },
    diamond: {
      name: "Diamond Package",
      price: 2500,
      description: "Gourmet non-vegetarian feast with signature specialties",
      starters: [
        { id: "nvds1", name: "Lamb Chops", image: "https://cdn.pixabay.com/photo/2014/10/30/20/21/lamb-chops-509728_640.jpg", description: "Grilled marinated lamb chops" },
        { id: "nvds2", name: "Prawn Tempura", image: "https://cdn.pixabay.com/photo/2019/06/18/11/30/prawn-4282340_640.jpg", description: "Battered and fried prawns" },
        { id: "nvds3", name: "Chicken Liver Pâté", image: "https://cdn.pixabay.com/photo/2018/07/22/12/34/liver-3554511_640.jpg", description: "Smooth chicken liver spread" },
        { id: "nvds4", name: "Smoked Salmon Canapés", image: "https://cdn.pixabay.com/photo/2016/03/05/20/02/appetizers-1238615_640.jpg", description: "Bread with salmon topping" },
        { id: "nvds5", name: "Grilled Scallops", image: "https://cdn.pixabay.com/photo/2018/07/07/23/50/scallops-3522813_640.jpg", description: "Scallops with herb butter" }
      ],
      mainCourse: [
        { id: "nvdm1", name: "Butter Garlic Lobster", image: "https://cdn.pixabay.com/photo/2016/08/29/15/12/lobster-1628607_640.jpg", description: "Lobster in garlic butter" },
        { id: "nvdm2", name: "Nalli Nihari", image: "https://cdn.pixabay.com/photo/2020/05/28/14/27/meat-5230927_640.jpg", description: "Slow-cooked lamb shanks" },
        { id: "nvdm3", name: "Duck Confit", image: "https://cdn.pixabay.com/photo/2014/07/31/22/54/duck-confit-406004_640.jpg", description: "Preserved duck with spices" },
        { id: "nvdm4", name: "Kashmiri Lamb Biryani", image: "https://cdn.pixabay.com/photo/2017/07/21/10/31/rice-2525186_640.jpg", description: "Fragrant rice with lamb" },
        { id: "nvdm5", name: "Goan Fish Curry", image: "https://cdn.pixabay.com/photo/2017/09/23/12/40/calamari-2778133_640.jpg", description: "Fish in coconut curry" }
      ],
      desserts: [
        { id: "nvdd1", name: "Baklava", image: "https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158706_640.jpg", description: "Layered pastry with nuts" },
        { id: "nvdd2", name: "Crème Brûlée", image: "https://cdn.pixabay.com/photo/2014/03/14/09/50/cream-brulee-286889_640.jpg", description: "Custard with caramelized top" },
        { id: "nvdd3", name: "Chocolate Truffle Cake", image: "https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_640.jpg", description: "Rich chocolate cake" },
        { id: "nvdd4", name: "Tiramisu", image: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_640.jpg", description: "Coffee-flavored Italian dessert" }
      ]
    }
  }
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
  const [foodType, setFoodType] = useState("");
  const [foodPackage, setFoodPackage] = useState("");
  const [selectedFoodItems, setSelectedFoodItems] = useState({
    starters: [],
    mainCourse: [],
    desserts: []
  });
  
  // Food selection limits
  const [selectionLimits, setSelectionLimits] = useState({
    starters: 2,
    mainCourse: 1,
    desserts: 1
  });

  // Calculate food cost based on selections
  const calculateFoodCost = () => {
    if (!includeFoodService || !foodType || !foodPackage) return 0;
    
    // Get base price for the package
    const packageData = foodType === 'vegetarian' 
      ? foodMenuData.vegetarian[foodPackage]
      : foodMenuData.nonVegetarian[foodPackage];
      
    if (!packageData) return 0;
    
    return packageData.price * guestCount;
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
      total += calculateFoodCost();
    }
    
    return total;
  };

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
      setFoodType("");
      setFoodPackage("");
      setSelectedFoodItems({
        starters: [],
        mainCourse: [],
        desserts: []
      });
    }
  };

  // Handle food item selection
  const handleFoodItemSelection = (category, itemId) => {
    setSelectedFoodItems(prevState => {
      const updatedItems = { ...prevState };
      
      // If item is already selected, remove it
      if (updatedItems[category].includes(itemId)) {
        updatedItems[category] = updatedItems[category].filter(id => id !== itemId);
      } 
      // If not selected and under the limit, add it
      else if (updatedItems[category].length < selectionLimits[category]) {
        updatedItems[category] = [...updatedItems[category], itemId];
      }
      
      return updatedItems;
    });
  };

  // Update selection limits based on package
  useEffect(() => {
    if (foodPackage === 'silver') {
      setSelectionLimits({
        starters: 2,
        mainCourse: 1,
        desserts: 1
      });
    } else if (foodPackage === 'gold') {
      setSelectionLimits({
        starters: 3,
        mainCourse: 2,
        desserts: 2
      });
    } else if (foodPackage === 'diamond') {
      setSelectionLimits({
        starters: 4,
        mainCourse: 3,
        desserts: 2
      });
    }
    
    // Reset selections when package changes
    setSelectedFoodItems({
      starters: [],
      mainCourse: [],
      desserts: []
    });
  }, [foodPackage]);

  // Handle guest count change
  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setGuestCount(value > 0 ? value : 1);
  };

  // Total price calculation
  const totalPrice = calculateTotalPrice();
  const foodCost = calculateFoodCost();

  // Get package data based on current selections
  const getPackageData = () => {
    if (!foodType || !foodPackage) return null;
    return foodType === 'vegetarian' 
      ? foodMenuData.vegetarian[foodPackage]
      : foodMenuData.nonVegetarian[foodPackage];
  };

  const packageData = getPackageData();

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
                          // onSelect={setCheckIn}
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
                          // onSelect={setCheckOut}
                          initialFocus
                          // disabled={(date) => !checkIn || date < checkIn}
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
                        handleAdditionalServiceChange("dj", checked)
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
                        handleAdditionalServiceChange("drinking", checked)
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
                        handleAdditionalServiceChange("bonfire", checked)
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
                          handleFoodServiceChange(checked)
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
                            <p className="w-64">Options for vegetarian and non-vegetarian menus with different price tiers.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-serif text-2xl mb-6">Price Summary</h3>
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
                  
                  {includeFoodService && foodCost > 0 && (
                    <div className="flex justify-between">
                      <span>Food Services ({foodType}, {foodPackage} package, {guestCount} guest{guestCount !== 1 ? 's' : ''}):</span>
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
                <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700">
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>

          {/* Food Options Section - Only visible when food service is selected */}
         {includeFoodService && (
  <div className="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-serif text-2xl mb-6 text-gray-800">Food Service</h3>
    
    {/* Step 1: Choose Food Type */}
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
          1
        </div>
        <h4 className="text-lg font-medium text-gray-700">Select Menu Type</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all border-2 ${foodType === 'vegetarian' ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-gray-200'}`}
          onClick={() => setFoodType('vegetarian')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span className="text-gray-800">Vegetarian</span>
              {foodType === 'vegetarian' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            </CardTitle>
            <CardDescription className="text-gray-600">Plant-based menu options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
              <img 
                src="/api/placeholder/400/250" 
                alt="Vegetarian food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Diverse vegetarian dishes with fresh ingredients</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all border-2 ${foodType === 'nonVegetarian' ? 'border-red-500 bg-red-50' : 'border-transparent hover:border-gray-200'}`}
          onClick={() => setFoodType('nonVegetarian')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span className="text-gray-800">Non-Vegetarian</span>
              {foodType === 'nonVegetarian' && <CheckCircle2 className="h-5 w-5 text-red-500" />}
            </CardTitle>
            <CardDescription className="text-gray-600">Meat and seafood options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
              <img 
                src="/api/placeholder/400/250" 
                alt="Non-vegetarian food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Premium meat and seafood dishes</p>
          </CardContent>
        </Card>
      </div>
    </div>
    
    {/* Step 2: Choose Package */}
    {foodType && (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
            2
          </div>
          <h4 className="text-lg font-medium text-gray-700">Select Package</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Silver Package */}
          <Card 
            className={`cursor-pointer transition-all border-2 ${foodPackage === 'silver' ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => setFoodPackage('silver')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Silver</span>
                {foodPackage === 'silver' && <CheckCircle2 className="h-5 w-5 text-blue-500" />}
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  ₹{foodType === 'vegetarian' ? '1,000' : '1,200'}/person
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>2 starters, 1 main course, 1 dessert</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Standard ingredients</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Gold Package */}
          <Card 
            className={`cursor-pointer transition-all border-2 ${foodPackage === 'gold' ? 'border-amber-500 bg-amber-50' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => setFoodPackage('gold')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Gold</span>
                {foodPackage === 'gold' && <CheckCircle2 className="h-5 w-5 text-amber-500" />}
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  ₹{foodType === 'vegetarian' ? '1,500' : '1,800'}/person
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>3 starters, 2 main courses, 2 desserts</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Premium ingredients</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Diamond Package */}
          <Card 
            className={`cursor-pointer transition-all border-2 ${foodPackage === 'diamond' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => setFoodPackage('diamond')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Diamond</span>
                {foodPackage === 'diamond' && <CheckCircle2 className="h-5 w-5 text-purple-500" />}
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  ₹{foodType === 'vegetarian' ? '2,000' : '2,500'}/person
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>4 starters, 3 main courses, 2 desserts</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Gourmet specialties</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )}
    
    {/* Step 3: Select Menu Items */}
    {foodPackage && packageData && (
      <div>
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
            3
          </div>
          <h4 className="text-lg font-medium text-gray-700">Customize Your Menu</h4>
        </div>
        
        <Tabs defaultValue="starters" className="w-full">
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="starters" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Starters
            </TabsTrigger>
            <TabsTrigger value="mainCourse" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Main Course
            </TabsTrigger>
            <TabsTrigger value="desserts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Desserts
            </TabsTrigger>
          </TabsList>
          
          {/* Starters Tab */}
          <TabsContent value="starters">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                Select {selectionLimits.starters} starters ({selectedFoodItems.starters.length}/{selectionLimits.starters})
              </Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packageData.starters.map(item => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all overflow-hidden ${
                      selectedFoodItems.starters.includes(item.id) 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:ring-1 hover:ring-gray-200'
                    }`}
                    onClick={() => handleFoodItemSelection('starters', item.id)}
                  >
                    <div className="relative h-40">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        {selectedFoodItems.starters.includes(item.id) && (
                          <div className="bg-green-100 rounded-full p-1 ml-2">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Main Course Tab */}
          <TabsContent value="mainCourse">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                Select {selectionLimits.mainCourse} main courses ({selectedFoodItems.mainCourse.length}/{selectionLimits.mainCourse})
              </Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packageData.mainCourse.map(item => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all overflow-hidden ${
                      selectedFoodItems.mainCourse.includes(item.id) 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:ring-1 hover:ring-gray-200'
                    }`}
                    onClick={() => handleFoodItemSelection('mainCourse', item.id)}
                  >
                    <div className="relative h-40">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        {selectedFoodItems.mainCourse.includes(item.id) && (
                          <div className="bg-green-100 rounded-full p-1 ml-2">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Desserts Tab */}
          <TabsContent value="desserts">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                Select {selectionLimits.desserts} desserts ({selectedFoodItems.desserts.length}/{selectionLimits.desserts})
              </Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packageData.desserts.map(item => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all overflow-hidden ${
                      selectedFoodItems.desserts.includes(item.id) 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:ring-1 hover:ring-gray-200'
                    }`}
                    onClick={() => handleFoodItemSelection('desserts', item.id)}
                  >
                    <div className="relative h-40">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        {selectedFoodItems.desserts.includes(item.id) && (
                          <div className="bg-green-100 rounded-full p-1 ml-2">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Menu Selection Summary */}
        <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="font-medium text-gray-800 mb-3">Your Menu Summary</h5>
          <div className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Starters:</span>
                <span className="text-gray-600">
                  {selectedFoodItems.starters.length > 0 ? (
                    selectedFoodItems.starters.map(id => {
                      const item = packageData.starters.find(starter => starter.id === id);
                      return item ? item.name : '';
                    }).join(', ')
                  ) : 'None selected'}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Main Course:</span>
                <span className="text-gray-600">
                  {selectedFoodItems.mainCourse.length > 0 ? (
                    selectedFoodItems.mainCourse.map(id => {
                      const item = packageData.mainCourse.find(main => main.id === id);
                      return item ? item.name : '';
                    }).join(', ')
                  ) : 'None selected'}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Desserts:</span>
                <span className="text-gray-600">
                  {selectedFoodItems.desserts.length > 0 ? (
                    selectedFoodItems.desserts.map(id => {
                      const item = packageData.desserts.find(dessert => dessert.id === id);
                      return item ? item.name : '';
                    }).join(', ')
                  ) : 'None selected'}
                </span>
              </div>
            </div>
            
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex justify-between font-medium text-gray-800">
                <span>Total Food Cost:</span>
                <span>₹{foodCost.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                (₹{packageData.price} × {guestCount} guests)
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}

          {/* Final Checkout Button - Make it more prominent at the bottom */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-12 py-6">
              Complete Booking • ₹{totalPrice.toLocaleString()}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              You will be asked to provide additional details on the next page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;