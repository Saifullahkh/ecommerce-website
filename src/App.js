import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { CartProvider } from './context/CartContext';
import Header from './component/Header';
import Home from './page/Home';
import ProductList from './page/ProductList';
import ProductDetail from './page/ProductDetail';
import CartPage from './page/CartPage';
import CheckoutPage from './page/CheckoutPage';
import { ToastContainer } from 'react-toastify';
import Footer from './component/Footer';
import About from './page/About';
import Contact from './page/Contact';

function App() {
  return (
    <CartProvider>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
