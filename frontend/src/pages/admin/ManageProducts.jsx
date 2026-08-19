import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import formatCurrency from "../../utils/formatCurrency";

function ManageProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");
        const data = response.data.data?.categories || response.data.categories || response.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        params.append("limit", "50");
        params.append("sort", "newest");

        if (search.trim()) {
          params.append("search", search.trim());
        }

        if (category !== "all") {
          params.append("category", category);
        }

        const response = await api.get(`/products?${params.toString()}`);
        const data = response.data.products || response.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [search, category]);

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

  const confirmDelete = (productId) => {
    setDeleteId(productId);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleDelete = async (productId) => {
    try {
      setDeleting(true);
      setError("");

      await api.delete(`/products/${productId}`);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      setDeleteId(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setDeleting(false);
    }
  };

  const getStockBadge = (stock) => {
    const count = Number(stock || 0);

    if (count === 0) {
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Out of Stock
        </span>
      );
    }

    if (count <= 5) {
      return (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Low Stock ({count})
        </span>
      );
    }

    return (
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        In Stock ({count})
      </span>
    );
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Admin Panel
            </p>

            <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Manage Products
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Manage your store products and inventory.
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Add Product
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Filters */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search Products
            </label>

            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              message="Try another search or add a new product."
              actionLabel="Add Product"
              actionTo="/admin/products/add"
            />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Product
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Category
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Price
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((product) => {
                      const productCategory =
                        typeof product.category === "object"
                          ? product.category?.name
                          : product.category || "Uncategorized";

                      return (
                        <tr
                          key={product._id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "/placeholder.png";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-900">
                                  {product.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  ID: {product._id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {productCategory}
                          </td>

                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {formatCurrency(product.price || 0)}
                          </td>

                          <td className="px-6 py-4">
                            {getStockBadge(product.stock)}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/admin/products/edit/${product._id}`
                                  )
                                }
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  confirmDelete(product._id)
                                }
                                disabled={deleting}
                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                              >
                                {deleteId === product._id
                                  ? "Confirm?"
                                  : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-slate-200 md:hidden">
                {filteredProducts.map((product) => {
                  const productCategory =
                    typeof product.category === "object"
                      ? product.category?.name
                      : product.category || "Uncategorized";

                  return (
                    <div
                      key={product._id}
                      className="p-4"
                    >
                      <div className="flex gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.png";
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-slate-400">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {productCategory}
                          </p>
                          <p className="mt-1 font-bold text-blue-600">
                            {formatCurrency(product.price || 0)}
                          </p>
                          <div className="mt-2">
                            {getStockBadge(product.stock)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/products/edit/${product._id}`
                            )
                          }
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                        >
                          Edit
                        </button>

                          <button
                            type="button"
                            onClick={() =>
                              confirmDelete(product._id)
                            }
                            disabled={deleting}
                          className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
                        >
                          {deleteId === product._id
                            ? "Confirm?"
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">
                Delete Product
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default ManageProducts;
