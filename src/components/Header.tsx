import React from 'react';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Calculator className="w-8 h-8" />
          <h1 className="text-2xl font-bold">G Abacus : MathMaster</h1>
        </div>
      </div>
    </header>
  );
}