import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { CartProvider } from "./context/CartContext";
import Header from "./component/Header";
import Home from "./page/Home";
import ProductList from "./page/ProductList";
import ProductDetail from "./page/ProductDetail";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import About from "./page/About";
import Contact from "./page/Contact";
import LoginPage from "./api/LoginPage";
import SignupPage from "./api/SignupPage";
import AdminDashboard from "./page/admin/AdminDashboard";
import DashboardPage from "./page/admin/DashboardPage";
import ProductsPage from "./page/admin/ProductsPage";
import UsersPage from "./page/admin/UsersPage";
import OrdersPage from "./page/admin/OrdersPage";
import CategoriesPage from "./page/admin/CategoriesPage";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;

  return children;
}

// 🔹 Layout for User (with Header & Footer)
function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

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
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User Routes with Header & Footer */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <Home />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <ProductList />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <ProductDetail />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <About />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <CartPage />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <CheckoutPage />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout>
                  <Contact />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes (no header/footer) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }>

              <Route path="/admin" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="categories" element={<CategoriesPage />} />
            </Route>

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
