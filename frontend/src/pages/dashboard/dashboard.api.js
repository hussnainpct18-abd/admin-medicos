import api from '../../services/api';

/**
 * Fetch all dashboard stats, charts, and activity data.
 * @returns {Promise<{stats: object, salesData: array, pieData: array, timeline: array}>}
 */
export const getDashboardStats = async () => {
  const res = await api.get('/dashboard/stats');
  return res.data;
};
