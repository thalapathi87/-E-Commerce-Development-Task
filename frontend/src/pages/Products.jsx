import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paginationMeta, setPaginationMeta] = useState(null);

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("all");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [appliedInStock, setAppliedInStock] = useState(false);
  const [appliedSort, setAppliedSort] = useState("newest");

  const [tempSearch, setTempSearch] = useState("");
  const [tempCategory, setTempCategory] = useState("all");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempInStock, setTempInStock] = useState(false);
  const [tempSort, setTempSort] = useState("newest");
  const [priceError, setPriceError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 24;

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
        params.append("page", currentPage);
        params.append("limit", limit);
        params.append("sort", appliedSort);

        if (appliedSearch.trim()) {
          params.append("search", appliedSearch.trim());
        }

        if (appliedCategory !== "all") {
          params.append("category", appliedCategory);
        }

        if (appliedMinPrice !== "") {
          params.append("minPrice", appliedMinPrice);
        }

        if (appliedMaxPrice !== "") {
          params.append("maxPrice", appliedMaxPrice);
        }

        if (appliedInStock) {
          params.append("inStock", "true");
        }

        const response = await api.get(`/products?${params.toString()}`);
        const data = response.data.products || response.data;
        setProducts(Array.isArray(data) ? data : []);
        setPaginationMeta(response.data.pagination || null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [appliedSearch, appliedCategory, appliedMinPrice, appliedMaxPrice, appliedInStock, appliedSort, currentPage]);

  const pagination = useMemo(() => {
    if (paginationMeta) {
      return {
        page: paginationMeta.page || currentPage,
        limit: paginationMeta.limit || limit,
        totalProducts: paginationMeta.totalProducts || 0,
        totalPages: paginationMeta.totalPages || 1,
        hasNextPage: paginationMeta.hasNextPage || false,
        hasPreviousPage: paginationMeta.hasPreviousPage || false,
      };
    }

    const totalProducts = products.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

    return {
      page: currentPage,
      limit,
      totalProducts,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [paginationMeta, products.length, currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = () => {
    if (
      tempMinPrice !== "" &&
      tempMaxPrice !== "" &&
      Number(tempMinPrice) > Number(tempMaxPrice)
    ) {
      setPriceError("Minimum price cannot be greater than maximum price");
      return;
    }

    setPriceError("");
    setAppliedSearch(tempSearch);
    setAppliedCategory(tempCategory);
    setAppliedMinPrice(tempMinPrice);
    setAppliedMaxPrice(tempMaxPrice);
    setAppliedInStock(tempInStock);
    setAppliedSort(tempSort);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setTempSearch("");
    setTempCategory("all");
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempInStock(false);
    setTempSort("newest");
    setPriceError("");

    setAppliedSearch("");
    setAppliedCategory("all");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setAppliedInStock(false);
    setAppliedSort("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    appliedSearch ||
    appliedCategory !== "all" ||
    appliedMinPrice !== "" ||
    appliedMaxPrice !== "" ||
    appliedInStock;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 pb-16">
        <section className="bg-slate-900 px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our Products
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
              Browse our complete collection of quality products.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorMessage
            message={error}
            onRetry={() => {
              setError("");
              setCurrentPage((prev) => prev);
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Header */}
      <section className="bg-slate-900 px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Products
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            Browse our complete collection of quality products at fair prices.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="-mt-12 mb-10 space-y-4 sm:-mt-16">
          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-slate-200/40 border border-slate-200 space-y-4">
            <SearchBar
              value={tempSearch}
              onChange={setTempSearch}
              placeholder="Search products..."
              onClear={() => setTempSearch("")}
            />

            <FilterBar
              categories={categories}
              selectedCategory={tempCategory}
              onCategoryChange={setTempCategory}
              minPrice={tempMinPrice}
              onMinPriceChange={setTempMinPrice}
              maxPrice={tempMaxPrice}
              onMaxPriceChange={setTempMaxPrice}
              inStock={tempInStock}
              onInStockChange={setTempInStock}
              sort={tempSort}
              onSortChange={setTempSort}
            />

            <div className="flex items-center justify-between pt-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Clear Filters
                </button>
              )}

              <div className="flex items-center gap-3">
                {priceError && (
                  <span className="text-sm text-red-600">
                    {priceError}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {appliedCategory !== "all"
              ? categories.find((c) => c._id === appliedCategory)?.name || "Filtered Products"
              : "All Products"}
          </h2>

          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Clear Filters
              </button>
            )}
            <span className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-sm">
              {pagination.totalProducts} Item{pagination.totalProducts !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <ProductGrid loading />
        ) : products.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No products found"
              message="We couldn't find any products matching your exact filters. Try adjusting your search criteria or price range."
              actionLabel="Clear Filters & Try Again"
              onAction={handleClearFilters}
            />
          </div>
        ) : (
          <>
            <ProductGrid products={products} />

            {/* Pagination */}
            <div className="mt-12 flex justify-center border-t border-slate-200 pt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Products;
