import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEye } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders on mount
  useEffect(() => {
    axios.get("https://fakestoreapi.com/carts").then((res) => setOrders(res.data));
  }, []);

  // Filter by ID or userId
  const filtered = orders.filter(
    (o) =>
      o.id.toString().includes(search) ||
      o.userId.toString().includes(search)
  );

  return (
    <div>
      <h3>📦 Orders Management</h3>

      {/* Search Bar */}
      <div className="mb-3 d-flex align-items-center">
        <FaSearch className="me-2" />
        <input
          className="form-control w-50"
          placeholder="Search by Order ID or User ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Total Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{o.id}</td>
              <td>{o.userId}</td>
              <td>{new Date(o.date).toLocaleDateString()}</td>
              <td>{o.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => setSelectedOrder(o)}
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Order #{selectedOrder.id} Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>User ID:</strong> {selectedOrder.userId}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>

                <h6>Products:</h6>
                <ul>
                  {selectedOrder.products.map((p, idx) => (
                    <li key={idx}>
                      Product ID: {p.productId}, Quantity: {p.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
