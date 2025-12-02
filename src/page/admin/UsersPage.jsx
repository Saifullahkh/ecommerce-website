import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEye } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    axios.get("https://fakestoreapi.com/users").then((res) => setUsers(res.data));
  }, []);

  // Filtered users
  const filtered = users.filter(
    (u) =>
      u.name.firstname.toLowerCase().includes(search.toLowerCase()) ||
      u.name.lastname.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3>👤 Users Management</h3>

      {/* Search Bar */}
      <div className="mb-3 d-flex align-items-center">
        <FaSearch className="me-2" />
        <input
          className="form-control w-50"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.name.firstname} {u.name.lastname}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.address.city}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => setSelectedUser(u)}
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>User Details</h5>
                <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedUser.name.firstname} {selectedUser.name.lastname}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>City:</strong> {selectedUser.address.city}</p>
                <p><strong>Street:</strong> {selectedUser.address.street}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
