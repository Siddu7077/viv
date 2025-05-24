import React from 'react';
import { CheckCircle2, Clock } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";

interface MealSelectionProps {
    selectedMeals: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
    };
    onMealSelection: (meal: 'breakfast' | 'lunch' | 'dinner', selected: boolean) => void;
}

const MealSelection: React.FC<MealSelectionProps> = ({ selectedMeals, onMealSelection }) => {
    // Get placeholder image URLs
    const getImageUrl = (meal: 'breakfast' | 'lunch' | 'dinner'): string => {
        switch (meal) {
            case 'breakfast': return "https://marketplace.canva.com/EAE_1-A5zRM/1/0/1131w/canva-blue-modern-breakfast-time-%28flyer%29-pT84tGJjIfI.jpg";
            case 'lunch': return "https://www.shutterstock.com/shutterstock/photos/792090760/display_1500/stock-vector-food-poster-print-lettering-lunch-time-lettering-kitchen-cafe-restaurant-decoration-cutting-792090760.jpg";
            case 'dinner': return "https://marketplace.canva.com/EAGeY-c0bc4/1/0/1280w/canva-white-simple-dinner-night-instagram-post-4VyT5w-g6sM.jpg";
            default: return "https://marketplace.canva.com/EAE_1-A5zRM/1/0/1131w/canva-blue-modern-breakfast-time-%28flyer%29-pT84tGJjIfI.jpg";
        }
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
        const isSelected = selectedMeals[meal];

        return (
            <Card
                className={`cursor-pointer transition-all border-2 hover:shadow-lg ${isSelected
                        ? `border-${colorClass}-500 bg-${colorClass}-50`
                        : 'border-transparent hover:border-gray-200'
                    }`}
                onClick={() => onMealSelection(meal, !isSelected)}
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

    return (
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
    );
};

export default MealSelection;