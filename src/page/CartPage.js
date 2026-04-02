import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  // agar cart empty hai
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <h2 className="mb-4 text-muted fw-bold">🛒 Your cart is feeling lonely</h2>
        <p className="text-secondary mb-4">You haven't added any items to your cart yet.</p>
        <Link to="/" className="btn custom-gradient-btn btn-lg px-5 rounded-pill shadow-sm">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      {/* Page Header */}
      <div className="bg-dark text-white py-4 mb-5 shadow-sm">
        <div className="container">
          <h1 className="fw-bold m-0 text-center fs-3">Your Shopping Cart</h1>
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0 text-dark">Review Items</h4>
              <span className="text-muted">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="card shadow-sm border-0 rounded-4 mb-4 overflow-hidden" style={{ transition: "all 0.3s ease" }}>
                <div className="row g-0 align-items-center p-3">
                  {/* Product Image */}
                  <div className="col-md-3 col-4 p-2 text-center">
                    <img
                      src={item.image}
                      className="img-fluid rounded-3 object-fit-contain"
                      alt={item.title}
                      style={{ maxHeight: '120px', width: '100%' }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-9 col-8">
                    <div className="card-body py-2 pe-3 ps-md-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-dark fs-6 mb-0 text-truncate pe-3" title={item.title}>
                          {item.title}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-light text-danger rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                          style={{ width: "32px", height: "32px" }}
                          title="Remove item"
                        >
                          <i className="bi bi-trash fs-6">🗑️</i>
                        </button>
                      </div>

                      <div className="text-muted small text-uppercase mb-3 mt-1">
                        {item.category}
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-end mt-4">
                        {/* Quantity Selector */}
                        <div className="d-flex align-items-center bg-light border rounded-pill px-2 py-1 shadow-sm">
                          <button
                            className="btn btn-sm btn-link text-dark text-decoration-none border-0 fw-bold fs-5 px-2"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            −
                          </button>
                          <span className="fw-bold mx-3 user-select-none" style={{ minWidth: "20px", textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-link text-dark text-decoration-none border-0 fw-bold fs-5 px-2"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-end">
                          <div className="text-muted text-decoration-line-through small d-none d-md-block">
                            ${((item.price * item.quantity) * 1.1).toFixed(2)}
                          </div>
                          <strong className="fs-5 text-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </strong>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Sidebar */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{ top: "6rem" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4 border-bottom pb-3">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Subtotal</span>
                  <span className="fw-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Tax Estimate</span>
                  <span className="fw-medium">${(0).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4 text-muted">
                  <span>Shipping</span>
                  <span className="text-success fw-medium">Free</span>
                </div>

                <hr className="dotted mb-4" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold text-dark">Total</span>
                  <span className="fs-3 fw-bold text-dark">${cartTotal.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="btn custom-gradient-btn w-100 py-3 rounded-pill fs-5 fw-bold shadow mb-3" style={{ transition: "all 0.3s ease" }}>
                  Proceed to Checkout
                </Link>

                <button
                  className="btn btn-outline-danger w-100 py-2 rounded-pill fw-semibold"
                  onClick={clearCart}
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;