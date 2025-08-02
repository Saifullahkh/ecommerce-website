import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const [quantity, setQuantity] = useState(1);
  const { 
    cartItems, 
    cartTotal, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <Link to="/" className="btn btn1 mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map(item => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3 ">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <img 
                            src={item.image} 
                            className="img-fluid rounded-start w-50" 
                            alt={item.title}
                        />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">${item.price}</p>
                      <div className="d-flex align-items-center">
                        <span className="me-3">Quantity: </span>
                        <div className="quantity-selector d-flex align-items-center">
                          <button 
                            className="btn btn-outline-secondary px-3 py-1"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button 
                            className="btn btn-outline-secondary px-3 py-1"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="btn btn-danger ms-3"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2">
                        <strong>Item Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn btn1 w-100 mt-3">
                    Proceed to Checkout
                </Link>
                <button 
                  className="btn btn-outline-danger w-100 mt-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;