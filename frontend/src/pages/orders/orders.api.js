import api from '../../services/api';

const normalize = (item) => ({ ...item, id: item._id });

export const fetchOrders = async () => {
  const res = await api.get('/orders/get');
  return res.data.orders.map(normalize);
};

export const fetchOrderById = async (id) => {
  const res = await api.get(`/orders/get/${id}`);
  return normalize(res.data.order);
};

export const updateOrderStatusApi = async (id, status) => {
  const res = await api.put(`/orders/update/${id}`, { orderStatus: status });
  return normalize(res.data.order);
};
