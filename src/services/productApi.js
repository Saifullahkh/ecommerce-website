// productApi.js
import axios from 'axios';

// Using dummyjson.com as a fallback API since fakestoreapi.com is currently down
const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

// Helper function to map dummyjson product format to fakestore format
const mapProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail || (p.images && p.images[0]),
  rating: {
    rate: p.rating,
    count: Math.floor(Math.random() * 200) + 50 // DummyJSON doesn't have review count, so we mock it
  }
});

// GET all products
export const getAllProducts = async () => {
  const response = await api.get('/products?limit=100');
  const mappedProducts = response.data.products.map(mapProduct);
  return { data: mappedProducts };
};

// GET single product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return { data: mapProduct(response.data) };
};

// Get all categories
export const getAllCategories = async () => {
  const response = await api.get('/products/categories');
  // DummyJSON categories can be objects { slug, name } or strings depending on version. We need strings.
  let mappedCategories = [];
  if (response.data && response.data.length > 0) {
    if (typeof response.data[0] === 'object') {
      mappedCategories = response.data.map(c => c.slug || c.name);
    } else {
      mappedCategories = response.data;
    }
  }
  return { data: mappedCategories };
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  const mappedProducts = response.data.products.map(mapProduct);
  return { data: mappedProducts };
};

