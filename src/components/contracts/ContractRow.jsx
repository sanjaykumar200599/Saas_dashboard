import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, getRiskColor, getStatusColor } from '../../utils/helpers';
import { ExternalLink, MoreHorizontal } from 'lucide-react';

const ContractRow = ({ contract = {}, index }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = React.useState(false);

  const handleRowClick = () => {
    if (contract?.id) {
      navigate(`/contracts/${contract.id}`);
    }
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    setShowActions(false);

    switch (action) {
      case 'view':
        contract?.id && navigate(`/contracts/${contract.id}`);
        break;
      case 'edit':
        alert('Edit functionality not implemented in demo');
        break;
      case 'download':
        alert('Download functionality not implemented in demo');
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this contract?')) {
          alert('Delete functionality not implemented in demo');
        }
        break;
      default:
        break;
    }
  };

  const getDaysUntilExpiry = () => {
    if (!contract?.expiry) {
      return { text: 'No expiry', color: 'text-gray-400' };
    }

    const today = new Date();
    const expiryDate = new Date(contract.expiry);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isNaN(diffDays)) {
      return { text: 'Invalid date', color: 'text-gray-400' };
    }

    if (diffDays < 0) {
      return { text: 'Expired', color: 'text-red-600' };
    } else if (diffDays <= 30) {
      return { text: `${diffDays} days left`, color: 'text-orange-600' };
    } else if (diffDays <= 90) {
      return { text: `${diffDays} days left`, color: 'text-yellow-600' };
    } else {
      return { text: `${diffDays} days left`, color: 'text-gray-600' };
    }
  };

  const expiryInfo = getDaysUntilExpiry();

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors group"
      onClick={handleRowClick}
    >
      {/* Contract Name */}
      <td className="table-cell">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <span className="text-sm font-medium text-primary-700">
                {contract?.name?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
              {contract?.name || "Unnamed Contract"}
            </div>
            <div className="text-sm text-gray-500">
              ID: {contract?.id || "N/A"} • Row {index + 1}
            </div>
          </div>
        </div>
      </td>

      {/* Parties */}
      <td className="table-cell">
        <div className="text-sm text-gray-900">{contract?.parties || "N/A"}</div>
        <div className="text-xs text-gray-500 mt-1">
          {contract?.parties ? contract.parties.split(' & ').length : 0} parties
        </div>
      </td>

      {/* Expiry Date */}
      <td className="table-cell">
        <div className="text-sm text-gray-900">
          {contract?.expiry ? formatDate(contract.expiry) : "N/A"}
        </div>
        <div className={`text-xs ${expiryInfo.color} mt-1`}>
          {expiryInfo.text}
        </div>
      </td>

      {/* Status */}
      <td className="table-cell">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            contract?.status ? getStatusColor(contract.status) : "bg-gray-200 text-gray-600"
          }`}
        >
          {contract?.status || "Unknown"}
        </span>
      </td>

      {/* Risk Score */}
      <td className="table-cell">
        <div className="flex items-center">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              contract?.risk ? getRiskColor(contract.risk) : "bg-gray-200 text-gray-600"
            }`}
          >
            {contract?.risk || "N/A"}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="table-cell">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick();
            }}
            className="text-primary-600 hover:text-primary-900 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="ml-1 text-sm">View</span>
          </button>

          {/* More actions dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    <button
                      onClick={(e) => handleActionClick(e, 'view')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ExternalLink className="h-4 w-4 mr-3" />
                      View Details
                    </button>
                    <button
                      onClick={(e) => handleActionClick(e, 'edit')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit Contract
                    </button>
                    <button
                      onClick={(e) => handleActionClick(e, 'download')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={(e) => handleActionClick(e, 'delete')}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Delete Contract
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ContractRow;
