export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getRiskColor = (risk) => {
  switch (risk?.toLowerCase()) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    case 'renewal due':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterContracts = (contracts, { search, status, risk }) => {
  return contracts.filter(contract => {
    const matchesSearch = !search || 
      contract.name.toLowerCase().includes(search.toLowerCase()) ||
      contract.parties.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = !status || contract.status === status;
    const matchesRisk = !risk || contract.risk === risk;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });
};