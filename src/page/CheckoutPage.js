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

    const orderData = {
      ...formData,
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby_XvjXERowZTf-GA52egmGh56-Wl7GPXGPj_H2mOpYjFqJfeXoSfYCLOLUDJXeygl8WA/exec", // <-- replace with actual deployed web app URL
        {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.result === "success") {
        alert("✅ Order submitted successfully!");
        clearCart();
        navigate("/order-confirmation");
      } else {
        alert("❌ Something went wrong while saving order!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // agar cart empty hai
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="zipCode" className="form-label">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <h2 className="mt-5 mb-4">Payment Method</h2>
                {["credit-card", "paypal", "cash-on-delivery"].map((method) => (
                  <div className="form-check mb-3" key={method}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id={method}
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={method}>
                      {method.replace("-", " ").toUpperCase()}
                    </label>
                  </div>
                ))}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4 py-3"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <div>
                    <span>{item.title}</span>
                    <span className="text-muted d-block">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
