import React, { useState } from 'react';
import { Exercise } from '../types';
import { ChevronDown } from 'lucide-react';

const exerciseTypes = [
  {
    id: 'single-add',
    name: 'Single Digit Addition',
    config: { type: 'single', operation: 'addition' } as const
  },
  {
    id: 'single-mixed',
    name: 'Single Digit Addition and Subtraction',
    config: { type: 'single', operation: 'mixed' } as const
  },
  {
    id: 'double-mixed',
    name: 'Double Digit Addition and Subtraction',
    config: { type: 'double', operation: 'mixed' } as const
  },
  {
    id: 'triple-mixed',
    name: 'Three Digit Addition and Subtraction',
    config: { type: 'triple', operation: 'mixed' } as const
  },
  {
    id: 'quadruple-mixed',
    name: 'Four Digit Addition and Subtraction',
    config: { type: 'quadruple', operation: 'mixed' } as const
  }
];

interface ExerciseGridProps {
  onExerciseSelect: (exercise: Exercise, speed: number, questionCount: number) => void;
}

export default function ExerciseGrid({ onExerciseSelect }: ExerciseGridProps) {
  const [selectedType, setSelectedType] = useState(exerciseTypes[0]);
  const [questionCount, setQuestionCount] = useState(5);
  const [speed, setSpeed] = useState(2000); // Default 2000ms

  const handleStart = () => {
    const exercise: Exercise = {
      rows: questionCount,
      type: selectedType.config.type,
      operation: selectedType.config.operation,
      mode: 'visual'
    };
    onExerciseSelect(exercise, speed, questionCount);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exercise Type
        </label>
        <div className="relative">
          <select
            value={selectedType.id}
            onChange={(e) => setSelectedType(exerciseTypes.find(t => t.id === e.target.value)!)}
            className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                     appearance-none bg-white"
          >
            {exerciseTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Speed: {(3000 - speed) / 1000}x
        </label>
        <input
          type="range"
          min="0"
          max="2500"
          value={3000 - speed}
          onChange={(e) => setSpeed(3000 - parseInt(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Questions: {questionCount}
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5</span>
          <span>20</span>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <span>Start Exercise</span>
      </button>
    </div>
  );
}