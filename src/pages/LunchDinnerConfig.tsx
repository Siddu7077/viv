import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { foodMenuData } from './foodData.js';

const LunchDinnerConfig = ({ 
  mealType = 'lunch', // Default value to prevent undefined
  config = {}, 
  onConfigChange, 
  dayIndex = 0 
}) => {
  const [activeTab, setActiveTab] = useState('starters');
  const [selectedCuisine, setSelectedCuisine] = useState(config?.cuisineType || 'vegetarian');
  const [selectedPackage, setSelectedPackage] = useState(config?.packageType || '');
  const [selectedItems, setSelectedItems] = useState({
    starters: config?.items?.starters || [],
    mainCourse: config?.items?.mainCourse || [],
    desserts: config?.items?.desserts || []
  });

  // Memoize expensive calculations
  const mealData = useMemo(() => {
    if (!mealType) return null;
    return foodMenuData[mealType.toLowerCase()];
  }, [mealType]);

  const cuisineData = useMemo(() => {
    return mealData?.[selectedCuisine];
  }, [mealData, selectedCuisine]);

  const packageData = useMemo(() => {
    return cuisineData?.packages?.[selectedPackage];
  }, [cuisineData, selectedPackage]);

  // Memoize total cost calculation
  const totalCost = useMemo(() => {
    if (!packageData) return 0;
    
    const startersCost = selectedItems.starters.reduce((sum, item) => {
      const starterItem = packageData.starters?.find(s => s.name === item);
      return sum + (starterItem?.price || 0);
    }, 0);
    
    const mainCourseCost = selectedItems.mainCourse.reduce((sum, item) => {
      const mainItem = packageData.mainCourse?.find(m => m.name === item);
      return sum + (mainItem?.price || 0);
    }, 0);
    
    const dessertsCost = selectedItems.desserts.reduce((sum, item) => {
      const dessertItem = packageData.desserts?.find(d => d.name === item);
      return sum + (dessertItem?.price || 0);
    }, 0);
    
    return startersCost + mainCourseCost + dessertsCost;
  }, [packageData, selectedItems]);

  // Debounced config change handler
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onConfigChange && mealType) {
        onConfigChange(dayIndex, mealType.toLowerCase(), {
          cuisineType: selectedCuisine,
          packageType: selectedPackage,
          items: selectedItems,
          totalCost: totalCost
        });
      }
    }, 100); // 100ms debounce

    return () => clearTimeout(timeoutId);
  }, [selectedCuisine, selectedPackage, selectedItems, totalCost, onConfigChange, dayIndex, mealType]);

  // Memoized handlers to prevent re-renders
  const handleCuisineChange = useCallback((cuisine) => {
    setSelectedCuisine(cuisine);
    setSelectedPackage('');
    setSelectedItems({ starters: [], mainCourse: [], desserts: [] });
  }, []);

  const handlePackageChange = useCallback((packageType) => {
    setSelectedPackage(packageType);
    setSelectedItems({ starters: [], mainCourse: [], desserts: [] });
  }, []);

  const handleItemToggle = useCallback((category, itemName) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: prev[category].includes(itemName)
        ? prev[category].filter(item => item !== itemName)
        : [...prev[category], itemName]
    }));
  }, []);

  // Early return if no mealType
  if (!mealType) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: Meal type not specified</p>
      </div>
    );
  }

  // Early return if no meal data
  if (!mealData) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">No data available for {mealType}</p>
      </div>
    );
  }

  const renderCuisineSelection = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Cuisine Type</h3>
      <div className="flex gap-4">
        {Object.keys(mealData).map(cuisine => (
          <button
            key={cuisine}
            onClick={() => handleCuisineChange(cuisine)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCuisine === cuisine
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}
          >
            {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  const renderPackageSelection = () => {
    if (!cuisineData?.packages) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(cuisineData.packages).map(([packageKey, packageInfo]) => (
            <div
              key={packageKey}
              onClick={() => handlePackageChange(packageKey)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedPackage === packageKey
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-semibold capitalize mb-2">{packageKey.replace(/([A-Z])/g, ' $1')}</h4>
              <p className="text-sm text-gray-600 mb-2">{packageInfo.description}</p>
              <p className="text-sm font-medium">Price Range: ₹{packageInfo.priceRange}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTabs = () => {
    if (!packageData) return null;

    const tabs = [
      { id: 'starters', label: 'Starters', count: packageData.starters?.length || 0 },
      { id: 'mainCourse', label: 'Main Course', count: packageData.mainCourse?.length || 0 },
      { id: 'desserts', label: 'Desserts', count: packageData.desserts?.length || 0 }
    ];

    return (
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderFoodItems = () => {
    if (!packageData || !packageData[activeTab]) return null;

    const categoryItems = packageData[activeTab];
    const selectedInCategory = selectedItems[activeTab];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryItems.map(item => {
          const isSelected = selectedInCategory.includes(item.name);
          
          return (
            <div
              key={item.name}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => handleItemToggle(activeTab, item.name)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{item.name}</h4>
                <span className="text-sm font-semibold text-green-600">₹{item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {item.spiceLevel && `🌶️ ${item.spiceLevel}`}
                  {item.category && ` • ${item.category}`}
                </span>
                {isSelected && (
                  <span className="text-green-500 text-sm">✓ Selected</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSummary = () => {
    const totalItems = Object.values(selectedItems).flat().length;

    if (totalItems === 0) return null;

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Selection Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Starters:</span>
            <div className="font-medium">{selectedItems.starters.length} items</div>
          </div>
          <div>
            <span className="text-gray-600">Main Course:</span>
            <div className="font-medium">{selectedItems.mainCourse.length} items</div>
          </div>
          <div>
            <span className="text-gray-600">Desserts:</span>
            <div className="font-medium">{selectedItems.desserts.length} items</div>
          </div>
          <div>
            <span className="text-gray-600">Total Cost:</span>
            <div className="font-semibold text-green-600">₹{totalCost}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {mealType} Configuration
        </h2>
        <span className="text-sm text-gray-500">
          Day {dayIndex + 1}
        </span>
      </div>

      {renderCuisineSelection()}
      {renderPackageSelection()}
      {renderTabs()}
      {renderFoodItems()}
      {renderSummary()}

      {selectedPackage && Object.values(selectedItems).flat().length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            Please select items from the available categories to complete your {mealType.toLowerCase()} configuration.
          </p>
        </div>
      )}
    </div>
  );
};

export default LunchDinnerConfig;