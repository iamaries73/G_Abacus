import React, { useState } from 'react';
import Header from './components/Header';
import ExerciseGrid from './components/ExerciseGrid';
import AbacusSession from './components/AbacusSession';
import { Exercise } from './types';

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [speed, setSpeed] = useState(2000);
  const [questionCount, setQuestionCount] = useState(5);

  const handleExerciseSelect = (exercise: Exercise, speed: number, questionCount: number) => {
    setSelectedExercise(exercise);
    setSpeed(speed);
    setQuestionCount(questionCount);
    setShowResults(false);
  };

  const handleExerciseComplete = (score: number) => {
    setFinalScore(score);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedExercise(null);
    setShowResults(false);
    setFinalScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {!selectedExercise && !showResults && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Abacus Speed Training
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enhance your mental math skills with our abacus-style exercises.
                Numbers will appear briefly - add them quickly in your mind!
              </p>
            </div>
            <ExerciseGrid onExerciseSelect={handleExerciseSelect} />
          </>
        )}

        {selectedExercise && !showResults && (
          <AbacusSession
            exercise={selectedExercise}
            speed={speed}
            questionCount={questionCount}
            onComplete={handleExerciseComplete}
            onCancel={handleReset}
          />
        )}

        {showResults && (
          <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Exercise Complete!</h2>
            <button onClick={handleReset} className="btn-primary">
              Try Another Exercise
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Abacus Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}