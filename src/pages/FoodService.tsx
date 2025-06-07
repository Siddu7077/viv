import React, { useState, useEffect, useMemo } from 'react';
import { format } from "date-fns";
import { foodMenuData } from './foodData.js';

// Import sub-components
import MealSelection from './MealSelection';
import DayWiseMealConfig from './DayWiseMealConfig';
import FoodSummary from './FoodSummary';
import ProgressIndicator from './ProgressIndicator';

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
    // Main state for which meals are selected
    const [selectedMeals, setSelectedMeals] = useState({
        breakfast: false,
        lunch: false,
        dinner: false
    });

    // Day-wise meal configurations
    const [dayWiseMealConfig, setDayWiseMealConfig] = useState<Record<string, any>>({});

    // Calculate total costs
    const calculateTotalCosts = useMemo(() => {
        let totalCost = 0;
        const mealCosts = { breakfast: 0, lunch: 0, dinner: 0 };
        const selectedDates = { breakfast: [], lunch: [], dinner: [] };

        dateRange.forEach(date => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dayConfig = dayWiseMealConfig[dateKey];

            if (!dayConfig) return;

            // Calculate breakfast cost for this day
            if (selectedMeals.breakfast && dayConfig.breakfast?.package) {
                const packageData = foodMenuData.breakfast[dayConfig.breakfast.package];
                if (packageData) {
                    const cost = packageData.price * guestCount;
                    mealCosts.breakfast += cost;
                    totalCost += cost;
                    selectedDates.breakfast.push(date);
                }
            }

            // Calculate lunch cost for this day
            if (selectedMeals.lunch && dayConfig.lunch?.type && dayConfig.lunch?.package) {
                const packageData = foodMenuData[dayConfig.lunch.type]?.[dayConfig.lunch.package];
                if (packageData) {
                    const cost = packageData.price * guestCount;
                    mealCosts.lunch += cost;
                    totalCost += cost;
                    selectedDates.lunch.push(date);
                }
            }

            // Calculate dinner cost for this day
            if (selectedMeals.dinner && dayConfig.dinner?.type && dayConfig.dinner?.package) {
                const packageData = foodMenuData[dayConfig.dinner.type]?.[dayConfig.dinner.package];
                if (packageData) {
                    const cost = packageData.price * guestCount;
                    mealCosts.dinner += cost;
                    totalCost += cost;
                    selectedDates.dinner.push(date);
                }
            }
        });

        return { totalCost, mealCosts, selectedDates };
    }, [dayWiseMealConfig, selectedMeals, guestCount, dateRange]);

    // Update parent component with costs
    useEffect(() => {
        const { totalCost, mealCosts, selectedDates } = calculateTotalCosts;
        onFoodCostUpdate(totalCost, mealCosts, selectedDates);
    }, [calculateTotalCosts, onFoodCostUpdate]);

    // Handle meal selection change
    const handleMealSelection = (meal: 'breakfast' | 'lunch' | 'dinner', selected: boolean) => {
        setSelectedMeals(prev => ({
            ...prev,
            [meal]: selected
        }));

        // Clear configurations for unselected meals
        if (!selected) {
            setDayWiseMealConfig(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(dateKey => {
                    if (updated[dateKey]?.[meal]) {
                        const newDayConfig = { ...updated[dateKey] };
                        delete newDayConfig[meal];
                        updated[dateKey] = newDayConfig;
                    }
                });
                return updated;
            });
        }
    };

    // Update day-wise meal configuration
    const updateDayMealConfig = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        setDayWiseMealConfig(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                [meal]: config
            }
        }));
    };

    // Get configuration for a specific day and meal
    const getDayMealConfig = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => {
        const dateKey = format(date, 'yyyy-MM-dd');
        return dayWiseMealConfig[dateKey]?.[meal] || {};
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
            <h3 className="font-serif text-3xl mb-8 text-gray-800 border-b pb-4">Food Service</h3>

            {/* Step 1: Select Meals */}
            <div className="mb-12">
                <ProgressIndicator step={1} title="Select Meals" />
                <MealSelection 
                    selectedMeals={selectedMeals}
                    onMealSelection={handleMealSelection}
                />
            </div>

            {/* Step 2: Configure Day-wise Meals */}
            {(selectedMeals.breakfast || selectedMeals.lunch || selectedMeals.dinner) && (
                <div className="mb-12">
                    <ProgressIndicator step={2} title="Configure Day-wise Meals" />
                    <DayWiseMealConfig
                        dateRange={dateRange}
                        selectedMeals={selectedMeals}
                        getDayMealConfig={getDayMealConfig}
                        updateDayMealConfig={updateDayMealConfig}
                        guestCount={guestCount}
                    />
                </div>
            )}

            {/* Step 3: Summary */}
            <div className="mt-10">
                <ProgressIndicator step={3} title="Food Selection Summary" />
                <FoodSummary
                    selectedMeals={selectedMeals}
                    dayWiseMealConfig={dayWiseMealConfig}
                    dateRange={dateRange}
                    totalCost={calculateTotalCosts.totalCost}
                    mealCosts={calculateTotalCosts.mealCosts}
                />
            </div>
        </div>
    );
};

export default FoodService;