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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] focus-within:ring-2 focus-within:ring-slate-900">
      
      {/* Top Floating Badges (Glassmorphism effect) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isOutOfStock ? (
          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 shadow-sm">
            Sold Out
          </span>
        ) : isLowStock ? (
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 shadow-sm">
            Only {stockCount} Left
          </span>
        ) : null}
      </div>

      {/* Product Image Section */}
      <Link
        to={`/products/${_id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-50/50 p-4"
        aria-label={`View details for ${name}`}
      >
        {image && !imgError ? (
          <img
            ref={productImageRef}
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-300">
            <Clock className="mb-2 h-10 w-10 opacity-40" strokeWidth={1.5} />
            <span className="text-xs font-medium text-slate-400">No Image</span>
          </div>
        )}
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-500 group-hover:bg-slate-900/[0.02]" />
      </Link>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col p-5">
        
        <Link to={`/products/${_id}`} className="inline-block outline-none">
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-slate-700">
            {name}
          </h2>
        </Link>

        {description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-500 leading-relaxed">
            {description}
          </p>
        )}

        {/* Pricing & Stock Status */}
        <div className="mb-5 mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 line-through decoration-slate-300">
                {formatCurrency(Number(price) * 1.25)}
              </span>
              <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                20% OFF
              </span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              {formatCurrency(price)}
            </span>
          </div>
          
          {!isOutOfStock && !isLowStock && (
             <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mb-1">
               <CheckCircle2 className="h-3.5 w-3.5" />
               <span>In Stock</span>
             </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={`/products/${_id}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            aria-label="View Details"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="group/btn flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="group/btn flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/10 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <Zap className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;