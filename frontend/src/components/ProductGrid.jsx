import ProductCard from "./ProductCard";

function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          >
            <div className="aspect-square w-full bg-slate-200" />
            <div className="p-4">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />
              <div className="mt-4 flex gap-2">
                <div className="h-10 w-10 rounded-xl bg-slate-200" />
                <div className="h-10 flex-1 rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
