import { Filter, ChevronDown } from "lucide-react";

function FilterBar({
  categories = [],
  selectedCategory = "all",
  onCategoryChange,
  minPrice = "",
  onMinPriceChange,
  maxPrice = "",
  onMaxPriceChange,
  inStock = false,
  onInStockChange,
  sort = "newest",
  onSortChange,
}) {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A-Z" },
    { value: "name_desc", label: "Name: Z-A" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        
        {/* Category */}
        <div className="w-full lg:w-56">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Category
          </label>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base cursor-pointer"
            >
              <option value="all">All Categories</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-1 gap-3">
          <div className="flex-1">
            <label
              htmlFor="minPrice"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Min Price
            </label>

            <input
              id="minPrice"
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange?.(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="maxPrice"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Max Price
            </label>

            <input
              id="maxPrice"
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange?.(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="w-full lg:w-56">
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="inStock"
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStockChange?.(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <label
            htmlFor="inStock"
            className="cursor-pointer text-sm font-semibold text-slate-700"
          >
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
