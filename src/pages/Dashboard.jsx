import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ContractTable from '../components/contracts/ContractRow';
import ContractFilters from '../components/contracts/ContractFilters';
import Pagination from '../components/contracts/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useContracts } from '../hooks/useContracts';
import { useDebounce } from '../hooks/useDebounce';
import { filterContracts } from '../utils/helpers';
import { Search, FileText, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { contracts, loading, error } = useContracts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    risk: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter contracts based on search and filters
  const filteredContracts = useMemo(() => {
    return filterContracts(contracts, {
      search: debouncedSearch,
      ...filters
    });
  }, [contracts, debouncedSearch, filters]);

  // Paginate filtered contracts
  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContracts.slice(startIndex, endIndex);
  }, [filteredContracts, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter(c => c.status === 'Active').length;
    const expired = contracts.filter(c => c.status === 'Expired').length;
    const renewalDue = contracts.filter(c => c.status === 'Renewal Due').length;
    const highRisk = contracts.filter(c => c.risk === 'High').length;

    return { total, active, expired, renewalDue, highRisk };
  }, [contracts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', risk: '' });
  };

  if (loading) {
    return (
      <Layout title="Contracts Dashboard">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Contracts Dashboard">
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Contracts</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Contracts Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="card p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Renewal Due</p>
              <p className="text-2xl font-bold text-gray-900">{stats.renewalDue}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Expired</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{stats.highRisk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contracts Table Section */}
      <div className="card">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg font-medium text-gray-900">All Contracts</h2>
            
            {/* Search Bar */}
            <div className="relative max-w-xs">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <ContractFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          hasActiveFilters={searchTerm || filters.status || filters.risk}
        />

        {/* Table */}
        {paginatedContracts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filteredContracts.length === 0 && contracts.length > 0 
                ? 'No contracts match your filters' 
                : 'No contracts yet'
              }
            </h3>
            <p className="text-gray-500 mb-4">
              {filteredContracts.length === 0 && contracts.length > 0 
                ? 'Try adjusting your search or filters to find contracts.' 
                : 'Upload your first contract to get started.'
              }
            </p>
            {filteredContracts.length === 0 && contracts.length > 0 && (
              <button
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <ContractTable contracts={paginatedContracts} />
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredContracts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;