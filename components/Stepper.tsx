
import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick(stepNumber)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gray-800 text-white scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-white text-gray-400 border-2 border-gray-300 hover:border-gray-400'
                }`}
              >
                {isCompleted ? '✔' : stepNumber}
              </button>
              <p className={`mt-2 text-xs text-center font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {step}
              </p>
            </div>
            {stepNumber < steps.length && (
              <div
                className={`flex-1 h-1 mx-4 transition-colors duration-300 ${
                  isCompleted ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;