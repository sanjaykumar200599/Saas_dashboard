import React from 'react';
import { formatDate, getRiskColor, getStatusColor } from '../../utils/helpers';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  Clock,
  FileText
} from 'lucide-react';

const ContractMetadata = ({ contract }) => {
  const getRiskIcon = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <TrendingUp className="h-5 w-5" />;
      case 'low':
        return <Shield className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'renewal due':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiryDate = new Date(contract.expiry);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `Expired ${Math.abs(diffDays)} days ago`, color: 'text-red-600' };
    } else if (diffDays <= 30) {
      return { text: `${diffDays} days until expiry`, color: 'text-orange-600' };
    } else if (diffDays <= 90) {
      return { text: `${diffDays} days until expiry`, color: 'text-yellow-600' };
    } else {
      return { text: `${diffDays} days until expiry`, color: 'text-gray-600' };
    }
  };

  const expiryInfo = getDaysUntilExpiry();

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Left side - Main info */}
        <div className="flex-1">
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-700">
                  {contract.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{contract.name}</h1>
              <p className="text-gray-600 text-sm">Contract ID: {contract.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parties */}
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Contract Parties</p>
                <p className="text-gray-900 font-medium">{contract.parties}</p>
              </div>
            </div>
            
            {/* Contract Period */}
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Contract Period</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(contract.start)} - {formatDate(contract.expiry)}
                </p>
                <p className={`text-sm ${expiryInfo.color}`}>
                  {expiryInfo.text}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Status badges */}
        <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-4 lg:items-end">
          {/* Status */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(contract.status)}
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(contract.status)}`}>
                {contract.status}
              </span>
            </div>
          </div>
          
          {/* Risk Level */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Risk Level:</span>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center ${getRiskColor(contract.risk)}`}>
                {getRiskIcon(contract.risk)}
                <span className="ml-2">{contract.risk} Risk</span>
              </span>
            </div>
          </div>
          
          {/* Additional metadata */}
          <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{formatDate(contract.start)}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary text-sm">
            Download PDF
          </button>
          <button className="btn-secondary text-sm">
            Export Data
          </button>
          <button className="btn-secondary text-sm">
            Set Reminder
          </button>
          <button className="btn-primary text-sm">
            Renew Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractMetadata;