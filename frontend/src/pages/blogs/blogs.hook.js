import { useState, useCallback } from 'react';
import * as blogsApi from './blogs.api';

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogsApi.fetchBlogs();
      setBlogs(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const getBlogById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogsApi.fetchBlogById(id);
      setBlog(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch blog details');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (id) => {
    try {
      await blogsApi.deleteBlogApi(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete blog');
    }
  }, []);

  const createBlog = useCallback(async (data) => {
    setLoading(true);
    try {
      const newBlog = await blogsApi.createBlogApi(data);
      setBlogs((prev) => [newBlog, ...prev]);
      return newBlog;
    } catch (err) {
      throw new Error(err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBlog = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const updated = await blogsApi.updateBlogApi(id, data);
      setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
      setBlog(updated);
      return updated;
    } catch (err) {
      throw new Error(err.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    blogs,
    blog,
    loading,
    error,
    getBlogs,
    getBlogById,
    deleteBlog,
    createBlog,
    updateBlog,
  };
}
