import { Link } from "react-router-dom";
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
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loading message="Syncing your cart..." />
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
          <EmptyState
            title="Your Cart is Empty"
            message="You haven't added any products yet."
            actionLabel="Continue Shopping"
            actionTo="/products"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b-2 border-slate-900 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <section className="space-y-4">
            {cart.map((item) => {
              const stock = Number(item.stock || 0);
              const isOutOfStock = stock <= 0;
              const maxQuantity = Math.max(1, stock);
              const itemQuantity = Math.min(item.quantity, maxQuantity);
              const itemTotal = Number(item.price || 0) * itemQuantity;

              return (
                <article
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    {/* Image */}
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-32">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <Link
                            to={`/products/${item._id}`}
                            className="text-base sm:text-lg font-semibold text-slate-900 hover:text-blue-600"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-sm text-slate-500">
                            {formatCurrency(item.price)} each
                          </p>

                          {isOutOfStock && (
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                              Out of stock
                            </p>
                          )}
                        </div>

                        <p className="text-lg font-semibold text-slate-900">
                          {formatCurrency(itemTotal)}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                        {/* Quantity */}
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-300">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.max(1, itemQuantity - 1)
                              )
                            }
                            disabled={isOutOfStock}
                            className="px-4 py-2.5 text-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            &minus;
                          </button>

                          <span className="min-w-12 border-x border-slate-300 px-3 py-2.5 text-center font-semibold text-slate-900">
                            {itemQuantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.min(maxQuantity, itemQuantity + 1)
                              )
                            }
                            disabled={isOutOfStock || itemQuantity >= maxQuantity}
                            className="px-4 py-2.5 text-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Clear Cart */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={clearCart}
                disabled={syncing}
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Cart
              </button>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-center text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>

                <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
                  <span className="text-base font-semibold text-slate-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                Secure checkout
              </p>
            </div>

            <Link
              to="/checkout"
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-3 block w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
