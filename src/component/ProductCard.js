import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 overflow-hidden shadow-sm product-card">
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.title}
        />
        
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title product-title">
              {product.title}
            </h5>
          </div>
          
          <div className="mt-auto">
            <div className="d-flex align-items-center mb-2">
              <p className="card-text product-price">
                ${product.price}
              </p>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <Link 
                to={`/products/${product.id}`} 
                className="btn btn-sm detail-button"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;