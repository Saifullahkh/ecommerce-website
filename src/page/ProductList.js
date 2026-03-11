// ProductList.jsx
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productApi';
import ProductCard from '../component/ProductCard';
import { motion } from 'framer-motion'
import { FiFilter, FiSearch, FiAlertCircle } from "react-icons/fi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  

  return (
    <>
           {/* 1. Header Section */}
      <section className="py-5 border-bottom" style={{ backgroundColor: '#f1f2d9' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 offset-lg-3 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="display-3 fw-bold mb-3"
              >
                Our Collection
              </motion.h1>
              <div className="search-bar-container position-relative">
                <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input 
                  type="text" 
                  className="form-control form-control-lg ps-5 rounded-pill shadow-sm border-0" 
                  placeholder="Search your favorite items..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      


        <div className='container py-5'>
            <div className='row px-3 mb-3'>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb small mb-2">
                  <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
              </nav>
            </div>
            <div className="row px-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </>
  );
};

export default ProductList;
