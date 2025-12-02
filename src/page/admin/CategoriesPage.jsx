import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategories(res.data));
  }, []);

  // Filter categories by search
  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  // Add new category (local only)
  const handleAdd = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  // Delete category (local only)
  const handleDelete = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  // Edit category (local only)
  const handleEdit = () => {
    if (!editingCategory?.value.trim()) return;
    setCategories(
      categories.map((c) =>
        c === editingCategory.old ? editingCategory.value.trim() : c
      )
    );
    setEditingCategory(null);
  };

  return (
    <div>
      <h3>🏷 Categories Management</h3>

      {/* Search */}
      <div className="mb-3 d-flex align-items-center">
        <FaSearch className="me-2" />
        <input
          className="form-control w-50"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add New Category */}
      <div className="mb-3 d-flex">
        <input
          className="form-control me-2"
          placeholder="Enter new category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAdd}>
          <FaPlus /> Add
        </button>
      </div>

      {/* Categories Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cat, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {editingCategory?.old === cat ? (
                  <input
                    className="form-control"
                    value={editingCategory.value}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, value: e.target.value })
                    }
                  />
                ) : (
                  cat
                )}
              </td>
              <td>
                {editingCategory?.old === cat ? (
                  <>
                    <button className="btn btn-sm btn-success me-2" onClick={handleEdit}>
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditingCategory(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditingCategory({ old: cat, value: cat })}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
