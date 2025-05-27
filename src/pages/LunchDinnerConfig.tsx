import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert";
import { foodMenuData } from './foodData.js';

interface LunchDinnerConfigProps {
    mealType: 'lunch' | 'dinner';
    date: Date;
    config: any;
    updateConfig: (config: any) => void;
    guestCount: number;
}

const LunchDinnerConfig: React.FC<LunchDinnerConfigProps> = ({
    mealType = 'lunch', // Default value
    date,
    config = {}, // Default value
    updateConfig,
    guestCount = 1 // Default value
}) => {
    const [selectedCuisine, setSelectedCuisine] = useState(config.cuisine || "");
    const [selectedPackage, setSelectedPackage] = useState(config.package || "");
    const [selectedItems, setSelectedItems] = useState({
        starters: config.items?.starters || [],
        mainCourse: config.items?.mainCourse || [],
        desserts: config.items?.desserts || []
    });
    const [validationError, setValidationError] = useState(false);

    // Selection limits based on package for each category
    const getSelectionLimits = (packageType: string) => {
        switch (packageType) {
            case 'silver': return { starters: 2, mainCourse: 2, desserts: 1 };
            case 'gold': return { starters: 3, mainCourse: 3, desserts: 2 };
            case 'diamond': return { starters: 4, mainCourse: 4, desserts: 3 };
            default: return { starters: 2, mainCourse: 2, desserts: 1 };
        }
    };

    const selectionLimits = getSelectionLimits(selectedPackage);

    // Update parent config when local state changes
    useEffect(() => {
        if (updateConfig) {
            updateConfig({
                cuisine: selectedCuisine,
                package: selectedPackage,
                items: selectedItems
            });
        }

        // Validate selection
        if (selectedPackage && selectedCuisine) {
            const hasValidStarters = selectedItems.starters.length >= Math.min(selectionLimits.starters, getAvailableItems('starters')?.length || 0);
            const hasValidMain = selectedItems.mainCourse.length >= Math.min(selectionLimits.mainCourse, getAvailableItems('mainCourse')?.length || 0);
            const hasValidDesserts = selectedItems.desserts.length >= Math.min(selectionLimits.desserts, getAvailableItems('desserts')?.length || 0);
            
            setValidationError(!(hasValidStarters && hasValidMain && hasValidDesserts));
        } else {
            setValidationError(false);
        }
    }, [selectedCuisine, selectedPackage, selectedItems, selectionLimits, updateConfig]);

    // Get available items for a category
    const getAvailableItems = (category: string) => {
        if (!selectedCuisine || !selectedPackage || !foodMenuData) return [];
        return foodMenuData[selectedCuisine]?.[selectedPackage]?.[category] || [];
    };

    // Handle cuisine selection
    const handleCuisineSelect = (cuisine: string) => {
        setSelectedCuisine(cuisine);
        setSelectedPackage(""); // Reset package when cuisine changes
        setSelectedItems({ starters: [], mainCourse: [], desserts: [] }); // Reset items
    };

    // Handle package selection
    const handlePackageSelect = (packageKey: string) => {
        setSelectedPackage(packageKey);
        setSelectedItems({ starters: [], mainCourse: [], desserts: [] }); // Reset items when package changes
    };

    // Handle item selection
    const handleItemSelection = (category: string, itemId: string) => {
        setSelectedItems(prev => {
            const currentItems = prev[category] || [];
            const limit = selectionLimits[category];
            
            if (currentItems.includes(itemId)) {
                // Remove if already selected
                return {
                    ...prev,
                    [category]: currentItems.filter(id => id !== itemId)
                };
            } else if (currentItems.length < limit) {
                // Add if under limit
                return {
                    ...prev,
                    [category]: [...currentItems, itemId]
                };
            }
            return prev;
        });
    };

    // Cuisine card component
    const CuisineCard = ({ cuisineKey }: { cuisineKey: string }) => {
        const isSelected = selectedCuisine === cuisineKey;
        const displayName = cuisineKey === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian';

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all shadow-sm hover:shadow-md ${isSelected
                        ? 'bg-blue-100 border-blue-300'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                onClick={() => handleCuisineSelect(cuisineKey)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{displayName}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-500" />}
                </div>
                <p className="text-sm text-gray-600">
                    {cuisineKey === 'vegetarian' ? 'Pure vegetarian cuisine options' : 'Delicious meat and seafood options'}
                </p>
            </div>
        );
    };

    // Package card component
    const PackageCard = ({ packageKey, packageData }: { packageKey: string, packageData: any }) => {
        const isSelected = selectedPackage === packageKey;

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all shadow-sm hover:shadow-md ${isSelected
                        ? 'bg-green-100 border-green-300'
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                onClick={() => handlePackageSelect(packageKey)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{packageData?.name || 'Package'}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600 mb-2">{packageData?.description || ''}</p>
                <p className="text-sm font-medium text-green-600">₹{(packageData?.price || 0).toLocaleString()} per person</p>
            </div>
        );
    };

    // Food item card component
    const FoodItemCard = ({ item, category }: { item: any, category: string }) => {
        const isSelected = selectedItems[category]?.includes(item?.id) || false;

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${isSelected
                        ? 'bg-purple-50 border-purple-400 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                onClick={() => handleItemSelection(category, item?.id)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{item?.name || 'Item'}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-purple-500" />}
                </div>
                <p className="text-xs text-gray-600">{item?.description || ''}</p>
            </div>
        );
    };

    // Category section component
    const CategorySection = ({ category, title }: { category: string, title: string }) => {
        const items = getAvailableItems(category);
        const selectedCount = selectedItems[category]?.length || 0;
        const limit = selectionLimits[category];

        if (items.length === 0) return null;

        return (
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h6 className="text-md font-medium text-gray-700">{title}:</h6>
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                        {selectedCount} / {Math.min(limit, items.length)} selected
                    </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item: any) => (
                        <FoodItemCard key={item?.id || Math.random()} item={item} category={category} />
                    ))}
                </div>
            </div>
        );
    };

    // Safe string capitalization helper
    const capitalizeString = (str: string) => {
        if (!str || typeof str !== 'string') return 'Meal';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="space-y-6 p-6 border border-blue-200 rounded-lg bg-blue-50">
            <h5 className="text-xl font-medium text-blue-700 border-b border-blue-200 pb-2">
                {capitalizeString(mealType)} Configuration
            </h5>

            {/* Cuisine Selection */}
            <div>
                <h6 className="text-md font-medium text-gray-700 mb-3">Select Cuisine Type:</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['vegetarian', 'nonVegetarian'].map((cuisineKey) => (
                        <CuisineCard key={cuisineKey} cuisineKey={cuisineKey} />
                    ))}
                </div>
            </div>

            {/* Package Selection */}
            {selectedCuisine && foodMenuData && foodMenuData[selectedCuisine] && (
                <div>
                    <h6 className="text-md font-medium text-gray-700 mb-3">Select Package:</h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(foodMenuData[selectedCuisine]).map(([packageKey, packageData]) => (
                            <PackageCard
                                key={packageKey}
                                packageKey={packageKey}
                                packageData={packageData}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Menu Selection */}
            {selectedPackage && selectedCuisine && foodMenuData && foodMenuData[selectedCuisine] && foodMenuData[selectedCuisine][selectedPackage] && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h6 className="text-md font-medium text-gray-700">Select Menu Items:</h6>
                    </div>

                    {validationError && (
                        <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Please complete your selections for all categories.
                            </AlertDescription>
                        </Alert>
                    )}

                    <CategorySection category="starters" title="Starters" />
                    <CategorySection category="mainCourse" title="Main Course" />
                    <CategorySection category="desserts" title="Desserts" />

                    {/* Cost Display */}
                    <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Cost for this day:</span>
                            <span className="font-bold text-blue-600">
                                ₹{((foodMenuData[selectedCuisine]?.[selectedPackage]?.price || 0) * guestCount).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LunchDinnerConfig;