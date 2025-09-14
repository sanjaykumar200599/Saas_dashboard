import React from 'react';
import { FileText, TrendingUp } from 'lucide-react';

const ClausesSection = ({ clauses }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBarColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!clauses || clauses.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Key Clauses
        </h2>
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No clauses found for this contract.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Key Clauses ({clauses.length})
      </h2>
      
      <div className="space-y-4">
        {clauses.map((clause, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-gray-900 flex-1">{clause.title}</h3>
              <div className="flex items-center text-sm ml-4">
                <TrendingUp className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-500 mr-2">Confidence:</span>
                <span className={`font-medium ${getConfidenceColor(clause.confidence)}`}>
                  {Math.round(clause.confidence * 100)}%
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {clause.summary}
            </p>
            
            {/* Confidence bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Confidence Score</span>
                <span>{Math.round(clause.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getConfidenceBarColor(clause.confidence)}`}
                  style={{ width: `${clause.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {clauses.length}
            </p>
            <p className="text-xs text-gray-500">Total Clauses</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {clauses.filter(c => c.confidence >= 0.8).length}
            </p>
            <p className="text-xs text-gray-500">High Confidence</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {Math.round(clauses.reduce((sum, c) => sum + c.confidence, 0) / clauses.length * 100)}%
            </p>
            <p className="text-xs text-gray-500">Avg Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClausesSection;