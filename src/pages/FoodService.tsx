import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

interface FoodServiceProps {
    guestCount: number;
    onFoodCostUpdate: (total: number, mealCosts: { breakfast: number, lunch: number, dinner: number }) => void;
}

const FoodService: React.FC<FoodServiceProps> = ({ guestCount, onFoodCostUpdate }) => {
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

    // Calculate meal costs
    const calculateMealCost = (meal: 'breakfast' | 'lunch' | 'dinner'): number => {
        if (meal === 'breakfast' && meals.breakfast && foodSelections.breakfast.package) {
            const packageData = foodMenuData.breakfast[foodSelections.breakfast.package];
            return packageData ? packageData.price * guestCount : 0;
        } else if (meals[meal] && foodSelections[meal].type && foodSelections[meal].package) {
            const type = foodSelections[meal].type;
            const packageData = foodMenuData[type]?.[foodSelections[meal].package];
            return packageData ? packageData.price * guestCount : 0;
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
                totalFoodCost += breakfastPackage.price * guestCount;
            }
        }

        // Calculate lunch cost
        if (meals.lunch && foodSelections.lunch.type && foodSelections.lunch.package) {
            const lunchType = foodSelections.lunch.type;
            const lunchPackage = foodMenuData[lunchType]?.[foodSelections.lunch.package];
            if (lunchPackage) {
                totalFoodCost += lunchPackage.price * guestCount;
            }
        }

        // Calculate dinner cost
        if (meals.dinner && foodSelections.dinner.type && foodSelections.dinner.package) {
            const dinnerType = foodSelections.dinner.type;
            const dinnerPackage = foodMenuData[dinnerType]?.[foodSelections.dinner.package];
            if (dinnerPackage) {
                totalFoodCost += dinnerPackage.price * guestCount;
            }
        }

        return totalFoodCost;
    }, [meals, foodSelections, guestCount]);

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

        onFoodCostUpdate(calculateFoodCost, mealCosts);
        validateSelections();
    }, [meals, foodSelections, selectedFoodItems, guestCount, calculateFoodCost]);

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
            } else {
                setFoodSelections(prev => ({
                    ...prev,
                    [meal]: { type: "", package: "" }
                }));
                setSelectedFoodItems(prev => ({
                    ...prev,
                    [meal]: { starters: [], mainCourse: [], desserts: [] }
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
            case 'lunch': return "data:image/jpeg;base64,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";
            case 'dinner': return "https://marketplace.canva.com/EAGeY-c0bc4/1/0/1280w/canva-white-simple-dinner-night-instagram-post-4VyT5w-g6sM.jpg";
            default: return "data:image/jpeg;base64,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";
        }
    };

    return (
        <div className="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-md">
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
                        {foodSelections.breakfast.package && (
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
                        {foodSelections.lunch.type && foodSelections.lunch.package && (
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
                        {foodSelections.dinner.type && foodSelections.dinner.package && (
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
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Package:</span> {getPackageData('breakfast')?.name}
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
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Package:</span> {getPackageData('lunch')?.name}
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
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Package:</span> {getPackageData('dinner')?.name}
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