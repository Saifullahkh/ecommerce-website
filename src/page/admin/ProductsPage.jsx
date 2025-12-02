import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaSearch, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaStar,
  FaShoppingBag,
  FaFilter,
  FaUpload
} from "react-icons/fa";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        image: preview || newProduct.image || "https://via.placeholder.com/150",
        rating: { rate: 0, count: 0 },
      };

      const res = await axios.post("https://fakestoreapi.com/products", productData);
      setProducts((prev) => [res.data, ...prev]);
      setShowModal(false);
      resetForm();
      alert("✅ Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Error adding product. Please try again.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image,
    });
    setPreview(product.image);
    setShowModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://fakestoreapi.com/products/${editingProduct.id}`,
        {
          ...newProduct,
          price: parseFloat(newProduct.price),
          image: preview || newProduct.image,
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? res.data : p))
      );
      setShowModal(false);
      resetForm();
      setEditingProduct(null);
      alert("✅ Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Error updating product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        alert("✅ Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("❌ Error deleting product. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setPreview(null);
    setImageFile(null);
    setEditingProduct(null);
  };

  const ProductModal = () => (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Product Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct((prev) => ({ ...prev, price: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter short description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    className="form-select"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct((prev) => ({ ...prev, category: e.target.value }))
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Product Image</label>
                  <div className="d-flex align-items-center gap-3">
                    <label
                      className="btn btn-outline-primary d-flex align-items-center gap-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <FaUpload />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="rounded border"
                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer mt-4 border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const RatingStars = ({ rating }) => (
    <div className="d-flex align-items-center justify-content-center">
      <FaStar className="text-warning me-1" />
      <small className="fw-semibold">{rating?.rate || 0}</small>
      <small className="text-muted ms-1">({rating?.count || 0})</small>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h3 fw-bold text-dark mb-1">
              <FaShoppingBag className="me-2 text-primary" />
              Products Management
            </h2>
            <p className="text-muted mb-0">
              Manage your store inventory and product listings
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaFilter className="text-muted" />
            </span>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Product</th>
                    <th>Category</th>
                    <th className="text-end">Price</th>
                    <th className="text-center">Rating</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: "55px",
                              height: "55px",
                              objectFit: "contain",
                            }}
                            className="me-3 rounded"
                          />
                          <div>
                            <div className="fw-semibold">{product.title}</div>
                            <small className="text-muted">
                              {product.description.substring(0, 50)}...
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-capitalize">{product.category}</td>
                      <td className="text-end fw-bold text-success">
                        ${product.price}
                      </td>
                      <td>
                        <RatingStars rating={product.rating} />
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditProduct(product)}
                          >
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && <ProductModal />}
    </div>
  );
};

export default ProductsPage;
