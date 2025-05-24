import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert";
import { foodMenuData } from './foodData.js';

interface BreakfastConfigProps {
    date: Date;
    config: any;
    updateConfig: (config: any) => void;
    guestCount: number;
}

const BreakfastConfig: React.FC<BreakfastConfigProps> = ({
    date,
    config,
    updateConfig,
    guestCount
}) => {
    const [selectedPackage, setSelectedPackage] = useState(config.package || "");
    const [selectedItems, setSelectedItems] = useState(config.items || []);
    const [validationError, setValidationError] = useState(false);

    // Selection limits based on package
    const getSelectionLimit = (packageType: string): number => {
        switch (packageType) {
            case 'silver': return 2;
            case 'gold': return 3;
            case 'diamond': return 4;
            default: return 2;
        }
    };

    const selectionLimit = getSelectionLimit(selectedPackage);

    // Update parent config when local state changes
    useEffect(() => {
        updateConfig({
            package: selectedPackage,
            items: selectedItems
        });

        // Validate selection
        if (selectedPackage && selectedItems.length < selectionLimit) {
            setValidationError(true);
        } else {
            setValidationError(false);
        }
    }, [selectedPackage, selectedItems, selectionLimit, updateConfig]);

    // Handle package selection
    const handlePackageSelect = (packageKey: string) => {
        setSelectedPackage(packageKey);
        setSelectedItems([]); // Reset items when package changes
    };

    // Handle item selection
    const handleItemSelection = (itemId: string) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                // Remove if already selected
                return prev.filter(id => id !== itemId);
            } else if (prev.length < selectionLimit) {
                // Add if under limit
                return [...prev, itemId];
            }
            return prev;
        });
    };

    // Package card component
    const PackageCard = ({ packageKey, packageData }: { packageKey: string, packageData: any }) => {
        const isSelected = selectedPackage === packageKey;

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all shadow-sm hover:shadow-md ${isSelected
                        ? 'bg-orange-100 border-orange-300'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                onClick={() => handlePackageSelect(packageKey)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{packageData.name}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-orange-500" />}
                </div>
                <p className="text-sm text-gray-600 mb-2">{packageData.description}</p>
                <p className="text-sm font-medium text-orange-600">₹{packageData.price.toLocaleString()} per person</p>
            </div>
        );
    };

    // Food item card component
    const FoodItemCard = ({ item }: { item: any }) => {
        const isSelected = selectedItems.includes(item.id);

        return (
            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${isSelected
                        ? 'bg-orange-50 border-orange-400 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                onClick={() => handleItemSelection(item.id)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-gray-800">{item.name}</h6>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-orange-500" />}
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
            </div>
        );
    };

    return (
        <div className="space-y-6 p-6 border border-orange-200 rounded-lg bg-orange-50">
            <h5 className="text-xl font-medium text-orange-700 border-b border-orange-200 pb-2">
                Breakfast Configuration
            </h5>

            {/* Package Selection */}
            <div>
                <h6 className="text-md font-medium text-gray-700 mb-3">Select Package:</h6>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(foodMenuData.breakfast).map(([packageKey, packageData]) => (
                        <PackageCard
                            key={packageKey}
                            packageKey={packageKey}
                            packageData={packageData}
                        />
                    ))}
                </div>
            </div>

            {/* Menu Selection */}
            {selectedPackage && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h6 className="text-md font-medium text-gray-700">
                            Select Items (choose {selectionLimit}):
                        </h6>
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                            {selectedItems.length} / {selectionLimit} selected
                        </Badge>
                    </div>

                    {validationError && (
                        <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Please select {selectionLimit} breakfast items.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {foodMenuData.breakfast[selectedPackage].items.map((item: any) => (
                            <FoodItemCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Cost Display */}
                    {selectedPackage && (
                        <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Cost for this day:</span>
                                <span className="font-bold text-orange-600">
                                    ₹{(foodMenuData.breakfast[selectedPackage].price * guestCount).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BreakfastConfig;