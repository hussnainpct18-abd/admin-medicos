import api from '../../services/api';

const normalize = (item) => ({ ...item, id: item._id });

export const fetchBlogs = async () => {
  const res = await api.get('/blogs/get');
  return res.data.blogs.map(normalize);
};

export const fetchBlogById = async (id) => {
  const res = await api.get(`/blogs/get/${id}`);
  return normalize(res.data.blog);
};

export const createBlogApi = async (data) => {
  const res = await api.post('/blogs/create', { ...data, blog_image: data.image });
  return normalize(res.data.blog);
};

export const updateBlogApi = async (id, data) => {
  const res = await api.put(`/blogs/update/${id}`, data);
  return normalize(res.data.blog);
};

export const deleteBlogApi = async (id) => {
  await api.delete(`/blogs/delete/${id}`);
  return { success: true };
};
