import React from 'react';
import { X, FileText, TrendingUp } from 'lucide-react';

const EvidenceDrawer = ({ isOpen, onClose, evidence, contractName }) => {
  if (!isOpen) return null;

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return 'text-green-600 bg-green-100';
    if (relevance >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRelevanceText = (relevance) => {
    if (relevance >= 0.8) return 'High';
    if (relevance >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Evidence & Sources</h2>
              <p className="text-sm text-gray-600 mt-1">{contractName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {evidence && evidence.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Found {evidence.length} relevant {evidence.length === 1 ? 'source' : 'sources'} supporting the contract analysis.
                </div>
                
                {evidence.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{item.source}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRelevanceColor(item.relevance)}`}>
                          {getRelevanceText(item.relevance)} ({Math.round(item.relevance * 100)}%)
                        </span>
                      </div>
                    </div>
                    
                    <blockquote className="bg-gray-50 border-l-4 border-primary-500 p-3 italic text-gray-700">
                      "{item.snippet}"
                    </blockquote>
                    
                    {/* Relevance bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Relevance Score</span>
                        <span>{Math.round(item.relevance * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item.relevance >= 0.8 ? 'bg-green-500' :
                            item.relevance >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.relevance * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Evidence Available</h3>
                <p className="text-gray-500">
                  No supporting evidence was found for this contract analysis.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={onClose}
              className="w-full btn-primary"
            >
              Close Evidence Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceDrawer;