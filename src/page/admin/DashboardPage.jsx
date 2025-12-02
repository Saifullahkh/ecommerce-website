import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaEye,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

const DashboardPage = () => {
  const [summary, setSummary] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productsGrowth: 12.5,
    usersGrowth: 8.3,
    ordersGrowth: -2.1,
    revenueGrowth: 15.7
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const [productsRes, usersRes, cartsRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/users"),
          axios.get("https://fakestoreapi.com/carts")
        ]);

        // Fakestore carts API doesn’t include price data per product, so we’ll simulate average revenue
        const totalOrders = cartsRes.data.length;
        const averageOrderValue = 45; // approximate
        const totalRevenue = totalOrders * averageOrderValue;

        setSummary({
          products: productsRes.data.length,
          users: usersRes.data.length,
          orders: totalOrders,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // ✅ Export CSV handler
  const handleExportCSV = () => {
    const csvData = [
      ["Metric", "Value"],
      ["Total Products", summary.products],
      ["Total Users", summary.users],
      ["Total Orders", summary.orders],
      ["Total Revenue ($)", summary.revenue]
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `dashboard_report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, icon, growth, prefix = "", suffix = "" }) => (
    <div className="col-12 col-sm-6 col-xl-3 mb-4">
      <div className="card stat-card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <h6 className="card-subtitle mb-2 text-muted small fw-semibold text-uppercase">
                {title}
              </h6>
              <h3 className="card-title mb-1 fw-bold text-dark">
                {prefix}
                {loading ? "..." : value.toLocaleString()}
                {suffix}
              </h3>
              <div
                className={`d-flex align-items-center small ${
                  growth >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {growth >= 0 ? (
                  <FaArrowUp className="me-1" />
                ) : (
                  <FaArrowDown className="me-1" />
                )}
                <span className="fw-semibold">{Math.abs(growth)}%</span>
                <span className="text-muted ms-1">from last month</span>
              </div>
            </div>
            <div className="stat-icon ms-3">
              <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center">
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-header bg-transparent border-0 py-3">
          <h5 className="card-title mb-0 fw-semibold d-flex align-items-center">
            <FaChartLine className="me-2 text-primary" />
            Recent Activity
          </h5>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            {[
              { action: "New order received", time: "2 min ago", type: "order" },
              { action: "Product stock updated", time: "1 hour ago", type: "product" },
              { action: "New user registered", time: "2 hours ago", type: "user" },
              { action: "Payment processed", time: "4 hours ago", type: "revenue" },
              { action: "Inventory alert", time: "6 hours ago", type: "product" }
            ].map((item, index) => (
              <div key={index} className="list-group-item border-0 px-0 py-3">
                <div className="d-flex align-items-center">
                  <div
                    className={`activity-badge me-3 rounded-circle d-flex align-items-center justify-content-center 
                    ${
                      item.type === "order"
                        ? "bg-warning"
                        : item.type === "product"
                        ? "bg-info"
                        : item.type === "user"
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    {item.type === "order" ? (
                      <FaShoppingCart className="text-white" />
                    ) : item.type === "product" ? (
                      <FaBox className="text-white" />
                    ) : item.type === "user" ? (
                      <FaUsers className="text-white" />
                    ) : (
                      <FaDollarSign className="text-white" />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">{item.action}</h6>
                    <small className="text-muted">{item.time}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary">
                    <FaEye />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickStats = () => (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-header bg-transparent border-0 py-3">
          <h5 className="card-title mb-0 fw-semibold">Quick Stats</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              { label: "Avg. Order Value", value: "$42.50", trend: "up" },
              { label: "Conversion Rate", value: "3.2%", trend: "up" },
              { label: "Customer Satisfaction", value: "94%", trend: "stable" },
              { label: "Return Rate", value: "2.1%", trend: "down" }
            ].map((stat, index) => (
              <div key={index} className="col-6">
                <div className="p-3 bg-light rounded">
                  <h6 className="text-muted small mb-2">{stat.label}</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0 fw-bold">{stat.value}</h5>
                    <span
                      className={`badge ${
                        stat.trend === "up"
                          ? "bg-success"
                          : stat.trend === "down"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {stat.trend === "up"
                        ? "↑"
                        : stat.trend === "down"
                        ? "↓"
                        : "→"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-md-flex justify-content-between align-items-center">
            <div>
              <h2 className="h3 fw-bold text-dark mb-1">Dashboard Overview</h2>
              <p className="text-muted mb-0">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="d-flex gap-2 mt-0 mt-md-4">
              {/* ✅ CSV Export Button */}
              <button className="btn btn-outline-primary" onClick={handleExportCSV}>
                Export Report
              </button>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <StatCard
          title="Total Products"
          value={summary.products}
          icon={<FaBox className="text-primary fs-5" />}
          growth={stats.productsGrowth}
        />
        <StatCard
          title="Total Users"
          value={summary.users}
          icon={<FaUsers className="text-success fs-5" />}
          growth={stats.usersGrowth}
        />
        <StatCard
          title="Total Orders"
          value={summary.orders}
          icon={<FaShoppingCart className="text-warning fs-5" />}
          growth={stats.ordersGrowth}
        />
        <StatCard
          title="Total Revenue"
          value={summary.revenue}
          icon={<FaDollarSign className="text-info fs-5" />}
          growth={stats.revenueGrowth}
          prefix="$"
        />
      </div>

      {/* Charts and Additional Sections */}
      <div className="row mt-4">
        <RecentActivity />
        <QuickStats />
      </div>
    </div>
  );
};

export default DashboardPage;
