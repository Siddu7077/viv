import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert";

// Import food data
import { foodMenuData } from './foodData.js';

interface FoodItemType {
    id: string;
    name: string;
    description: string;
}

interface PackageDataType {
    name: string;
    description: string;
    price: number;
    items?: FoodItemType[];
    starters?: FoodItemType[];
    mainCourse?: FoodItemType[];
    desserts?: FoodItemType[];
}

interface FoodSelectionType {
    breakfast: {
        package: string;
    };
    lunch: {
        type: string;
        package: string;
    };
    dinner: {
        type: string;
        package: string;
    };
}

interface SelectedFoodItemsType {
    breakfast: {
        items: string[];
    };
    lunch: {
        starters: string[];
        mainCourse: string[];
        desserts: string[];
    };
    dinner: {
        starters: string[];
        mainCourse: string[];
        desserts: string[];
    };
}

interface SelectionLimitsType {
    breakfast: {
        items: number;
    };
    lunch: {
        starters: number;
        mainCourse: number;
        desserts: number;
    };
    dinner: {
        starters: number;
        mainCourse: number;
        desserts: number;
    };
}

interface MealDatesType {
    breakfast: Date[];
    lunch: Date[];
    dinner: Date[];
}

interface FoodServiceProps {
    guestCount: number;
    dateRange: Date[];
    onFoodCostUpdate: (
        total: number, 
        mealCosts: { breakfast: number, lunch: number, dinner: number },
        selectedDates: { breakfast: Date[], lunch: Date[], dinner: Date[] }
    ) => void;
}

const FoodService: React.FC<FoodServiceProps> = ({ guestCount, dateRange, onFoodCostUpdate }) => {
    // Food related state
    const [meals, setMeals] = useState({
        breakfast: false,
        lunch: false,
        dinner: false
    });

    // Food type and package for each meal
    const [foodSelections, setFoodSelections] = useState<FoodSelectionType>({
        breakfast: {
            package: ""
        },
        lunch: {
            type: "",
            package: ""
        },
        dinner: {
            type: "",
            package: ""
        }
    });

    // Food item selections for each meal
    const [selectedFoodItems, setSelectedFoodItems] = useState<SelectedFoodItemsType>({
        breakfast: {
            items: []
        },
        lunch: {
            starters: [],
            mainCourse: [],
            desserts: []
        },
        dinner: {
            starters: [],
            mainCourse: [],
            desserts: []
        }
    });

    // Dates for each meal
    const [mealDates, setMealDates] = useState<MealDatesType>({
        breakfast: [],
        lunch: [],
        dinner: []
    });

    // Food selection limits for each meal based on package
    const [selectionLimits, setSelectionLimits] = useState<SelectionLimitsType>({
        breakfast: {
            items: 2
        },
        lunch: {
            starters: 2,
            mainCourse: 1,
            desserts: 1
        },
        dinner: {
            starters: 2,
            mainCourse: 1,
            desserts: 1
        }
    });

    // Validation state
    const [validationErrors, setValidationErrors] = useState({
        breakfast: false,
        lunch: false,
        dinner: false
    });

    // Handle date selection for meals
    const handleMealDateChange = (meal: 'breakfast' | 'lunch' | 'dinner', date: Date) => {
        setMealDates(prev => {
            const newDates = [...prev[meal]];
            const dateIndex = newDates.findIndex(d => isSameDay(d, date));
            
            if (dateIndex >= 0) {
                // Remove date if already selected
                newDates.splice(dateIndex, 1);
            } else {
                // Add date if not selected
                newDates.push(date);
            }
            
            return {
                ...prev,
                [meal]: newDates
            };
        });
    };

    // Calculate meal costs based on selected dates
    const calculateMealCost = (meal: 'breakfast' | 'lunch' | 'dinner'): number => {
        if (meal === 'breakfast' && meals.breakfast && foodSelections.breakfast.package) {
            const packageData = foodMenuData.breakfast[foodSelections.breakfast.package];
            return packageData ? packageData.price * guestCount * mealDates.breakfast.length : 0;
        } else if (meals[meal] && foodSelections[meal].type && foodSelections[meal].package) {
            const type = foodSelections[meal].type;
            const packageData = foodMenuData[type]?.[foodSelections[meal].package];
            return packageData ? packageData.price * guestCount * mealDates[meal].length : 0;
        }
        return 0;
    };

    // Calculate food cost based on selections
    const calculateFoodCost = useMemo(() => {
        let totalFoodCost = 0;

        // Calculate breakfast cost
        if (meals.breakfast && foodSelections.breakfast.package) {
            const breakfastPackage = foodMenuData.breakfast[foodSelections.breakfast.package];
            if (breakfastPackage) {
                totalFoodCost += breakfastPackage.price * guestCount * mealDates.breakfast.length;
            }
        }

        // Calculate lunch cost
        if (meals.lunch && foodSelections.lunch.type && foodSelections.lunch.package) {
            const lunchType = foodSelections.lunch.type;
            const lunchPackage = foodMenuData[lunchType]?.[foodSelections.lunch.package];
            if (lunchPackage) {
                totalFoodCost += lunchPackage.price * guestCount * mealDates.lunch.length;
            }
        }

        // Calculate dinner cost
        if (meals.dinner && foodSelections.dinner.type && foodSelections.dinner.package) {
            const dinnerType = foodSelections.dinner.type;
            const dinnerPackage = foodMenuData[dinnerType]?.[foodSelections.dinner.package];
            if (dinnerPackage) {
                totalFoodCost += dinnerPackage.price * guestCount * mealDates.dinner.length;
            }
        }

        return totalFoodCost;
    }, [meals, foodSelections, guestCount, mealDates]);

    // Validate selections and check if required items are selected
    const validateSelections = () => {
        const newValidationErrors = {
            breakfast: false,
            lunch: false,
            dinner: false
        };

        if (meals.breakfast && foodSelections.breakfast.package) {
            const requiredItems = selectionLimits.breakfast.items;
            newValidationErrors.breakfast = selectedFoodItems.breakfast.items.length < requiredItems;
        }

        if (meals.lunch && foodSelections.lunch.type && foodSelections.lunch.package) {
            const startersRequired = selectionLimits.lunch.starters;
            const mainRequired = selectionLimits.lunch.mainCourse;
            const dessertsRequired = selectionLimits.lunch.desserts;

            newValidationErrors.lunch = (
                selectedFoodItems.lunch.starters.length < startersRequired ||
                selectedFoodItems.lunch.mainCourse.length < mainRequired ||
                selectedFoodItems.lunch.desserts.length < dessertsRequired
            );
        }

        if (meals.dinner && foodSelections.dinner.type && foodSelections.dinner.package) {
            const startersRequired = selectionLimits.dinner.starters;
            const mainRequired = selectionLimits.dinner.mainCourse;
            const dessertsRequired = selectionLimits.dinner.desserts;

            newValidationErrors.dinner = (
                selectedFoodItems.dinner.starters.length < startersRequired ||
                selectedFoodItems.dinner.mainCourse.length < mainRequired ||
                selectedFoodItems.dinner.desserts.length < dessertsRequired
            );
        }

        setValidationErrors(newValidationErrors);

        return !Object.values(newValidationErrors).some(error => error);
    };

    // Calculate food cost based on selections and update parent
    useEffect(() => {
        const mealCosts = {
            breakfast: calculateMealCost('breakfast'),
            lunch: calculateMealCost('lunch'),
            dinner: calculateMealCost('dinner')
        };

        onFoodCostUpdate(calculateFoodCost, mealCosts, mealDates);
        validateSelections();
    }, [meals, foodSelections, selectedFoodItems, guestCount, calculateFoodCost, mealDates]);

    // Handle meal selection change
    const handleMealChange = (meal: 'breakfast' | 'lunch' | 'dinner', checked: boolean) => {
        setMeals(prev => ({
            ...prev,
            [meal]: checked
        }));

        // Reset meal selections if unchecked
        if (!checked) {
            if (meal === 'breakfast') {
                setFoodSelections(prev => ({
                    ...prev,
                    breakfast: { package: "" }
                }));
                setSelectedFoodItems(prev => ({
                    ...prev,
                    breakfast: { items: [] }
                }));
                setMealDates(prev => ({
                    ...prev,
                    breakfast: []
                }));
            } else {
                setFoodSelections(prev => ({
                    ...prev,
                    [meal]: { type: "", package: "" }
                }));
                setSelectedFoodItems(prev => ({
                    ...prev,
                    [meal]: { starters: [], mainCourse: [], desserts: [] }
                }));
                setMealDates(prev => ({
                    ...prev,
                    [meal]: []
                }));
            }
        }
    };

    // Handle food type change for lunch and dinner
    const handleFoodTypeChange = (meal: 'lunch' | 'dinner', type: string) => {
        setFoodSelections(prev => ({
            ...prev,
            [meal]: { ...prev[meal], type, package: "" }
        }));

        // Reset food item selections
        setSelectedFoodItems(prev => ({
            ...prev,
            [meal]: { starters: [], mainCourse: [], desserts: [] }
        }));
    };

    // Handle package selection for any meal
    const handlePackageSelect = (meal: 'breakfast' | 'lunch' | 'dinner', packageType: string) => {
        setFoodSelections(prev => ({
            ...prev,
            [meal]: { ...prev[meal], package: packageType }
        }));

        // Reset food selections
        if (meal === 'breakfast') {
            setSelectedFoodItems(prev => ({
                ...prev,
                breakfast: { items: [] }
            }));
        } else {
            setSelectedFoodItems(prev => ({
                ...prev,
                [meal]: { starters: [], mainCourse: [], desserts: [] }
            }));
        }

        // Update selection limits based on package
        if (packageType === 'silver') {
            setSelectionLimits(prev => ({
                ...prev,
                [meal]: meal === 'breakfast' ? { items: 2 } : { starters: 2, mainCourse: 1, desserts: 1 }
            }));
        } else if (packageType === 'gold') {
            setSelectionLimits(prev => ({
                ...prev,
                [meal]: meal === 'breakfast' ? { items: 3 } : { starters: 3, mainCourse: 2, desserts: 2 }
            }));
        } else if (packageType === 'diamond') {
            setSelectionLimits(prev => ({
                ...prev,
                [meal]: meal === 'breakfast' ? { items: 4 } : { starters: 4, mainCourse: 3, desserts: 3 }
            }));
        }
    };

    // Handle food item selection
    const handleFoodItemSelection = (meal: 'breakfast' | 'lunch' | 'dinner', category: string, itemId: string) => {
        if (meal === 'breakfast') {
            setSelectedFoodItems(prevState => {
                const updatedItems = { ...prevState };

                // If item is already selected, remove it
                if (updatedItems[meal].items.includes(itemId)) {
                    updatedItems[meal].items = updatedItems[meal].items.filter(id => id !== itemId);
                }
                // If not selected and under the limit, add it
                else if (updatedItems[meal].items.length < selectionLimits[meal].items) {
                    updatedItems[meal].items = [...updatedItems[meal].items, itemId];
                }

                return updatedItems;
            });
        } else {
            setSelectedFoodItems(prevState => {
                const updatedItems = { ...prevState };
                const typedCategory = category as 'starters' | 'mainCourse' | 'desserts';

                // If item is already selected, remove it
                if (updatedItems[meal][typedCategory].includes(itemId)) {
                    updatedItems[meal][typedCategory] = updatedItems[meal][typedCategory].filter(id => id !== itemId);
                }
                // If not selected and under the limit, add it
                else if (updatedItems[meal][typedCategory].length < selectionLimits[meal][typedCategory]) {
                    updatedItems[meal][typedCategory] = [...updatedItems[meal][typedCategory], itemId];
                }

                return updatedItems;
            });
        }
    };

    // Get package data based on current selections for a meal
    const getPackageData = (meal: 'breakfast' | 'lunch' | 'dinner'): PackageDataType | null => {
        if (meal === 'breakfast') {
            if (!foodSelections.breakfast.package) return null;
            return foodMenuData.breakfast[foodSelections.breakfast.package];
        } else {
            if (!foodSelections[meal].type || !foodSelections[meal].package) return null;
            const type = foodSelections[meal].type;
            return foodMenuData[type]?.[foodSelections[meal].package] || null;
        }
    };

    // Progress indicator component
    const ProgressIndicator = ({ step, title }: { step: number, title: string }) => (
        <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mr-3 shadow-md">
                {step}
            </div>
            <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        </div>
    );

    // Create a food item card for selection
    const FoodItemCard = ({
        meal,
        category,
        item
    }: {
        meal: 'breakfast' | 'lunch' | 'dinner',
        category: string,
        item: { id: string, name: string, description: string }
    }) => {
        const isSelected = meal === 'breakfast'
            ? selectedFoodItems[meal].items.includes(item.id)
            : selectedFoodItems[meal][category as 'starters' | 'mainCourse' | 'desserts'].includes(item.id);

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${isSelected
                        ? 'bg-amber-50 border-amber-400 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                onClick={() => handleFoodItemSelection(meal, category, item.id)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{item.name}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-amber-500" />}
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
            </div>
        );
    };

    // Package card component
    const PackageCard = ({
        meal,
        packageKey,
        packageData
    }: {
        meal: 'breakfast' | 'lunch' | 'dinner',
        packageKey: string,
        packageData: PackageDataType
    }) => {
        const isSelected = foodSelections[meal].package === packageKey;
        const colorMap = {
            breakfast: {
                bg: 'bg-orange-100',
                border: 'border-orange-300',
                hover: 'hover:border-orange-200',
                text: 'text-orange-600',
                check: 'text-orange-500'
            },
            lunch: {
                bg: 'bg-green-100',
                border: 'border-green-300',
                hover: 'hover:border-green-200',
                text: 'text-green-600',
                check: 'text-green-500'
            },
            dinner: {
                bg: 'bg-indigo-100',
                border: 'border-indigo-300',
                hover: 'hover:border-indigo-200',
                text: 'text-indigo-600',
                check: 'text-indigo-500'
            }
        };

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all shadow-sm hover:shadow-md ${isSelected
                        ? `${colorMap[meal].bg} ${colorMap[meal].border}`
                        : `border-gray-200 ${colorMap[meal].hover}`
                    }`}
                onClick={() => handlePackageSelect(meal, packageKey)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{packageData.name}</h6>
                    {isSelected && <CheckCircle2 className={`h-5 w-5 ${colorMap[meal].check}`} />}
                </div>
                <p className="text-sm text-gray-600 mb-2">{packageData.description}</p>
                <p className={`text-sm font-medium ${colorMap[meal].text}`}>₹{packageData.price.toLocaleString()} per person</p>
            </div>
        );
    };

    // Meal card component
    const MealCard = ({
        meal,
        title,
        time,
        description,
        colorClass,
        imageUrl
    }: {
        meal: 'breakfast' | 'lunch' | 'dinner',
        title: string,
        time: string,
        description: string,
        colorClass: string,
        imageUrl: string
    }) => {
        const isSelected = meals[meal];

        return (
            <Card
                className={`cursor-pointer transition-all border-2 hover:shadow-lg ${isSelected
                        ? `border-${colorClass}-500 bg-${colorClass}-50`
                        : 'border-transparent hover:border-gray-200'
                    }`}
                onClick={() => handleMealChange(meal, !isSelected)}
            >
                <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                        <span className="text-gray-800">{title}</span>
                        {isSelected && <CheckCircle2 className={`h-5 w-5 text-${colorClass}-500`} />}
                    </CardTitle>
                    <CardDescription className="flex items-center text-gray-600">
                        <Clock className="h-3 w-3 mr-1" /> Served at {time}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative h-56 mb-3 rounded-lg overflow-hidden shadow-md">
                        <img
                            src={imageUrl}
                            alt={`${title} food`}
                            className="absolute inset-0 w-full h-full object-fill"
                        />
                    </div>
                    <p className="text-sm text-gray-600">{description}</p>
                </CardContent>
                <CardFooter className={`pt-0 ${isSelected ? `text-${colorClass}-700` : 'text-gray-500'}`}>
                    <p className="text-xs font-medium">{isSelected ? 'Selected' : 'Click to select'}</p>
                </CardFooter>
            </Card>
        );
    };

    // Selection indicator component
    const SelectionIndicator = ({
        meal,
        category,
        selected,
        limit,
        colorClass
    }: {
        meal: 'breakfast' | 'lunch' | 'dinner',
        category: string,
        selected: number,
        limit: number,
        colorClass: string
    }) => (
        <Badge variant="outline" className={`bg-${colorClass}-100 text-${colorClass}-700 border-${colorClass}-300`}>
            {selected} / {limit} selected
        </Badge>
    );

    // Date selection component for meals
    const DateSelection = ({ meal }: { meal: 'breakfast' | 'lunch' | 'dinner' }) => {
        const colorClass = getMealColorClass(meal);
        const selectedDates = mealDates[meal];
        
        return (
            <div className="mb-6">
                <h6 className="text-md font-medium text-gray-700 mb-3">Select Dates for {meal.charAt(0).toUpperCase() + meal.slice(1)}:</h6>
                <div className="flex flex-wrap gap-2">
                    {dateRange.map((date) => {
                        const isSelected = selectedDates.some(d => isSameDay(d, date));
                        return (
                            <button
                                key={date.toString()}
                                onClick={() => handleMealDateChange(meal, date)}
                                className={`px-3 py-1 rounded-md text-sm border transition-all ${
                                    isSelected
                                        ? `bg-${colorClass}-600 text-white border-${colorClass}-600`
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {format(date, "MMM d")}
                            </button>
                        );
                    })}
                </div>
                {selectedDates.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                        Selected {selectedDates.length} day{selectedDates.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>
        );
    };

    // Get meal section color class
    const getMealColorClass = (meal: 'breakfast' | 'lunch' | 'dinner'): string => {
        switch (meal) {
            case 'breakfast': return 'orange';
            case 'lunch': return 'green';
            case 'dinner': return 'indigo';
            default: return 'gray';
        }
    };

    // Get placeholder image URLs
    const getImageUrl = (meal: 'breakfast' | 'lunch' | 'dinner'): string => {
        switch (meal) {
            case 'breakfast': return "https://marketplace.canva.com/EAE_1-A5zRM/1/0/1131w/canva-blue-modern-breakfast-time-%28flyer%29-pT84tGJjIfI.jpg";
            case 'lunch': return "https://www.shutterstock.com/shutterstock/photos/792090760/display_1500/stock-vector-food-poster-print-lettering-lunch-time-lettering-kitchen-cafe-restaurant-decoration-cutting-792090760.jpg";
            case 'dinner': return "https://marketplace.canva.com/EAGeY-c0bc4/1/0/1280w/canva-white-simple-dinner-night-instagram-post-4VyT5w-g6sM.jpg";
            default: return "https://marketplace.canva.com/EAE_1-A5zRM/1/0/1131w/canva-blue-modern-breakfast-time-%28flyer%29-pT84tGJjIfI.jpg";
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
            <h3 className="font-serif text-3xl mb-8 text-gray-800 border-b pb-4">Food Service</h3>

            {/* Step 1: Choose Meals */}
            <div className="mb-12">
                <ProgressIndicator step={1} title="Select Meals" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Breakfast Option */}
                    <MealCard
                        meal="breakfast"
                        title="Breakfast"
                        time="8:30 AM"
                        description="Traditional South & North Indian breakfast options"
                        colorClass="orange"
                        imageUrl={getImageUrl('breakfast')}
                    />

                    {/* Lunch Option */}
                    <MealCard
                        meal="lunch"
                        title="Lunch"
                        time="1:00 PM"
                        description="Delicious vegetarian & non-vegetarian lunch options"
                        colorClass="green"
                        imageUrl={getImageUrl('lunch')}
                    />

                    {/* Dinner Option */}
                    <MealCard
                        meal="dinner"
                        title="Dinner"
                        time="8:00 PM"
                        description="Elegant dining with premium cuisine options"
                        colorClass="indigo"
                        imageUrl={getImageUrl('dinner')}
                    />
                </div>
            </div>

            {/* Step 2: Configure Meals */}
            <div className="mb-12">
                <ProgressIndicator step={2} title="Configure Your Meals" />

                {/* Breakfast Configuration */}
                {meals.breakfast && (
                    <div className="mb-10 p-6 border border-orange-200 rounded-lg bg-orange-50 shadow-sm">
                        <h5 className="text-xl font-medium text-orange-700 mb-6 border-b border-orange-200 pb-2">Breakfast Options</h5>

                        {/* Date Selection */}
                        <DateSelection meal="breakfast" />

                        {/* Package Selection */}
                        <div className="mb-6">
                            <h6 className="text-md font-medium text-gray-700 mb-3">Select Package:</h6>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.keys(foodMenuData.breakfast).map((pkg) => (
                                    <PackageCard
                                        key={pkg}
                                        meal="breakfast"
                                        packageKey={pkg}
                                        packageData={foodMenuData.breakfast[pkg]}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Menu Selection */}
                        {foodSelections.breakfast.package && mealDates.breakfast.length > 0 && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h6 className="text-md font-medium text-gray-700">Select Menu Items (choose {selectionLimits.breakfast.items}):</h6>
                                    <SelectionIndicator
                                        meal="breakfast"
                                        category="items"
                                        selected={selectedFoodItems.breakfast.items.length}
                                        limit={selectionLimits.breakfast.items}
                                        colorClass="orange"
                                    />
                                </div>

                                {validationErrors.breakfast && (
                                    <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please select {selectionLimits.breakfast.items} breakfast items.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {foodMenuData.breakfast[foodSelections.breakfast.package].items.map((item) => (
                                        <FoodItemCard key={item.id} meal="breakfast" category="items" item={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Lunch Configuration */}
                {meals.lunch && (
                    <div className="mb-10 p-6 border border-green-200 rounded-lg bg-green-50 shadow-sm">
                        <h5 className="text-xl font-medium text-green-700 mb-6 border-b border-green-200 pb-2">Lunch Options</h5>

                        {/* Date Selection */}
                        <DateSelection meal="lunch" />

                        {/* Cuisine Type Selection */}
                        <div className="mb-6">
                            <h6 className="text-md font-medium text-gray-700 mb-3">Select Cuisine Type:</h6>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className={`px-6 py-3 rounded-md transition-all shadow-sm ${foodSelections.lunch.type === 'vegetarian'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50'
                                        }`}
                                    onClick={() => handleFoodTypeChange('lunch', 'vegetarian')}
                                >
                                    Vegetarian
                                </button>
                                <button
                                    className={`px-6 py-3 rounded-md transition-all shadow-sm ${foodSelections.lunch.type === 'nonVegetarian'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50'
                                        }`}
                                    onClick={() => handleFoodTypeChange('lunch', 'nonVegetarian')}
                                >
                                    Non-Vegetarian
                                </button>
                            </div>
                        </div>

                        {/* Package Selection */}
                        {foodSelections.lunch.type && (
                            <div className="mb-6">
                                <h6 className="text-md font-medium text-gray-700 mb-3">Select Package:</h6>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.keys(foodMenuData[foodSelections.lunch.type]).map((pkg) => (
                                        <PackageCard
                                            key={pkg}
                                            meal="lunch"
                                            packageKey={pkg}
                                            packageData={foodMenuData[foodSelections.lunch.type][pkg]}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Menu Selection */}
                        {foodSelections.lunch.type && foodSelections.lunch.package && mealDates.lunch.length > 0 && (
                            <div>
                                {validationErrors.lunch && (
                                    <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please complete your selection of starters, main course, and desserts.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Tabs defaultValue="starters" className="mt-6">
                                    <TabsList className="mb-4 bg-green-100">
                                        <TabsTrigger value="starters" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Starters</TabsTrigger>
                                        <TabsTrigger value="mainCourse" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Main Course</TabsTrigger>
                                        <TabsTrigger value="desserts" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Desserts</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="starters">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Starters (choose {selectionLimits.lunch.starters}):</h6>
                                            <SelectionIndicator
                                                meal="lunch"
                                                category="starters"
                                                selected={selectedFoodItems.lunch.starters.length}
                                                limit={selectionLimits.lunch.starters}
                                                colorClass="green"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.lunch.type][foodSelections.lunch.package].starters.map((item) => (
                                                <FoodItemCard key={item.id} meal="lunch" category="starters" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="mainCourse">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Main Course (choose {selectionLimits.lunch.mainCourse}):</h6>
                                            <SelectionIndicator
                                                meal="lunch"
                                                category="mainCourse"
                                                selected={selectedFoodItems.lunch.mainCourse.length}
                                                limit={selectionLimits.lunch.mainCourse}
                                                colorClass="green"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.lunch.type][foodSelections.lunch.package].mainCourse.map((item) => (
                                                <FoodItemCard key={item.id} meal="lunch" category="mainCourse" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="desserts">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Desserts (choose {selectionLimits.lunch.desserts}):</h6>
                                            <SelectionIndicator
                                                meal="lunch"
                                                category="desserts"
                                                selected={selectedFoodItems.lunch.desserts.length}
                                                limit={selectionLimits.lunch.desserts}
                                                colorClass="green"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.lunch.type][foodSelections.lunch.package].desserts.map((item) => (
                                                <FoodItemCard key={item.id} meal="lunch" category="desserts" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                )}

                {/* Dinner Configuration */}
                {meals.dinner && (
                    <div className="mb-10 p-6 border border-indigo-200 rounded-lg bg-indigo-50 shadow-sm">
                        <h5 className="text-xl font-medium text-indigo-700 mb-6 border-b border-indigo-200 pb-2">Dinner Options</h5>

                        {/* Date Selection */}
                        <DateSelection meal="dinner" />

                        {/* Cuisine Type Selection */}
                        <div className="mb-6">
                            <h6 className="text-md font-medium text-gray-700 mb-3">Select Cuisine Type:</h6>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className={`px-6 py-3 rounded-md transition-all shadow-sm ${foodSelections.dinner.type === 'vegetarian'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-indigo-50'
                                        }`}
                                    onClick={() => handleFoodTypeChange('dinner', 'vegetarian')}
                                >
                                    Vegetarian
                                </button>
                                <button
                                    className={`px-6 py-3 rounded-md transition-all shadow-sm ${foodSelections.dinner.type === 'nonVegetarian'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-indigo-50'
                                        }`}
                                    onClick={() => handleFoodTypeChange('dinner', 'nonVegetarian')}
                                >
                                    Non-Vegetarian
                                </button>
                            </div>
                        </div>

                        {/* Package Selection */}
                        {foodSelections.dinner.type && (
                            <div className="mb-6">
                                <h6 className="text-md font-medium text-gray-700 mb-3">Select Package:</h6>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.keys(foodMenuData[foodSelections.dinner.type]).map((pkg) => (
                                        <PackageCard
                                            key={pkg}
                                            meal="dinner"
                                            packageKey={pkg}
                                            packageData={foodMenuData[foodSelections.dinner.type][pkg]}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Menu Selection */}
                        {foodSelections.dinner.type && foodSelections.dinner.package && mealDates.dinner.length > 0 && (
                            <div>
                                {validationErrors.dinner && (
                                    <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please complete your selection of starters, main course, and desserts.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Tabs defaultValue="starters" className="mt-6">
                                    <TabsList className="mb-4 bg-indigo-100">
                                        <TabsTrigger value="starters" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Starters</TabsTrigger>
                                        <TabsTrigger value="mainCourse" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Main Course</TabsTrigger>
                                        <TabsTrigger value="desserts" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Desserts</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="starters">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Starters (choose {selectionLimits.dinner.starters}):</h6>
                                            <SelectionIndicator
                                                meal="dinner"
                                                category="starters"
                                                selected={selectedFoodItems.dinner.starters.length}
                                                limit={selectionLimits.dinner.starters}
                                                colorClass="indigo"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.dinner.type][foodSelections.dinner.package].starters.map((item) => (
                                                <FoodItemCard key={item.id} meal="dinner" category="starters" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="mainCourse">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Main Course (choose {selectionLimits.dinner.mainCourse}):</h6>
                                            <SelectionIndicator
                                                meal="dinner"
                                                category="mainCourse"
                                                selected={selectedFoodItems.dinner.mainCourse.length}
                                                limit={selectionLimits.dinner.mainCourse}
                                                colorClass="indigo"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.dinner.type][foodSelections.dinner.package].mainCourse.map((item) => (
                                                <FoodItemCard key={item.id} meal="dinner" category="mainCourse" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="desserts">
                                        <div className="flex justify-between items-center mb-4">
                                            <h6 className="text-md font-medium text-gray-700">Select Desserts (choose {selectionLimits.dinner.desserts}):</h6>
                                            <SelectionIndicator
                                                meal="dinner"
                                                category="desserts"
                                                selected={selectedFoodItems.dinner.desserts.length}
                                                limit={selectionLimits.dinner.desserts}
                                                colorClass="indigo"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foodMenuData[foodSelections.dinner.type][foodSelections.dinner.package].desserts.map((item) => (
                                                <FoodItemCard key={item.id} meal="dinner" category="desserts" item={item} />
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Summary Section */}
            <div className="mt-10">
                <ProgressIndicator step={3} title="Food Selection Summary" />

                {/* Render only if at least one meal is selected */}
                {(meals.breakfast || meals.lunch || meals.dinner) ? (
                    <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
                        <h5 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b">Your Food Selections</h5>

                        {/* Show total cost */}
                        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-6">
                            <span className="text-gray-700 font-medium">Total Food Service Cost:</span>
                            <span className="text-xl font-bold text-amber-600">₹{calculateFoodCost.toLocaleString()}</span>
                        </div>

                        {/* Breakfast Summary */}
                        {meals.breakfast && (
                            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <h6 className="font-medium text-gray-800">Breakfast</h6>
                                    <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                        ₹{calculateMealCost('breakfast').toLocaleString()}
                                    </Badge>
                                </div>

                                {foodSelections.breakfast.package ? (
                                    <>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Package:</span> {getPackageData('breakfast')?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Dates:</span> {mealDates.breakfast.length > 0 
                                                ? mealDates.breakfast.map(date => format(date, "MMM d")).join(", ")
                                                : "No dates selected"}
                                        </p>

                                        {selectedFoodItems.breakfast.items.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Items:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.breakfast.items.map(itemId => {
                                                        const item = getPackageData('breakfast')?.items?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-sm italic text-gray-500">No package selected</p>
                                )}
                            </div>
                        )}

                        {/* Lunch Summary */}
                        {meals.lunch && (
                            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <h6 className="font-medium text-gray-800">Lunch</h6>
                                    <Badge className="bg-green-100 text-green-700 border-green-300">
                                        ₹{calculateMealCost('lunch').toLocaleString()}
                                    </Badge>
                                </div>

                                {foodSelections.lunch.type && foodSelections.lunch.package ? (
                                    <>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Type:</span> {foodSelections.lunch.type === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Package:</span> {getPackageData('lunch')?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Dates:</span> {mealDates.lunch.length > 0 
                                                ? mealDates.lunch.map(date => format(date, "MMM d")).join(", ")
                                                : "No dates selected"}
                                        </p>

                                        {/* Starters */}
                                        {selectedFoodItems.lunch.starters.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Starters:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.lunch.starters.map(itemId => {
                                                        const item = getPackageData('lunch')?.starters?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Main Course */}
                                        {selectedFoodItems.lunch.mainCourse.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Main Course:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.lunch.mainCourse.map(itemId => {
                                                        const item = getPackageData('lunch')?.mainCourse?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Desserts */}
                                        {selectedFoodItems.lunch.desserts.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Desserts:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.lunch.desserts.map(itemId => {
                                                        const item = getPackageData('lunch')?.desserts?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-sm italic text-gray-500">Configuration incomplete</p>
                                )}
                            </div>
                        )}

                        {/* Dinner Summary */}
                        {meals.dinner && (
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <h6 className="font-medium text-gray-800">Dinner</h6>
                                    <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300">
                                        ₹{calculateMealCost('dinner').toLocaleString()}
                                    </Badge>
                                </div>

                                {foodSelections.dinner.type && foodSelections.dinner.package ? (
                                    <>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Type:</span> {foodSelections.dinner.type === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Package:</span> {getPackageData('dinner')?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Dates:</span> {mealDates.dinner.length > 0 
                                                ? mealDates.dinner.map(date => format(date, "MMM d")).join(", ")
                                                : "No dates selected"}
                                        </p>

                                        {/* Starters */}
                                        {selectedFoodItems.dinner.starters.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Starters:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.dinner.starters.map(itemId => {
                                                        const item = getPackageData('dinner')?.starters?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Main Course */}
                                        {selectedFoodItems.dinner.mainCourse.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Main Course:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.dinner.mainCourse.map(itemId => {
                                                        const item = getPackageData('dinner')?.mainCourse?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Desserts */}
                                        {selectedFoodItems.dinner.desserts.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Selected Desserts:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFoodItems.dinner.desserts.map(itemId => {
                                                        const item = getPackageData('dinner')?.desserts?.find(i => i.id === itemId);
                                                        return item ? (
                                                            <Badge key={itemId} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                                                {item.name}
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-sm italic text-gray-500">Configuration incomplete</p>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600">No meals selected yet. Please select at least one meal to continue.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodService;