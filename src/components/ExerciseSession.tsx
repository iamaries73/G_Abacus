import React, { useState, useEffect } from 'react';
import { Exercise, Problem } from '../types';
import { generateProblem } from '../utils/mathUtils';
import Timer from './Timer';
import { Check, X } from 'lucide-react';

interface ExerciseSessionProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function ExerciseSession({ exercise, onComplete, onCancel }: ExerciseSessionProps) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newProblems = Array.from({ length: exercise.rows }, () => {
      const operation = exercise.operation === 'mixed'
        ? Math.random() > 0.5 ? '+' : '-'
        : exercise.operation === 'addition' ? '+' : '-';
      return generateProblem(exercise.type, operation);
    });
    setProblems(newProblems);
  }, [exercise]);

  const handleSubmit = () => {
    const currentProblem = problems[currentIndex];
    const isAnswerCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) setScore(score + 1);

    setTimeout(() => {
      if (currentIndex < problems.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setIsCorrect(null);
      } else {
        onComplete(score);
      }
    }, 1000);
  };

  const currentProblem = problems[currentIndex];

  if (!currentProblem) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-semibold">
          Problem {currentIndex + 1} of {problems.length}
        </div>
        <Timer 
          timeLimit={exercise.timeLimit || 5} 
          onTimeUp={() => onComplete(score)}
          isActive={true}
        />
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-6">
          {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="text-2xl w-32 p-3 border-2 rounded-lg text-center focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
            autoFocus
          />
          
          {isCorrect !== null && (
            <div className={`transition-all ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Exit
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
}