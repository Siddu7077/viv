import React from 'react';
import { AlertCircle, CheckCircle, Info, X, Loader2 } from 'lucide-react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  );
};

// Alert Component for notifications
export const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  className = '',
  children
}) => {
  const alertStyles = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      titleColor: 'text-green-800'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      titleColor: 'text-red-800'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      titleColor: 'text-yellow-800'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      titleColor: 'text-blue-800'
    }
  };

  const style = alertStyles[type] || alertStyles.info;

  return (
    <div className={`border rounded-lg p-4 ${style.container} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${style.titleColor} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className="text-sm">
              {message}
            </p>
          )}
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Validation utility functions
export const ValidationUtils = {
  // Validate if at least one meal is selected
  validateMealSelection: (selectedMeals) => {
    const errors = [];
    if (!selectedMeals || Object.keys(selectedMeals).length === 0) {
      errors.push('Please select at least one meal type');
      return { isValid: false, errors };
    }

    const hasAnyMeal = Object.values(selectedMeals).some(meal => meal === true);
    if (!hasAnyMeal) {
      errors.push('Please select at least one meal type (Breakfast, Lunch, or Dinner)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate day-wise meal configuration
  validateDayConfiguration: (foodData, selectedMeals, totalDays) => {
    const errors = [];
    const warnings = [];

    for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
      const dayData = foodData[dayIndex] || {};
      
      // Check breakfast
      if (selectedMeals.breakfast) {
        if (!dayData.breakfast?.selectedItems?.length) {
          errors.push(`Day ${dayIndex + 1}: Breakfast not configured`);
        }
      }

      // Check lunch
      if (selectedMeals.lunch) {
        if (!dayData.lunch?.items || Object.values(dayData.lunch.items).flat().length === 0) {
          errors.push(`Day ${dayIndex + 1}: Lunch not configured`);
        }
      }

      // Check dinner
      if (selectedMeals.dinner) {
        if (!dayData.dinner?.items || Object.values(dayData.dinner.items).flat().length === 0) {
          errors.push(`Day ${dayIndex + 1}: Dinner not configured`);
        }
      }

      // Check for incomplete configurations
      const dayTotal = (dayData.breakfast?.totalCost || 0) + 
                      (dayData.lunch?.totalCost || 0) + 
                      (dayData.dinner?.totalCost || 0);
      
      if (dayTotal === 0) {
        warnings.push(`Day ${dayIndex + 1}: No cost calculated - check meal configurations`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  },

  // Validate minimum selections per meal
  validateMealMinimums: (mealConfig, mealType) => {
    const errors = [];
    
    if (mealType === 'breakfast') {
      if (!mealConfig?.selectedItems?.length) {
        errors.push('Please select at least one breakfast item');
      }
    } else {
      // For lunch/dinner
      if (!mealConfig?.items) {
        errors.push(`Please configure ${mealType} items`);
        return { isValid: false, errors };
      }

      const totalItems = Object.values(mealConfig.items).flat().length;
      if (totalItems === 0) {
        errors.push(`Please select at least one ${mealType} item`);
      }

      // Check if at least one item from each category is selected (optional warning)
      const categories = ['starters', 'mainCourse', 'desserts'];
      const emptyCategories = categories.filter(cat => 
        !mealConfig.items[cat] || mealConfig.items[cat].length === 0
      );

      if (emptyCategories.length === categories.length) {
        errors.push(`Please select items for ${mealType}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// Confirmation Dialog Component
export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default'
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    default: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg transition-colors ${typeStyles[type] || typeStyles.default}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ 
  title = 'No Data Available',
  description = 'There is no data to display at the moment.',
  actionText,
  onAction,
  icon,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Card Component for consistent styling
export const Card = ({ 
  title, 
  children, 
  className = '',
  headerAction,
  footer
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {headerAction && headerAction}
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

// Badge Component
export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant] || variants.default}
      ${sizes[size] || sizes.medium}
      ${className}
    `}>
      {children}
    </span>
  );
};