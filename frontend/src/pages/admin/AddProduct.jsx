import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import Loading from "../../components/Loading";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        const data =
          response.data.data?.categories ||
          response.data.categories ||
          response.data;

        setCategories(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load categories"
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Product name is required.";
    }

    if (!formData.description.trim()) {
      return "Product description is required.";
    }

    if (formData.price === "") {
      return "Product price is required.";
    }

    if (Number(formData.price) < 0) {
      return "Price cannot be negative.";
    }

    if (formData.stock === "") {
      return "Product stock is required.";
    }

    if (Number(formData.stock) < 0) {
      return "Stock cannot be negative.";
    }

    if (!formData.category) {
      return "Please select a category.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        image: formData.image.trim(),
      };

      await api.post("/products", productData);

      setSuccess("Product created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/admin/products");
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategories) {
    return (
      <Loading message="Loading categories..." />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          &larr; Back to Products
        </Link>

        <h1 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          Add Product
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Create a new product for your store.
        </p>
      </div>

        {/* Messages */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Product Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-300 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>

            {/* Price + Stock */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  disabled={loading}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  disabled={loading}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-300 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Enter a publicly accessible image URL.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Link
                to="/admin/products"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 px-5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading
                  ? "Creating Product..."
                  : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}

export default AddProduct;
