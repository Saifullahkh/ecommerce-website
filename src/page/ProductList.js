// ProductList.jsx
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productApi';
import ProductCard from '../component/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
        <div className="bg-light py-5" >
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="text-center py-5">
                  <h1 className="fw-bold text-dark mb-2 display-4" style={{ letterSpacing: '-0.5px' }}>
                     All Products
                  </h1>
                  <p className="text-muted mx-auto mb-0 fs-5" style={{ maxWidth: '600px' }}>
                    Discover our <span className="text-primary fw-medium">premium collection</span> of 
                    carefully curated products designed to elevate your experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


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
