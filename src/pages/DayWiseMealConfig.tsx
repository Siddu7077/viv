import React from 'react';
import { format } from "date-fns";
import { Calendar } from "lucide-react";

// Import sub-components
import SingleDayMealConfig from './SingleDayMealConfig';

interface DayWiseMealConfigProps {
    dateRange: Date[];
    selectedMeals: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
    };
    getDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => any;
    updateDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => void;
    guestCount: number;
}

const DayWiseMealConfig: React.FC<DayWiseMealConfigProps> = ({
    dateRange,
    selectedMeals,
    getDayMealConfig,
    updateDayMealConfig,
    guestCount
}) => {
    return (
        <div className="space-y-8">
            {dateRange.map((date, index) => (
                <div 
                    key={date.toString()} 
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm"
                >
                    {/* Date Header */}
                    <div className="flex items-center mb-6 pb-4 border-b border-gray-300">
                        <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800">
                            {format(date, "EEEE, MMMM d, yyyy")}
                        </h4>
                        <span className="ml-auto text-sm text-gray-500">
                            Day {index + 1}
                        </span>
                    </div>

                    {/* Single Day Meal Configuration */}
                    <SingleDayMealConfig
                        date={date}
                        selectedMeals={selectedMeals}
                        getDayMealConfig={getDayMealConfig}
                        updateDayMealConfig={updateDayMealConfig}
                        guestCount={guestCount}
                    />
                </div>
            ))}
        </div>
    );
};

export default DayWiseMealConfig;