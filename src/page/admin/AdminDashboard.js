import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaTags, FaThLarge, FaSignOutAlt, FaBars, FaChevronDown, FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../App.css"

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set active menu based on current route
    const path = location.pathname;
    if (path.includes("products")) setActiveMenu("products");
    else if (path.includes("users")) setActiveMenu("users");
    else if (path.includes("orders")) setActiveMenu("orders");
    else if (path.includes("categories")) setActiveMenu("categories");
    else setActiveMenu("dashboard");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaThLarge />, path: "/admin/" },
    { key: "products", label: "Products", icon: <FaBox />, path: "/admin/products" },
    { key: "users", label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { key: "orders", label: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { key: "categories", label: "Categories", icon: <FaTags />, path: "/admin/categories" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h2 className="page-title">
            Online Store
          </h2>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <FaBell />
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <div className="user-avatar">
              <FaUserCircle />
            </div>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
            <FaChevronDown className="dropdown-arrow" />
          </div>
        </div>
      </header>

      <div className="dashboard-content  overflow-hidden" style={{height: '88vh'}}>
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
          
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              {menuItems.map((item) => (
                <li key={item.key} className="nav-item">
                  <button 
                    className={`nav-link ${activeMenu === item.key ? "active" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {sidebarOpen && <span className="nav-label">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">
                <FaSignOutAlt />
              </span>
              {sidebarOpen && <span className="logout-text">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="main-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;