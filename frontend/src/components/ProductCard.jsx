import { memo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye, Clock } from "lucide-react";
import useCart from "../hooks/useCart";
import { useAddToCartAnimation } from "./AddToCartAnimation";
import formatCurrency from "../utils/formatCurrency";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const { triggerAddToCartAnimation } = useAddToCartAnimation();
  const productImageRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  const { _id, name, description, price, image, stock } = product;
  
  const stockCount = Number(stock);
  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product);
      triggerAddToCartAnimation(product, productImageRef.current);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-600">
      
      {/* Smart Badges */}
      {isOutOfStock ? (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 shadow-sm">
          Sold Out
        </span>
      ) : isLowStock ? (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
          Only {stockCount} Left
        </span>
      ) : null}

      {/* Product Image */}
      <Link
        to={`/products/${_id}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-50"
        aria-label={`View details for ${name}`}
      >
        {image && !imgError ? (
          <img
            ref={productImageRef}
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-300">
            <Clock className="mb-1 h-8 w-8 opacity-50" strokeWidth={1.5} />
            <span className="text-[10px] font-medium text-slate-400">Image Unavailable</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${_id}`} className="inline-block outline-none">
          <h2 className="line-clamp-1 text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
            {name}
          </h2>
        </Link>

        {description && (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
            {description}
          </p>
        )}

        {/* Price & Status */}
        <div className="mb-3 mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400 line-through">
              {formatCurrency(Number(price) * 1.25)}
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {formatCurrency(price)}
            </span>
          </div>
          
          {!isOutOfStock && !isLowStock && (
             <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
               In Stock
             </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/products/${_id}`}
            className="flex items-center justify-center rounded-xl bg-slate-100 p-3 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
            aria-label="View Details"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
          >
            <ShoppingBag className="h-4 w-4" />
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
