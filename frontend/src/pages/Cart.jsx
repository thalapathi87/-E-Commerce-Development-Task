import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    syncing,
  } = useCart();

  const subtotal = cartTotal;
  const shipping = 0;
  const grandTotal = subtotal + shipping;

  if (syncing && cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50/50">
        <Loading message="Syncing your cart..." />
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50/50">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
          <EmptyState
            title="Your Cart is Empty"
            message="Looks like you haven't added any elegant timepieces yet."
            actionLabel="Continue Shopping"
            actionTo="/products"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              <ShoppingBag className="h-8 w-8 text-slate-900" strokeWidth={2.5} />
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              You have {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <section className="space-y-5">
            {cart.map((item) => {
              const stock = Number(item.stock || 0);
              const isOutOfStock = stock <= 0;
              const maxQuantity = Math.max(1, stock);
              const itemQuantity = Math.min(item.quantity, maxQuantity);
              const itemTotal = Number(item.price || 0) * itemQuantity;

              return (
                <article
                  key={item._id}
                  className="group flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_2px_20px_rgb(0,0,0,0.03)] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:flex-row sm:p-6"
                >
                  {/* Image */}
                  <Link 
                    to={`/products/${item._id}`}
                    className="relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 sm:h-36 sm:w-36"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-xs font-medium text-slate-400">No Image</span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div className="pr-4">
                        <Link
                          to={`/products/${item._id}`}
                          className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors hover:text-slate-600"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {formatCurrency(item.price)} <span className="text-slate-400">each</span>
                        </p>
                        
                        {isOutOfStock && (
                          <p className="mt-2 inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                            Out of stock
                          </p>
                        )}
                      </div>

                      <p className="text-xl font-black tracking-tight text-slate-900">
                        {formatCurrency(itemTotal)}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      {/* Premium Quantity Selector */}
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, Math.max(1, itemQuantity - 1))}
                          disabled={isOutOfStock}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-50"
                        >
                          &minus;
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-slate-900">
                          {itemQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, Math.min(maxQuantity, itemQuantity + 1))}
                          disabled={isOutOfStock || itemQuantity >= maxQuantity}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="group/remove flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 transition-transform group-hover/remove:scale-110" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Clear Cart Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={clearCart}
                disabled={syncing}
                className="group flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                Clear Cart
              </button>
            </div>
          </section>

          {/* Order Summary Sticky Sidebar */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                    Free
                  </span>
                </div>

                <div className="my-6 h-px w-full bg-slate-100" />

                <div className="flex items-end justify-between">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-black tracking-tight text-slate-900">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Secure checkout with SSL encryption
              </div>
            </div>

            <Link
              to="/products"
              className="mt-4 block w-full rounded-2xl px-5 py-3.5 text-center text-sm font-bold text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;