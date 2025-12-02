import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader, CheckCircle, XCircle, AlertCircle, User, Mail, Lock, Shield } from "lucide-react";

const SignupPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One lowercase letter");
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One special character");
    }

    return { score, feedback };
  };

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "username":
        if (!value.trim()) {
          newErrors.username = "Username is required";
        } else if (value.length < 3) {
          newErrors.username = "Username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = "Username can only contain letters, numbers, and underscores";
        } else {
          delete newErrors.username;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
        
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== form.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setForm(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Real-time validation
    if (name !== "agreeToTerms" && name !== "role") {
      setTimeout(() => validateField(name, newValue), 300);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const userExists = existingUsers.some(user => 
          user.username === form.username || user.email === form.email
        );

        if (userExists) {
          reject(new Error("User with this username or email already exists"));
        } else {
          resolve({ 
            success: true, 
            user: { 
              id: Date.now(), 
              ...form,
              createdAt: new Date().toISOString()
            } 
          });
        }
      }, 2000);
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
        // Save user to localStorage
        const existingUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const newUsers = [...existingUsers, response.user];
        localStorage.setItem("mockUsers", JSON.stringify(newUsers));

        setMessage({
          type: "success",
          text: "Account created successfully! Redirecting to login..."
        });

        setTimeout(() => {
          navigate("/login", { 
            state: { 
              message: "Signup successful! Please login to continue.",
              type: "success"
            }
          });
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Signup failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (score) => {
    if (score <= 2) return "danger";
    if (score <= 3) return "warning";
    return "success";
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center  ">
      <div className="card p-4 shadow-lg border-0" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Create Your Account</h3>
            <p className="text-muted">Join us today and get started</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div 
              className={`alert alert-${message.type === "error" ? "danger" : "success"} d-flex align-items-center mb-3`}
              role="alert"
            >
              {message.type === "error" ? <XCircle size={20} /> : <CheckCircle size={20} />}
              <span className="ms-2">{message.text}</span>
              <button 
                type="button" 
                className="btn-close ms-auto" 
                onClick={clearMessage}
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <User size={18} className="me-2" />
                Username *
              </label>
              <input
                type="text"
                name="username"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                value={form.username}
                onChange={handleChange}
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
              <label className="form-label fw-semibold">
                <Mail size={18} className="me-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="invalid-feedback d-flex align-items-center">
                  <AlertCircle size={16} className="me-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <Lock size={18} className="me-2" />
                Password *
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Password Strength:</small>
                    <small className={`text-${getStrengthColor(passwordStrength.score)}`}>
                      {passwordStrength.score}/5
                    </small>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar bg-${getStrengthColor(passwordStrength.score)}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <small className="text-muted d-block mt-1">
                      Requirements: {passwordStrength.feedback.join(", ")}
                    </small>
                  )}
                </div>
              )}
              
              {errors.password && (
                <div className="invalid-feedback d-flex align-items-center">
                  <AlertCircle size={16} className="me-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <Lock size={18} className="me-2" />
                Confirm Password *
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback d-flex align-items-center">
                  <AlertCircle size={16} className="me-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <Shield size={18} className="me-2" />
                Account Type
              </label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">👤 User Account</option>
                <option value="admin">⚡ Admin Account</option>
              </select>
              <small className="text-muted">
                {form.role === "admin" 
                  ? "Admin accounts have access to dashboard and management features"
                  : "User accounts can browse and purchase products"
                }
              </small>
            </div>

            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className={`form-check-input ${errors.agreeToTerms ? "is-invalid" : ""}`}
                  checked={form.agreeToTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary text-decoration-none">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary text-decoration-none">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeToTerms && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <AlertCircle size={16} className="me-1" />
                    {errors.agreeToTerms}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="me-2 spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-bold text-decoration-none">
                Sign in here
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
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;