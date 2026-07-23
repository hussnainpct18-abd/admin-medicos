import { useState, useCallback } from 'react';
import * as productsApi from './products.api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all products
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.fetchProducts();
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load products');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single product by ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.fetchProductById(id);
      setProduct(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new product
  const createProduct = useCallback(async (payload) => {
    setLoading(true);
    try {
      const newProd = await productsApi.createProductApi(payload);
      setProducts((prev) => [newProd, ...prev]);
      return newProd;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing product
  const updateProduct = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      const updated = await productsApi.updateProductApi(id, payload);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setProduct(updated);
      return updated;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a product
  const deleteProduct = useCallback(async (id) => {
    try {
      await productsApi.deleteProductApi(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete product');
    }
  }, []);

  return {
    products,
    product,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
