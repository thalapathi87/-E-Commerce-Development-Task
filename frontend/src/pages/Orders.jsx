import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import formatCurrency from "../utils/formatCurrency";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setError("");
        const response = await api.get("/orders/my-orders");
        const data = response.data.orders || response.data;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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

  const getItemCount = (order) =>
    order.items?.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    ) || 0;

  if (loading) {
    return <Loading message="Loading your orders..." />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your recent orders and delivery status.
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {!error && orders.length === 0 && (
          <EmptyState
            title="No Orders Yet"
            message="Your completed orders will appear here."
            actionLabel="Start Shopping"
            actionTo="/products"
          />
        )}

        {!error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const itemCount = getItemCount(order);

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Order ID
                        </p>
                        <p className="break-all font-semibold text-slate-900">
                          {order._id}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : ""}
                        </span>

                        <span>&middot;</span>

                        <span>
                          {itemCount}{" "}
                          item{itemCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:mt-0">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus || "Pending"}
                      </span>

                      <Link
                        to={`/orders/${order._id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="border-b border-slate-200 bg-white p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Order Total
                        </p>
                        <p className="mt-1 text-2xl font-bold text-blue-600">
                          {formatCurrency(order.totalAmount || 0)}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Payment
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {order.paymentMethod === "MOCK_PAYMENT"
                            ? "Online Payment (Demo)"
                            : "Cash on Delivery"}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
