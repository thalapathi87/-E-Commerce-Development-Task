import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  ShoppingCart,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import api from "../services/api";
import Loading from "../components/Loading";
import useCart from "../hooks/useCart";
import { useAddToCartAnimation } from "../components/AddToCartAnimation";
import formatCurrency from "../utils/formatCurrency";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { triggerAddToCartAnimation } = useAddToCartAnimation();
  const productImageRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/products/${id}`);
        const data = response.data.product || response.data;
        setProduct(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = Number(value);
    const stock = Number(product?.stock || 0);

    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }
    if (newQuantity > stock) {
      setQuantity(stock);
      return;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product || Number(product.stock) <= 0) {
      return;
    }

    setAdding(true);
    setSuccess("");
    setError("");

    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }

    triggerAddToCartAnimation(product, productImageRef.current);

    setAdding(false);
    setSuccess("Added to your cart elegantly.");
  };

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50/50 px-4">
        <Loading message="Loading timepiece details..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50/50 px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <span className="text-3xl font-black">!</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Product Unavailable
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">{error}</p>
          <Link
            to="/products"
            className="mt-8 inline-block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50/50 px-4 py-16">
        <div className="text-center">
          <Clock className="mx-auto mb-5 h-16 w-16 text-slate-300" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Timepiece not found
          </h1>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
          >
            &larr; Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const stock = Number(product.stock || 0);
  const price = Number(product.price || 0);
  const isOutOfStock = stock <= 0;
  const totalPrice = price * quantity;

  const category =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Premium Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm font-medium text-slate-400">
          <Link to="/" className="transition-colors hover:text-slate-900">Home</Link>
          <ChevronRight className="mx-2.5 h-4 w-4 shrink-0 text-slate-300" strokeWidth={2.5} />
          <Link to="/products" className="transition-colors hover:text-slate-900">
            {category || "Collection"}
          </Link>
          <ChevronRight className="mx-2.5 h-4 w-4 shrink-0 text-slate-300" strokeWidth={2.5} />
          <span className="truncate text-slate-900">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100">
          <div className="grid lg:grid-cols-2">
            
            {/* Image Gallery Side */}
            <div className="group relative flex min-h-[350px] items-center justify-center bg-slate-50/80 p-8 sm:min-h-[450px] lg:min-h-[650px]">
               {product.image && !imgError ? (
                <img
                  ref={productImageRef}
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  className="max-h-[350px] w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 sm:max-h-[450px] lg:max-h-[550px]"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-300">
                  <Clock className="mb-4 h-20 w-20 opacity-40" strokeWidth={1} />
                  <span className="text-sm font-medium">No Image Available</span>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              
              {category && (
                <span className="mb-5 w-fit rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {category}
                </span>
              )}

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                {product.name}
              </h1>

              {/* Price Area */}
              <div className="mt-6 flex items-end gap-3 sm:mt-8">
                <p className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  {formatCurrency(price)}
                </p>
                <p className="mb-1 text-base font-semibold text-slate-400 line-through decoration-slate-300 sm:mb-1.5 sm:text-lg">
                  {formatCurrency(price * 1.25)}
                </p>
                <span className="mb-1.5 ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 sm:mb-2">
                  20% OFF
                </span>
              </div>

              {product.description && (
                <p className="mt-6 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {product.description}
                </p>
              )}

              {/* Trust Badges */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-y border-slate-100 py-6">
                <div className="flex items-center gap-3.5 text-sm font-bold text-slate-700">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 ring-1 ring-slate-100">
                    <ShieldCheck className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <span>1 Year<br/><span className="text-slate-400 font-medium">Warranty</span></span>
                </div>
                <div className="flex items-center gap-3.5 text-sm font-bold text-slate-700">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 ring-1 ring-slate-100">
                    <Truck className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <span>Secure<br/><span className="text-slate-400 font-medium">Delivery</span></span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mt-8 flex items-center gap-2.5">
                <div className={`h-2.5 w-2.5 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${isOutOfStock ? "text-red-600" : "text-emerald-600"}`}>
                  {isOutOfStock ? "Currently Out of Stock" : `In Stock — ${stock} available`}
                </span>
              </div>

              {!isOutOfStock && (
                <>
                  <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
                    {/* Quantity */}
                    <div>
                      <label htmlFor="quantity" className="mb-3 block text-sm font-bold text-slate-900">
                        Quantity
                      </label>
                      <div className="flex h-12 w-36 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="flex h-full w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm"
                        >
                          &minus;
                        </button>
                        <input
                          id="quantity"
                          type="number"
                          min="1"
                          max={stock}
                          value={quantity}
                          onChange={(e) => handleQuantityChange(e.target.value)}
                          className="h-full w-full bg-transparent text-center font-bold text-slate-900 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="flex h-full w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total Price (Only show if quantity > 1) */}
                    {quantity > 1 && (
                      <div className="flex flex-col">
                        <span className="mb-2 text-sm font-bold text-slate-400">Total</span>
                        <span className="text-2xl font-black text-slate-900">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Success Alert */}
                  {success && (
                    <div className="mt-6 flex animate-[fadeIn_0.3s_ease-out] items-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      {success}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="group flex h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-8 text-sm font-bold text-white shadow-[0_8px_20px_rgb(0,0,0,0.08)] transition-all hover:bg-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] active:scale-[0.98] disabled:pointer-events-none disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                      <ShoppingCart className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
                      <span>{adding ? "Adding..." : "Add to Cart"}</span>
                    </button>

                    <Link
                      to="/cart"
                      className="group flex h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-slate-50 px-8 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-100 active:scale-[0.98]"
                    >
                      <span>Go to Cart</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </Link>
                  </div>
                </>
              )}

              {isOutOfStock && (
                <Link
                  to="/products"
                  className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl border-2 border-slate-100 bg-white px-8 text-sm font-bold text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
                >
                  Explore Other Masterpieces
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;