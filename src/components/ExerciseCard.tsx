import React from 'react';
import { Play, Volume2, Clock } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, onStart }: ExerciseCardProps) {
  const getTitle = () => {
    const digits = exercise.type === 'single' ? 'Single-Digit' : 'Two-Digit';
    const op = exercise.operation === 'mixed' ? 'Addition & Subtraction' : 
               exercise.operation === 'addition' ? 'Addition' : 'Subtraction';
    return `${digits} ${op}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{getTitle()}</h3>
        {exercise.mode === 'listening' && (
          <Volume2 className="w-5 h-5 text-purple-500" />
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        <p className="text-gray-600">
          <span className="font-medium">{exercise.rows} rows</span> of calculations
        </p>
        {exercise.timeLimit && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{exercise.timeLimit} minutes</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onStart(exercise)}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
      >
        <Play className="w-4 h-4" />
        <span>Start Practice</span>
      </button>
    </div>
  );
}