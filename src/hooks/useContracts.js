import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getContracts();
      setContracts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return { contracts, loading, error, refetch: fetchContracts };
};