import { useState, useCallback } from 'react';
import * as categoriesApi from './categories.api';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all categories
  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single category by ID
  const getCategoryById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.fetchCategoryById(id);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new category
  const createCategory = useCallback(async (payload) => {
    setLoading(true);
    try {
      const newCat = await categoriesApi.createCategoryApi(payload);
      setCategories((prev) => [newCat, ...prev]);
      return newCat;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing category
  const updateCategory = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      const updated = await categoriesApi.updateCategoryApi(id, payload);
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a category
  const deleteCategory = useCallback(async (id) => {
    try {
      await categoriesApi.deleteCategoryApi(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete category');
    }
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
