import React from 'react';
import { Calendar, Users, DollarSign, CheckCircle } from 'lucide-react';

const FoodSummary = ({ selectedMeals, dayWiseMealConfig, dateRange, totalCost, mealCosts }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd format
  };

  const getMealConfigStatus = (date, mealType) => {
    const dateKey = formatDateKey(date);
    const dayConfig = dayWiseMealConfig[dateKey];
    
    if (!selectedMeals[mealType]) {
      return { configured: false, status: 'Not selected' };
    }
    
    if (!dayConfig || !dayConfig[mealType]) {
      return { configured: false, status: 'Not configured' };
    }

    const mealConfig = dayConfig[mealType];
    
    if (mealType === 'breakfast') {
      return {
        configured: !!mealConfig.package,
        status: mealConfig.package ? `Package: ${mealConfig.package}` : 'Package not selected'
      };
    } else {
      return {
        configured: !!(mealConfig.type && mealConfig.package),
        status: mealConfig.type && mealConfig.package 
          ? `${mealConfig.type} - ${mealConfig.package}` 
          : 'Type/Package not selected'
      };
    }
  };

  const renderDayWiseBreakdown = () => {
    return dateRange.map((date, index) => {
      const breakfastStatus = getMealConfigStatus(date, 'breakfast');
      const lunchStatus = getMealConfigStatus(date, 'lunch');
      const dinnerStatus = getMealConfigStatus(date, 'dinner');

      return (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Day {index + 1} - {formatDate(date)}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Breakfast */}
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-orange-800">Breakfast</h4>
                {breakfastStatus.configured && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {breakfastStatus.status}
              </p>
            </div>

            {/* Lunch */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-800">Lunch</h4>
                {lunchStatus.configured && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {lunchStatus.status}
              </p>
            </div>

            {/* Dinner */}
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-800">Dinner</h4>
                {dinnerStatus.configured && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {dinnerStatus.status}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderTotalSummary = () => {
    const totalDays = dateRange.length;
    const selectedMealCount = Object.values(selectedMeals).filter(Boolean).length;
    const totalPossibleMeals = totalDays * selectedMealCount;
    
    // Count configured meals
    let configuredMeals = 0;
    dateRange.forEach(date => {
      if (selectedMeals.breakfast && getMealConfigStatus(date, 'breakfast').configured) configuredMeals++;
      if (selectedMeals.lunch && getMealConfigStatus(date, 'lunch').configured) configuredMeals++;  
      if (selectedMeals.dinner && getMealConfigStatus(date, 'dinner').configured) configuredMeals++;
    });

    return (
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Total Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalDays}</div>
            <div className="text-sm text-gray-600">Days</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{selectedMealCount}</div>
            <div className="text-sm text-gray-600">Meal Types</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {configuredMeals}/{totalPossibleMeals}
            </div>
            <div className="text-sm text-gray-600">Configured</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">₹{totalCost}</div>
            <div className="text-sm text-gray-600">Total Cost</div>
          </div>
        </div>

        {/* Meal-wise breakdown */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Cost Breakdown by Meal</h4>
          <div className="grid grid-cols-3 gap-4">
            {selectedMeals.breakfast && (
              <div className="bg-orange-100 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-800">₹{mealCosts.breakfast}</div>
                <div className="text-sm text-gray-600">Breakfast</div>
              </div>
            )}
            {selectedMeals.lunch && (
              <div className="bg-blue-100 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-800">₹{mealCosts.lunch}</div>
                <div className="text-sm text-gray-600">Lunch</div>
              </div>
            )}
            {selectedMeals.dinner && (
              <div className="bg-purple-100 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-800">₹{mealCosts.dinner}</div>
                <div className="text-sm text-gray-600">Dinner</div>
              </div>
            )}
          </div>
        </div>

        {configuredMeals < totalPossibleMeals && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {totalPossibleMeals - configuredMeals} meals are not yet configured. 
              Complete all meal configurations for accurate cost calculation.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Food Service Summary</h2>
        <span className="text-sm text-gray-500">
          {dateRange.length} days
        </span>
      </div>

      {renderTotalSummary()}

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Day-wise Breakdown</h3>
        {renderDayWiseBreakdown()}
      </div>

      {totalCost === 0 && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-600">
            No meals configured yet. Start by selecting meals for each day to see the cost breakdown.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodSummary;