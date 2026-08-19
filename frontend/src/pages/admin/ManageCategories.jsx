import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setError("");

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
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return categories;
    }

    return categories.filter((category) =>
      category.name
        ?.toLowerCase()
        .includes(value)
    );
  }, [categories, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/categories",
        {
          name: trimmedName,
        }
      );

      const newCategory =
        response.data.category ||
        response.data;

      setCategories((prevCategories) => [
        ...prevCategories,
        newCategory,
      ]);

      setName("");

      setSuccess(
        "Category created successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create category"
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name || "");
    setError("");
    setSuccess("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleEdit = async (categoryId) => {
    const trimmedName = editName.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/categories/${categoryId}`,
        {
          name: trimmedName,
        }
      );

      const updatedCategory =
        response.data.category ||
        response.data;

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? updatedCategory
            : category
        )
      );

      cancelEdit();

      setSuccess(
        "Category updated successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update category"
      );
    } finally {
      setSaving(false);
    }
  };

  const requestDelete = (categoryId) => {
    setDeleteConfirmId(categoryId);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      setError("");
      setSuccess("");

      await api.delete(
        `/categories/${deleteConfirmId}`
      );

      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) =>
            category._id !== deleteConfirmId
        )
      );

      setSuccess(
        "Category deleted successfully."
      );
      setDeleteConfirmId(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete category"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  if (loading) {
    return (
      <Loading message="Loading categories..." />
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Manage Categories
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Create and organize your product categories.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5">
            <ErrorMessage message={error} />
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Add Category */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Add Category
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter category name"
              disabled={saving}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving
                ? "Saving..."
                : "Add Category"}
            </button>
          </form>
        </section>

        {/* Search */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label
            htmlFor="category-search"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Search Categories
          </label>

          <input
            id="category-search"
            type="search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search category..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </section>

        {/* Category List */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">
              Categories
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredCategories.length} categor
              {filteredCategories.length === 1
                ? "y"
                : "ies"}
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <EmptyState
              title="No categories found"
              message="Create a category or change your search."
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredCategories.map(
                (category) => {
                  const isEditing =
                    editingId === category._id;

                  return (
                    <div
                      key={category._id}
                      className="p-5 transition hover:bg-slate-50"
                    >
                      {isEditing ? (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) =>
                              setEditName(
                                e.target.value
                              )
                            }
                            disabled={saving}
                            autoFocus
                            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  category._id
                                )
                              }
                              disabled={saving}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
                            >
                              {saving
                                ? "Saving..."
                                : "Save"}
                            </button>

                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={saving}
                              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {category.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                              ID: {category._id}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                startEdit(
                                  category
                                )
                              }
                              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                requestDelete(
                                  category._id
                                )
                              }
                              disabled={
                                deletingId ===
                                category._id
                              }
                              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                              {deletingId ===
                              category._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete Category
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete this category? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={deletingId === deleteConfirmId}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deletingId === deleteConfirmId}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {deletingId === deleteConfirmId
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageCategories;
