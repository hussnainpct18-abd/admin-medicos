import api from '../../services/api';

const normalize = (item) => ({ ...item, id: item._id });

export const fetchProducts = async () => {
  const res = await api.get('/products/get');
  return res.data.products.map(normalize);
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/products/get/${id}`);
  return normalize(res.data.product);
};

export const createProductApi = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) {
      formData.append('product_image', value);
    } else {
      formData.append(key, value);
    }
  });
  const res = await api.post('/products/create', formData);
  return normalize(res.data.product);
};

export const updateProductApi = async (id, data) => {
  const res = await api.put(`/products/update/${id}`, data);
  return normalize(res.data.product);
};

export const deleteProductApi = async (id) => {
  await api.delete(`/products/delete/${id}`);
  return { success: true };
};
