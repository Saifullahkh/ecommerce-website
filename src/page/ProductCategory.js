import { useEffect, useState } from 'react';
import {
  getAllProducts,
  getAllCategories
} from '../services/productApi';
import ProductCard from '../component/ProductCard';
import '../App.css';


function ProductCategory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    getAllCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    const categoryProducts = products.filter(p => p.category === category);
    // Only include category if it has products returned in the allProducts array
    if (categoryProducts.length > 0) {
      acc[category] = categoryProducts;
    }
    return acc;
  }, {});

  return (
    <div className="container">
      {Object.keys(groupedProducts).length === 0 && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {Object.keys(groupedProducts).map(category => {
        const categoryProducts = groupedProducts[category];
        const isExpanded = expandedCategories[category];
        const displayedProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, 3);
        
        return (
          <div key={category} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-capitalize mb-0">
                {category.replace(/-/g, ' ')}
              </h3>
              {categoryProducts.length > 3 && (
                <button
                  className="btn btn-outline-dark rounded-pill px-4 shadow-sm"
                  onClick={() => toggleCategory(category)}
                >
                  {isExpanded ? 'View Less' : 'View All'}
                </button>
              )}
            </div>
            
            <div className="row px-3">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCategory;