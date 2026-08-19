import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  ShoppingCart,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
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
          err.response?.data?.message || "Failed to load product"
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
    setSuccess("Product added to cart successfully.");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Loading message="Loading product details..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <span className="text-3xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Product Unavailable
          </h1>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          <Link
            to="/products"
            className="mt-8 inline-block w-full rounded-xl bg-slate-900 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
        <div className="text-center">
          <Clock className="mx-auto mb-4 h-16 w-16 text-slate-300" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-slate-900">
            Product not found
          </h1>
          <Link
            to="/products"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
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
    <main className="min-h-screen bg-slate-50 pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-slate-500">
          <Link to="/" className="transition hover:text-blue-600">Home</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <Link to="/products" className="transition hover:text-blue-600">
            {category || "Products"}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <span className="truncate text-slate-900">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Image Gallery Side */}
            <div className="group relative flex min-h-[300px] items-center justify-center bg-slate-50 p-6 sm:min-h-[400px] lg:min-h-[600px] lg:border-r lg:border-slate-200">
               {product.image && !imgError ? (
                <img
                  ref={productImageRef}
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  className="max-h-[400px] w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105 sm:max-h-[500px]"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Clock className="mb-4 h-16 w-16 opacity-30" strokeWidth={1.5} />
                  <span className="text-sm">No Image Available</span>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              {category && (
                <span className="mb-4 w-fit rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-700">
                  {category}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="relative mt-6 inline-flex w-fit items-end gap-3 rounded-xl bg-slate-900 px-5 py-3 sm:px-6 sm:py-4">
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                  {formatCurrency(price)}
                </p>
                <p className="mb-0.5 text-sm sm:text-base text-slate-400 line-through">
                  {formatCurrency(price * 1.25)}
                </p>
              </div>

              {product.description && (
                <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {product.description}
                </p>
              )}

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-3 border-y border-slate-200 py-6 sm:gap-4">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  1 Year Warranty
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                    <Truck className="h-5 w-5" />
                  </div>
                  Secure Delivery
                </div>
              </div>

              {/* Stock Status */}
              <div className="mt-6 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-emerald-600 animate-pulse"}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${isOutOfStock ? "text-red-600" : "text-emerald-700"}`}>
                  {isOutOfStock ? "Currently Out of Stock" : `In Stock — ${stock} available`}
                </span>
              </div>

              {!isOutOfStock && (
                <>
                  {/* Quantity */}
                  <div className="mt-6">
                    <label htmlFor="quantity" className="mb-3 block text-sm font-semibold text-slate-900">
                      Quantity
                    </label>
                    <div className="flex h-12 w-32 items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
                        className="h-full w-12 border-x border-slate-200 text-center font-semibold text-slate-900 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-50 p-4 sm:p-5 ring-1 ring-slate-200">
                    <span className="text-sm font-semibold text-slate-600">Total Price</span>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  {/* Success Alert */}
                  {success && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      {success}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:pointer-events-none disabled:bg-slate-300"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {adding ? "Adding to Cart..." : "Add to Cart"}
                    </button>

                    <Link
                      to="/cart"
                      className="flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                      Go to Cart
                    </Link>
                  </div>
                </>
              )}

              {isOutOfStock && (
                <Link
                  to="/products"
                  className="mt-8 flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore Other Products
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
