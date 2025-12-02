import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader, AlertCircle, CheckCircle } from "lucide-react";

const LoginPage = () => {
  const [form, setForm] = useState({ 
    username: "", 
    password: "", 
    role: "user",
    rememberMe: false 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (token) {
      const redirectPath = role === "admin" ? "/admin" : "/";
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Check for redirect message from other pages
  useEffect(() => {
    if (location.state?.message) {
      setMessage({
        type: location.state.type || "info",
        text: location.state.message
      });
      
      // Clear state to prevent showing message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const simulateApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate different responses based on credentials
        if (form.username === "admin" && form.password === "admin123") {
          resolve({ 
            success: true, 
            token: `${form.username}-token-${Date.now()}`,
            user: { username: form.username, role: form.role }
          });
        } else if (form.username === "locked" && form.password === "locked123") {
          reject(new Error("Account temporarily locked. Please try again later."));
        } else if (form.username && form.password) {
          resolve({ 
            success: true, 
            token: `${form.username}-token-${Date.now()}`,
            user: { username: form.username, role: form.role }
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await simulateApiCall();
      
      if (response.success) {
        // Store authentication data
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.user.role);
        localStorage.setItem("username", response.user.username);
        
        if (form.rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("savedUsername", form.username);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("savedUsername");
        }

        // Store login timestamp
        localStorage.setItem("loginTime", new Date().toISOString());

        setMessage({
          type: "success",
          text: `Welcome back, ${response.user.username}!`
        });

        // Redirect after success message
        setTimeout(() => {
          const redirectPath = response.user.role === "admin" ? "/admin" : "/";
          navigate(redirectPath, { replace: true });
        }, 1000);

      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Login failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  // Pre-fill remembered username
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const savedUsername = localStorage.getItem("savedUsername");
    
    if (remembered === "true" && savedUsername) {
      setForm(prev => ({ ...prev, username: savedUsername, rememberMe: true }));
    }
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ">
      <div className="card p-4 shadow-lg border-0" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Welcome Back</h3>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div 
              className={`alert alert-${message.type === "error" ? "danger" : message.type} d-flex align-items-center mb-3`}
              role="alert"
            >
              {message.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
              <span className="ms-2">{message.text}</span>
              <button 
                type="button" 
                className="btn-close ms-auto" 
                onClick={clearMessage}
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                value={form.username}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Enter your username"
              />
              {errors.username && (
                <div className="invalid-feedback d-flex align-items-center">
                  <AlertCircle size={16} className="me-1" />
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback d-flex align-items-center">
                  <AlertCircle size={16} className="me-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-check-input"
                checked={form.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label className="form-check-label">Remember me</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="me-2 spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="mb-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .card {
          border-radius: 1rem;
        }
        .btn {
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;