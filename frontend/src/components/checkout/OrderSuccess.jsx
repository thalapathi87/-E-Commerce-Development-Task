import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "bg-emerald-100 text-emerald-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "confirmed":
      return "bg-amber-100 text-amber-700";
    case "pending":
    default:
      return "bg-slate-100 text-slate-700";
  }
};

function OrderSuccess({ order, onContinueShopping }) {
  if (!order) {
    return null;
  }

  const orderId = order._id || "N/A";
  const total = order.totalAmount || 0;
  const paymentMethod = order.paymentMethod || "COD";
  const orderStatus = order.orderStatus || "Pending";
  const paymentStatus = order.paymentStatus || "Pending";

  const paymentLabel =
    paymentMethod === "MOCK_PAYMENT"
      ? "Online Payment (Demo)"
      : "Cash on Delivery";

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8 sm:h-12 sm:w-12" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Order Confirmed
        </p>

        <h1 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
          Order Placed Successfully!
        </h1>

        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Order ID</span>
            <span className="max-w-[60%] truncate font-semibold text-slate-900">
              {orderId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Total</span>
            <span className="font-semibold text-slate-900">{formatCurrency(total)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Payment</span>
            <span className="font-semibold text-slate-900">{paymentLabel}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Payment Status</span>
            <span className="font-semibold text-slate-900">{paymentStatus}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Order Status</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(
                orderStatus
              )}`}
            >
              {orderStatus}
            </span>
          </div>

          {order.createdAt && (
            <div className="flex justify-between">
              <span className="text-slate-500">Date</span>
              <span className="font-semibold text-slate-900">
                {new Date(order.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to={`/orders/${orderId}`}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Order Details
          </Link>

          <Link
            to="/orders"
            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View My Orders
          </Link>

          <button
            type="button"
            onClick={onContinueShopping}
            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
