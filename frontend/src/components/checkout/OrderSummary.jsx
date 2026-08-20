import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

function OrderSummary({ cart, subtotal, shipping, grandTotal, isBuyNow }) {
  return (
    <aside className="space-y-4">
      <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
        Order Summary
      </h3>

      <div className="space-y-2 text-sm text-slate-600">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="min-w-0 truncate">
              {item.name}{" "}
              <span className="text-slate-400">
                &times;{item.quantity}
              </span>
            </span>
            <span className="shrink-0 text-right font-medium text-slate-900">
              {formatCurrency(
                Number(item.price || 0) *
                  Number(item.quantity || 0)
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span className="font-medium text-emerald-600">
            {formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold">
          <span>Total</span>
          <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <div className="text-center">
        {!isBuyNow && (
          <Link
            to="/cart"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Edit Cart
          </Link>
        )}
      </div>
    </aside>
  );
}

export default OrderSummary;
