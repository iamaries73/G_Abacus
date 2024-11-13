import React, { useState, useEffect, useCallback } from 'react';
import { Exercise } from '../types';
import { generateNumber } from '../utils/mathUtils';
import { speak } from '../utils/speechUtils';
import { Play, Check, Volume2 } from 'lucide-react';

interface AbacusSessionProps {
  exercise: Exercise;
  speed: number;
  questionCount: number;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function AbacusSession({ 
  exercise, 
  speed,
  questionCount,
  onComplete, 
  onCancel 
}: AbacusSessionProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctSum, setCorrectSum] = useState<number | null>(null);

  const generateSequence = useCallback(() => {
    const newNumbers = Array.from({ length: questionCount }, () => 
      generateNumber(exercise.type, exercise.type === 'single')
    );
    setNumbers(newNumbers);
    setCorrectSum(newNumbers.reduce((sum, num) => sum + num, 0));
  }, [exercise, questionCount]);

  useEffect(() => {
    generateSequence();
  }, [generateSequence]);

  const displayAndSpeak = useCallback(async (index: number) => {
    const numStr = numbers[index];
    const speechText = numStr < 0 ? `minus ${Math.abs(numStr)}` : numStr.toString();
    await speak(speechText, speed);
  }, [numbers, speed]);

  const startDisplay = async () => {
    setIsDisplaying(true);
    setCurrentIndex(0);
    setShowResult(false);

    for (let i = 0; i < numbers.length; i++) {
      setCurrentIndex(i);
      await displayAndSpeak(i);
      // Add slight pause between numbers for better comprehension
      await new Promise(resolve => setTimeout(resolve, speed * 0.2));
    }

    setIsDisplaying(false);
    setCurrentIndex(-1);
  };

  const showAnswer = async () => {
    setShowResult(true);
    await speak(`That is ${correctSum}`, speed);
    setTimeout(() => {
      onComplete(1);
    }, 3000);
  };

  const replayNumber = async (index: number) => {
    if (index >= 0 && index < numbers.length) {
      const numStr = numbers[index];
      const speechText = numStr < 0 ? `minus ${Math.abs(numStr)}` : numStr.toString();
      await speak(speechText, speed);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Abacus Speed Test</h2>
        
        <p className="text-gray-600 mb-6">
          {isDisplaying 
            ? "Listen and watch the numbers as they appear..."
            : currentIndex === -1 && !showResult
            ? "Press Start to begin"
            : "Press Check Answer to see the sum"}
        </p>

        <div className="text-9xl font-bold min-h-[12rem] flex items-center justify-center">
          {isDisplaying && currentIndex >= 0 ? (
            <div className="animate-fade-in flex items-center space-x-6">
              <span className={numbers[currentIndex] < 0 ? 'text-red-500' : 'text-gray-800'}>
                {numbers[currentIndex]}
              </span>
              <button 
                onClick={() => replayNumber(currentIndex)}
                className="text-4xl text-purple-500 hover:text-purple-600 transition-colors"
              >
                <Volume2 className="w-12 h-12" />
              </button>
            </div>
          ) : showResult ? (
            <div className="flex items-center justify-center space-x-6">
              <span className={`text-6xl ${correctSum < 0 ? 'text-red-500' : 'text-green-500'}`}>
                Sum: {correctSum}
              </span>
              <button 
                onClick={() => speak(`That is ${correctSum}`, speed)}
                className="text-4xl text-purple-500 hover:text-purple-600 transition-colors"
              >
                <Volume2 className="w-12 h-12" />
              </button>
            </div>
          ) : null}
        </div>

        {!isDisplaying && currentIndex === -1 && !showResult && (
          <button
            onClick={startDisplay}
            className="btn-primary flex items-center space-x-2 mx-auto text-xl py-3 px-6"
          >
            <Play className="w-6 h-6" />
            <span>Start</span>
          </button>
        )}

        {!isDisplaying && currentIndex === -1 && !showResult && (
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={showAnswer}
              className="btn-primary flex items-center space-x-2 text-xl py-3 px-6"
            >
              <Check className="w-6 h-6" />
              <span>Check Answer</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-xl"
        >
          Exit
        </button>
      </div>
    </div>
  );
}