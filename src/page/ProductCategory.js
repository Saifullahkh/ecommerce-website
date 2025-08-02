import { useEffect, useState } from 'react';
import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory
} from '../services/productApi';
import ProductCard from '../component/ProductCard';
import '../App.css'


function ProductCategory() {
     const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    getAllCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

   const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      getAllProducts().then(res => setProducts(res.data));
    } else {
      getProductsByCategory(category).then(res => setProducts(res.data));
    }
  };

  return (
     <div className="container py-5">
        <h2 className="mb-4 fw-bold ">Explore by Product</h2>
        <ul className="custom-category-tabs d-flex flex-wrap gap-2 mb-4 list-unstyled">
            <li>
                <button
                className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
                >
                All Products
                </button>
            </li>
            {categories.map((category) => (
                <li key={category}>
                <button
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
                </li>
            ))}
        </ul>


        <div className="row px-3">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>

  )
}

export default ProductCategory