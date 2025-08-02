// ProductDetail.jsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getProductById } from '../services/productApi';
import { CartContext } from '../context/CartContext';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ 
      ...product,
      quantity: quantity
    });
   toast.success(` (Qty: ${quantity}) added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
    // Optionally navigate to cart
    // navigate('/cart');
  };

  
  
  if (!product) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // Sample images array - replace with your actual product images if available
  const productImages = [
    product.image,
    'https://via.placeholder.com/500x500?text=Product+Image+2',
    'https://via.placeholder.com/500x500?text=Product+Image+3'
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card mb-4 border-0 ">
            <div className="row g-0">
              {/* Image Gallery Column */}
              <div className="col-md-5">
                <div className="p-3">
                  <div className="main-image-container mb-3 border rounded-3 overflow-hidden p-4">
                    <img
                      src={productImages[selectedImage]}
                      className="img-fluid w-100 object-contain bg-light"
                      alt={product.title}
                      style={{ height: '350px', objectPosition: 'center' }}
                    />
                  </div>
                  <div className="thumbnail-container d-flex gap-2">
                    {productImages.map((img, index) => (
                      <div 
                        key={index}
                        className={`thumbnail border rounded-2 cursor-pointer ${selectedImage === index ? 'border-primary border-2' : ''}`}
                        onClick={() => setSelectedImage(index)}
                        style={{ width: '80px', height: '80px' }}
                      >
                        <img
                          src={img}
                          className="img-fluid h-100 w-100 object-contain p-1 bg-light"
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info Column */}
              <div className="col-md-7">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h1 className="fw-bold mb-2" style={{ fontSize: '1.8rem' }}>{product.title}</h1>
                      <div className="d-flex align-items-center mb-3">
                        <div className="text-warning me-2">
                          {[...Array(5)].map((_, i) => (
                            i < Math.floor(product.rating?.rate || 0) ? <FaStar key={i} /> : <FaRegStar key={i} />
                          ))}
                        </div>
                        <span className="text-muted">
                          ({product.rating?.rate ? product.rating.rate.toFixed(1) : '0.0'} rating | {product.rating?.count || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-success fw-bold mb-3">${product.price}</h3>
                  </div>

                  <p className="text-muted mb-4">{product.description}</p>

                  <div className="d-flex gap-3 mb-4">
                    <button 
                      className="btn btn1 flex-grow-1 py-2 fw-bold"
                      onClick={handleAddToCart}
                    >
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </button>
                  </div>

                  <div className="border-top pt-3">
                    <div className="d-flex gap-4">
                      <div>
                        <h6 className="fw-bold">Free Delivery</h6>
                        <p className="text-muted small">For all orders over $50</p>
                      </div>
                      <div>
                        <h6 className="fw-bold">Easy Returns</h6>
                        <p className="text-muted small">30 days return policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
         <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Product Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({product.rating?.count || 0})
                  </button>
                </li>
              </ul>
              
              <div className="tab-content p-3">
                <div className={`tab-pane ${activeTab === 'details' ? 'show active' : 'fade'}`}>
                  <p>{product.description}</p>
                  <p>Lorem ipsum dolor sit amet...</p>
                </div>
                
                <div className={`tab-pane ${activeTab === 'specs' ? 'show active' : 'fade'}`}>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row" className="text-muted">Material</th>
                        <td>100% Premium Cotton</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Closure</th>
                        <td>Zipper Front with Snap Button Placket</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Pockets</th>
                        <td>2 Side Pockets, 1 Chest Pocket</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Weight</th>
                        <td>0.8 kg</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Dimensions</th>
                        <td>Length: 70cm, Chest: 110cm (Size M)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Care Instructions</th>
                        <td>Machine Wash Cold, Tumble Dry Low</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Season</th>
                        <td>Spring/Autumn/Winter</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-muted">Origin</th>
                        <td>Imported</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className={`tab-pane ${activeTab === 'reviews' ? 'show active' : 'fade'}`}>
                  <div className="mb-3">
                    <h5>Customer Reviews</h5>
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(product.rating?.rate || 0) ? <FaStar key={i} /> : <FaRegStar key={i} />
                        ))}
                      </div>
                      <span>{product.rating?.rate?.toFixed(1) || '0.0'} out of 5</span>
                    </div>
                    <p className="text-muted">Based on {product.rating?.count || 0} reviews</p>
                  </div>

                   <div className="border-top pt-3">
                      <div className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>John D.</strong>
                          <div className="text-warning">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          </div>
                        </div>
                        <p>"Perfect jacket for hiking. Kept me warm without overheating."</p>
                        <small className="text-muted">Reviewed on October 15, 2023</small>
                      </div>
                      
                      <div className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Michael S.</strong>
                          <div className="text-warning">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                          </div>
                        </div>
                        <p>"Great quality but runs slightly large. Would recommend sizing down."</p>
                        <small className="text-muted">Reviewed on September 28, 2023</small>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;