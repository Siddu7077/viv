import React from 'react';
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { foodMenuData } from './foodData.js';

// Import meal-specific components
import BreakfastConfig from './BreakfastConfig';
import LunchDinnerConfig from './LunchDinnerConfig';

interface SingleDayMealConfigProps {
    date: Date;
    selectedMeals: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
    };
    getDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => any;
    updateDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => void;
    guestCount: number;
}

const SingleDayMealConfig: React.FC<SingleDayMealConfigProps> = ({
    date,
    selectedMeals,
    getDayMealConfig,
    updateDayMealConfig,
    guestCount
}) => {
    // Get active meals for tabs
    const activeMeals = Object.entries(selectedMeals)
        .filter(([_, selected]) => selected)
        .map(([meal, _]) => meal);

    const defaultTab = activeMeals[0] || 'breakfast';

    // Meal color mapping
    const getMealColorClass = (meal: string): string => {
        switch (meal) {
            case 'breakfast': return 'orange';
            case 'lunch': return 'green';
            case 'dinner': return 'indigo';
            default: return 'gray';
        }
    };

    if (activeMeals.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No meals selected for configuration.</p>
            </div>
        );
    }

    return (
        <div>
            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    {selectedMeals.breakfast && (
                        <TabsTrigger 
                            value="breakfast" 
                            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                        >
                            Breakfast
                        </TabsTrigger>
                    )}
                    {selectedMeals.lunch && (
                        <TabsTrigger 
                            value="lunch" 
                            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        >
                            Lunch
                        </TabsTrigger>
                    )}
                    {selectedMeals.dinner && (
                        <TabsTrigger 
                            value="dinner" 
                            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                        >
                            Dinner
                        </TabsTrigger>
                    )}
                </TabsList>

                {selectedMeals.breakfast && (
                    <TabsContent value="breakfast">
                        <BreakfastConfig
                            date={date}
                            config={getDayMealConfig(date, 'breakfast')}
                            updateConfig={(config) => updateDayMealConfig(date, 'breakfast', config)}
                            guestCount={guestCount}
                        />
                    </TabsContent>
                )}

                {selectedMeals.lunch && (
                    <TabsContent value="lunch">
                        <LunchDinnerConfig
                            date={date}
                            meal="lunch"
                            config={getDayMealConfig(date, 'lunch')}
                            updateConfig={(config) => updateDayMealConfig(date, 'lunch', config)}
                            guestCount={guestCount}
                        />
                    </TabsContent>
                )}

                {selectedMeals.dinner && (
                    <TabsContent value="dinner">
                        <LunchDinnerConfig
                            date={date}
                            meal="dinner"
                            config={getDayMealConfig(date, 'dinner')}
                            updateConfig={(config) => updateDayMealConfig(date, 'dinner', config)}
                            guestCount={guestCount}
                        />
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
};

export default SingleDayMealConfig;