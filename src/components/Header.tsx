import React from 'react';
import { Activity, Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-bold text-gray-900">MedCheck AI</h1>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-1" />
            <span>AI-Powered Symptom Analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
}