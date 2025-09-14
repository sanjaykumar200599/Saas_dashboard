import React from 'react';
import { getRiskColor } from '../../utils/helpers';
import { Brain, AlertTriangle, TrendingUp, Shield, Lightbulb } from 'lucide-react';

const InsightsSection = ({ insights }) => {
  const getRiskIcon = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <TrendingUp className="h-5 w-5" />;
      case 'low':
        return <Shield className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getRiskPriority = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  // Sort insights by risk level (high to low)
  const sortedInsights = insights ? [...insights].sort((a, b) => 
    getRiskPriority(b.risk) - getRiskPriority(a.risk)
  ) : [];

  if (!insights || insights.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          AI Risk Insights
        </h2>
        <div className="text-center py-8">
          <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No AI insights available for this contract.</p>
          <button className="mt-4 btn-primary">
            Generate Insights
          </button>
        </div>
      </div>
    );
  }

  const riskCounts = {
    high: insights.filter(i => i.risk?.toLowerCase() === 'high').length,
    medium: insights.filter(i => i.risk?.toLowerCase() === 'medium').length,
    low: insights.filter(i => i.risk?.toLowerCase() === 'low').length
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          AI Risk Insights ({insights.length})
        </h2>
        <button 
          className="btn-secondary text-sm"
          onClick={() => alert('Refresh insights feature not implemented in demo')}
        >
          Refresh Analysis
        </button>
      </div>
      
      {/* Risk summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-lg font-bold text-red-600">{riskCounts.high}</p>
              <p className="text-xs text-gray-500">High Risk</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-lg font-bold text-yellow-600">{riskCounts.medium}</p>
              <p className="text-xs text-gray-500">Medium Risk</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-lg font-bold text-green-600">{riskCounts.low}</p>
              <p className="text-xs text-gray-500">Low Risk</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights list */}
      <div className="space-y-4">
        {sortedInsights.map((insight, index) => {
          const riskColorClass = getRiskColor(insight.risk);
          return (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`p-2 rounded-lg ${riskColorClass.replace('text-', 'bg-').replace('-800', '-100')}`}>
                    <span className={riskColorClass}>
                      {getRiskIcon(insight.risk)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${riskColorClass.replace('text-', 'bg-').replace('-800', '-100')} ${riskColorClass}`}>
                      {insight.risk} Risk
                    </span>
                    <span className="text-xs text-gray-500">
                      AI Confidence: 87%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {insight.message}
                  </p>
                  
                  {/* Action buttons */}
                  <div className="mt-3 flex items-center space-x-3 text-xs">
                    <button className="text-primary-600 hover:text-primary-800 font-medium">
                      View Details
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      Dismiss
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      Flag for Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Action footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Last analysis: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-sm">
            Export Report
          </button>
          <button className="btn-primary text-sm">
            Schedule Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;