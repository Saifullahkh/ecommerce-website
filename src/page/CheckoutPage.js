import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit-card",
  });

  const [loading, setLoading] = useState(false);

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = { ...formData, items: cartItems, total: cartTotal, createdAt: new Date().toISOString() };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxxUulS_b-65MPdco2zq2VxhpRedx5yxkMbiTlDlqor5GIuErXyBZJNCOu8v3n440U0/exec",
        {
          method: "POST",
          mode: "no-cors", // Ye line add karein
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      // Kyunki 'no-cors' mein response read nahi ho sakta, 
      // hum assume karte hain ki agar catch mein nahi gaya toh success hai.
      alert("✅ Order submitted successfully!");
      clearCart();
      navigate("/order-confirmation");

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting order.");
    } finally {
      setLoading(false);
    }
  };
  // agar cart empty hai
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <h2 className="mb-4 text-muted fw-bold">🛒 Your cart feels a little empty</h2>
        <p className="text-secondary mb-4">Go ahead and add some awesome products to proceed with checkout.</p>
        <Link to="/" className="btn custom-gradient-btn btn-lg px-5 rounded-pill shadow-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      {/* Checkout Header */}
      <div className="bg-dark text-white py-4 mb-5 shadow-sm">
        <div className="container">
          <h1 className="fw-bold m-0 text-center fs-3">Secure Checkout</h1>
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          {/* Form Section */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 mb-4 overflow-hidden">
              <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
                <h4 className="fw-bold text-dark m-0">Shipping Details</h4>
                <p className="text-muted small mt-1">Please enter your delivery information</p>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="Full Address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="address">Full Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="city">City</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          name="zipCode"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="zipCode">ZIP Code</label>
                      </div>
                    </div>
                  </div>

                  <hr className="my-5" />

                  {/* Payment Method */}
                  <div className="mb-4">
                    <h4 className="fw-bold text-dark mb-3">Payment Method</h4>
                    <div className="row g-3">
                      {[
                        { id: "credit-card", label: " Credit Card", icon: "💳" },
                        { id: "paypal", label: " PayPal", icon: "🌐" },
                        { id: "cash-on-delivery", label: " Cash on Delivery", icon: "💵" },
                      ].map((method) => (
                        <div className="col-md-4" key={method.id}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="paymentMethod"
                            id={method.id}
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleChange}
                          />
                          <label
                            className="btn btn-outline-dark w-100 py-3 rounded-3 d-flex flex-column align-items-center justify-content-center"
                            htmlFor={method.id}
                            style={{ gap: '8px', cursor: 'pointer' }}
                          >
                            <span className="fs-3">{method.icon}</span>
                            <span className="fw-semibold small">{method.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn custom-gradient-btn w-100 py-3 mt-3 rounded-3 fs-5 fw-bold shadow"
                    disabled={loading}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Place Order"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{ top: "6rem" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="cart-items-wrapper mb-4" style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3 pb-3 border-bottom"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded img-fluid object-fit-cover me-3 border"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="text-truncate mb-1" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
                        <span className="text-muted small d-block mb-1">
                          Qty: {item.quantity} × <span className="fw-medium">${item.price.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className="fw-bold ms-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Shipping</span>
                  <span className="text-success fw-medium">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fs-5 fw-bold text-dark">Total</span>
                  <span className="fs-4 fw-bold text-dark">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Order Summary */}

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
