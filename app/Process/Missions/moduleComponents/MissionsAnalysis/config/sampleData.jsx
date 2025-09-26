// analytics-api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000';

class AnalyticsAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/mission/analytics`;
  }

  async fetchWithErrorHandling(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all dashboard analytics in one call
  async getDashboardAnalytics() {
    return await this.fetchWithErrorHandling('/dashboard');
  }

  // Individual endpoints
  async getMissionsByType() {
    return await this.fetchWithErrorHandling('/missions-by-type');
  }

  async getBudgetByDestination() {
    return await this.fetchWithErrorHandling('/budget-by-destination');
  }

  async getMissionsByMonth() {
    return await this.fetchWithErrorHandling('/missions-by-month');
  }

  async getMissionsByStatus() {
    return await this.fetchWithErrorHandling('/missions-by-status');
  }

  async getTopDestinations(limit = 5) {
    return await this.fetchWithErrorHandling(`/top-destinations?limit=${limit}`);
  }

  async getRecentMissions(limit = 10) {
    return await this.fetchWithErrorHandling(`/recent-missions?limit=${limit}`);
  }

  async getStatistics() {
    return await this.fetchWithErrorHandling('/statistics');
  }

  // Additional analytics endpoints
  async getMissionsByUser() {
    return await this.fetchWithErrorHandling('/missions-by-user');
  }

  async getBudgetEvolution() {
    return await this.fetchWithErrorHandling('/budget-evolution');
  }
}

// Create a single instance to export
const analyticsAPI = new AnalyticsAPI();

// Import React hooks at the top
import { useState, useEffect } from 'react';

// React Hook for using analytics data
export const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const analyticsData = await analyticsAPI.getDashboardAnalytics(); // Use the instance
      setData(analyticsData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  };
};

// React Hook for individual analytics
export const useSpecificAnalytics = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (endpoint) {
        case 'missions-by-type':
          result = await analyticsAPI.getMissionsByType();
          break;
        case 'budget-by-destination':
          result = await analyticsAPI.getBudgetByDestination();
          break;
        case 'missions-by-month':
          result = await analyticsAPI.getMissionsByMonth();
          break;
        case 'missions-by-status':
          result = await analyticsAPI.getMissionsByStatus();
          break;
        case 'top-destinations':
          result = await analyticsAPI.getTopDestinations(params.limit);
          break;
        case 'recent-missions':
          result = await analyticsAPI.getRecentMissions(params.limit);
          break;
        case 'statistics':
          result = await analyticsAPI.getStatistics();
          break;
        case 'missions-by-user':
          result = await analyticsAPI.getMissionsByUser();
          break;
        case 'budget-evolution':
          result = await analyticsAPI.getBudgetEvolution();
          break;
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
      
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error(`Failed to fetch ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Export the API instance as well if needed
export default analyticsAPI;