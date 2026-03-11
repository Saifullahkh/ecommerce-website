import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { CartProvider } from "./context/CartContext";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./page/Home";
import ProductList from "./page/ProductList";
import ProductDetail from "./page/ProductDetail";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import About from "./page/About";
import Contact from "./page/Contact";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      
      <BrowserRouter>
        {/* Header aur Footer ab har page par dikhenge */}
        <Header />
        
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Default Route: Agar koi galat URL dale toh Home par bhej de */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;