// productApi.js
import api from '../api/api';

// GET all products
export const getAllProducts = () => {
  return api.get('/products');
};

// GET single product by ID
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// Get all categories
export const getAllCategories = () => {
  return api.get('/products/categories');
};

// Get products by category
export const getProductsByCategory = (category) => {
  return api.get(`/products/category/${category}`);
};
