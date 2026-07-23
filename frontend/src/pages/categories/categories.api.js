import api from '../../services/api';

const normalize = (item) => ({ ...item, id: item._id });

export const fetchCategories = async () => {
  const res = await api.get('/categories/get');
  return res.data.categories.map(normalize);
};

export const fetchCategoryById = async (id) => {
  const res = await api.get(`/categories/get/${id}`);
  return normalize(res.data.category);
};

export const createCategoryApi = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) {
      formData.append('category_image', value);
    } else {
      formData.append(key, value);
    }
  });
  const res = await api.post('/categories/create', formData);
  return normalize(res.data.category);
};

export const updateCategoryApi = async (id, data) => {
  const res = await api.put(`/categories/update/${id}`, data);
  return normalize(res.data.category);
};

export const deleteCategoryApi = async (id) => {
  await api.delete(`/categories/delete/${id}`);
  return { success: true };
};
