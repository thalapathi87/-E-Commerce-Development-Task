import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Clock,
  Package,
} from "lucide-react";
import api from "../services/api";
import Loading from "../components/Loading";
import formatCurrency from "../utils/formatCurrency";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
];

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

const STATUS_ICONS = {
  0: Clock,
  1: Check,
  2: Package,
  3: Check,
};

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/orders/${id}`);
        const data = response.data.order || response.data;
        setOrder(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loading message="Loading order details..." />
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <span className="text-3xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Order Unavailable
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {error || "Order not found."}
          </p>
          <Link
            to="/orders"
            className="mt-8 inline-block w-full rounded-xl bg-slate-900 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const customer = order.customerInfo || {};
  const address = order.deliveryAddress || {};
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const items = order.items || [];

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const total = order.totalAmount || 0;
  const paymentMethod = order.paymentMethod || "COD";
  const paymentStatus = order.paymentStatus || "Pending";
  const currentStatus = order.orderStatus || "Pending";
  const statusIndex = ORDER_STATUSES.indexOf(currentStatus);

  const paymentLabel =
    paymentMethod === "MOCK_PAYMENT"
      ? "Online Payment (Demo)"
      : "Cash on Delivery";

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-slate-500">
          <Link
            to="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <Link
            to="/orders"
            className="transition hover:text-blue-600"
          >
            Orders
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <span className="truncate text-slate-900">
            Order {order._id}
          </span>
        </nav>

        {/* Order Header */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Order ID
                </p>
                <p className="mt-1 break-all font-semibold text-slate-900">
                  {order._id}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Placed on {orderDate}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                  currentStatus
                )}`}
              >
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="border-b border-slate-200 px-5 py-6 sm:px-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
              Order Status
            </h2>

            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200">
                <div
                  className="h-0.5 bg-blue-600 transition-all"
                  style={{
                    width:
                      statusIndex >= 0
                        ? `${(statusIndex / (ORDER_STATUSES.length - 1)) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {ORDER_STATUSES.map((status, idx) => {
                  const isComplete = idx <= statusIndex;
                  const isCurrent = idx === statusIndex;
                  const Icon = STATUS_ICONS[idx] || Clock;

                  return (
                    <div
                      key={status}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          isComplete
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>

                      <span
                        className={`mt-2 text-center text-xs font-medium ${
                          isCurrent
                            ? "text-blue-600"
                            : isComplete
                            ? "text-blue-600"
                            : "text-slate-500"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Customer + Address */}
          <div className="grid gap-6 border-b border-slate-200 p-5 sm:px-10 lg:grid-cols-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Customer Information
              </h2>
              <div className="mt-3 space-y-1 text-sm">
                <p className="font-semibold text-slate-900">
                  {customer.name || "N/A"}
                </p>
                <p className="text-slate-600">
                  {customer.email || "N/A"}
                </p>
                <p className="text-slate-600">
                  {customer.phone || "N/A"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Delivery Address
              </h2>
              <div className="mt-3 text-sm text-slate-600">
                <p>{address.address || "N/A"}</p>
                <p>
                  {address.city || ""}
                  {address.pincode
                    ? ` - ${address.pincode}`
                    : ""}
                </p>
                <p>{address.state || ""}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-5 sm:px-10">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Order Items
            </h2>

            <div className="mt-4 space-y-4">
              {items.map((item, index) => {
                const price = Number(item.price || 0);
                const quantity = Number(item.quantity || 1);
                const lineTotal = price * quantity;

                return (
                  <div
                    key={item._id || item.product || index}
                    className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Product"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            No Image
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.name || "Product"}
                        </p>
                        <p className="text-sm text-slate-500">
                          Qty: {quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right sm:gap-8">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Unit Price
                        </p>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Subtotal
                        </p>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="border-t border-slate-200 bg-slate-50 p-5 sm:px-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Payment
                </h2>
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <span className="text-slate-500">
                      Payment Method:
                    </span>{" "}
                    <span className="font-semibold text-slate-900">
                      {paymentLabel}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-500">
                      Payment Status:
                    </span>{" "}
                    <span className="font-semibold text-slate-900">
                      {paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-left lg:text-right">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Order Summary
                </h2>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            &larr; Back to Orders
          </Link>
          <Link
            to="/products"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
