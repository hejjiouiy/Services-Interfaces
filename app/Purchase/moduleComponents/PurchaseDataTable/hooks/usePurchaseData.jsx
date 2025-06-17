import { useState, useEffect } from 'react';

export const usePurchaseData = (initialData = [], apiEndpoint = null) => {
  const [requests, setRequests] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiEndpoint) {
      fetchRequests();
    }
  }, [apiEndpoint]);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    requests,
    setRequests,
    loading,
    error,
    refetch: fetchRequests
  };
};