import { useState, useEffect, useCallback } from 'react';
import { getDashboardStats } from './dashboard.api';

/**
 * Custom React Hook for fetching and managing Dashboard state.
 */
export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboardStats();
      setStats(data.stats);
      setSalesData(data.salesData);
      setPieData(data.pieData);
      setTimeline(data.timeline);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    salesData,
    pieData,
    timeline,
    loading,
    error,
    refresh: fetchStats
  };
}
