import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ContractMetadata from '../components/contract-detail/ContractMetadata';
import ClausesSection from '../components/contract-detail/ClausesSection';
import InsightsSection from '../components/contract-detail/InsightsSection';
import EvidenceDrawer from '../components/contract-detail/EvidenceDrawer';
import { api } from '../services/api';
import { 
  ArrowLeft, 
  AlertTriangle, 
  FileText,
  Eye
} from 'lucide-react';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getContract(id);
        setContract(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Contract Details">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Contract Details">
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Contract</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  if (!contract) {
    return (
      <Layout title="Contract Details">
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Not Found</h3>
          <p className="text-gray-500 mb-4">The contract you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={contract.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => setShowEvidence(true)}
            className="btn-primary flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Evidence
          </button>
        </div>

        {/* Contract Metadata */}
        <ContractMetadata contract={contract} />

        {/* Clauses and Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClausesSection clauses={contract.clauses} />
          <InsightsSection insights={contract.insights} />
        </div>
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
        evidence={contract.evidence}
        contractName={contract.name}
      />
    </Layout>
  );
};

export default ContractDetail;