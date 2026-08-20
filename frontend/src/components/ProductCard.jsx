import { memo, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Eye, Clock, CheckCircle2, Zap } from "lucide-react";
import useCart from "../hooks/useCart";
import { useAddToCartAnimation } from "./AddToCartAnimation";
import formatCurrency from "../utils/formatCurrency";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const { triggerAddToCartAnimation } = useAddToCartAnimation();
  const navigate = useNavigate();
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

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      navigate("/checkout", {
        state: {
          buyNowProduct: {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
          },
        },
      });
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-gray-900">
      
      {/* Image Container */}
      <div className="relative block aspect-square w-full overflow-hidden bg-gray-50/50 p-5">
        
        {/* Floating Stock Badges - Top Left */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {isOutOfStock ? (
            <span className="inline-flex items-center rounded bg-red-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center rounded bg-orange-500/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
              Only {stockCount} Left
            </span>
          ) : null}
        </div>

        {/* Floating View Details Action - Top Right */}
        <Link
          to={`/products/${_id}`}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition-all duration-300 hover:bg-gray-900 hover:text-white sm:h-9 sm:w-9"
          aria-label="View Details"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </Link>

        {/* Product Image Link */}
        <Link
          to={`/products/${_id}`}
          className="flex h-full w-full items-center justify-center"
        >
          {image && !imgError ? (
            <img
              ref={productImageRef}
              src={image}
              alt={name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-300">
              <Clock className="mb-2 h-8 w-8 opacity-40" strokeWidth={1.5} />
              <span className="text-xs font-medium text-gray-400">No Image</span>
            </div>
          )}
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        
        {/* Title & Description */}
        <Link to={`/products/${_id}`} className="inline-block outline-none">
          <h2 className="line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
            {name}
          </h2>
        </Link>

        {description && (
          <p className="mt-1 line-clamp-2 text-xs text-gray-500 leading-relaxed sm:text-sm">
            {description}
          </p>
        )}

        {/* Pricing Area */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(price)}
              </span>
              <span className="text-xs font-medium text-gray-400 line-through">
                {formatCurrency(Number(price) * 1.25)}
              </span>
            </div>
            <span className="mt-0.5 text-[10px] font-bold text-emerald-600">
              20% OFF
            </span>
          </div>

          {!isOutOfStock && !isLowStock && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <CheckCircle2 className="h-3 w-3" />
              <span>In Stock</span>
            </div>
          )}
        </div>

        {/* Action Buttons (2-Column Grid for Mobile Responsiveness) */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="group/btn flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-[13px] font-semibold text-gray-900 transition-colors hover:bg-gray-50 active:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
          >
            <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            <span className="truncate">Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-gray-900/10 transition-colors hover:bg-gray-800 active:bg-black disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
          >
            <Zap className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;