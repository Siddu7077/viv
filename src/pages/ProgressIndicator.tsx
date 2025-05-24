import React from 'react';
import { Check, Circle } from 'lucide-react';

const ProgressIndicator = ({ 
  currentStep, 
  steps = [
    { id: 1, title: 'Meal Selection', description: 'Choose which meals to serve' },
    { id: 2, title: 'Day Configuration', description: 'Configure meals for each day' },
    { id: 3, title: 'Summary & Review', description: 'Review and finalize' }
  ],
  className = ''
}) => {
  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-500 text-white border-green-500',
          line: 'bg-green-500',
          title: 'text-green-600 font-medium',
          description: 'text-green-500'
        };
      case 'current':
        return {
          circle: 'bg-blue-500 text-white border-blue-500 ring-4 ring-blue-100',
          line: 'bg-gray-300',
          title: 'text-blue-600 font-semibold',
          description: 'text-blue-500'
        };
      case 'upcoming':
        return {
          circle: 'bg-white text-gray-400 border-gray-300',
          line: 'bg-gray-300',
          title: 'text-gray-400',
          description: 'text-gray-400'
        };
      default:
        return {
          circle: 'bg-white text-gray-400 border-gray-300',
          line: 'bg-gray-300',
          title: 'text-gray-400',
          description: 'text-gray-400'
        };
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile version - Vertical */}
      <div className="md:hidden">
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const classes = getStepClasses(status);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200 ${classes.circle}
                  `}>
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-12 mt-2 ${classes.line}`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className={`text-sm ${classes.title} transition-colors duration-200`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 ${classes.description} transition-colors duration-200`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop version - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const classes = getStepClasses(status);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200 ${classes.circle}
                  `}>
                    {status === 'completed' ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-3 text-center max-w-32">
                    <h3 className={`text-sm ${classes.title} transition-colors duration-200`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-1 ${classes.description} transition-colors duration-200`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 ${classes.line} transition-colors duration-200`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;