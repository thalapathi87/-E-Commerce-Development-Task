import ProductCard from "./ProductCard";

function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      // Mobile-ல் gap-3, பெரிய ஸ்கிரீன்களில் gap-5 & 6
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            {/* Image Skeleton - Card-ன் அளவிற்கே (aspect-[4/3]) மாற்றப்பட்டுள்ளது */}
            <div className="aspect-[4/3] w-full animate-pulse bg-slate-100/80" />
            
            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-3 sm:p-5">
              <div className="mb-2 h-5 w-3/4 animate-pulse rounded-md bg-slate-100" />
              <div className="h-3 w-full animate-pulse rounded-md bg-slate-100" />
              <div className="mt-1.5 h-3 w-2/3 animate-pulse rounded-md bg-slate-100" />
              
              <div className="mb-4 mt-auto pt-4 flex flex-col gap-1.5">
                <div className="h-3 w-1/4 animate-pulse rounded-md bg-slate-100" />
                <div className="h-6 w-1/3 animate-pulse rounded-md bg-slate-100" />
              </div>
              
              <div className="mt-2 flex gap-2 sm:gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-9 sm:h-11 flex-1 animate-pulse rounded-xl bg-slate-100" />
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
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;