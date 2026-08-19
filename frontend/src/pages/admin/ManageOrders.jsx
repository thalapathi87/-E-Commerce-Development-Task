import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import formatCurrency from "../../utils/formatCurrency";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
];

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setError("");

        const response = await api.get("/admin/orders");

        const data =
          response.data.orders || response.data;

        setOrders(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load orders"
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

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      const updatedOrder =
        response.data.order || response.data;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                ...updatedOrder,
                orderStatus: newStatus,
              }
            : order
        )
      );

      setSuccess(
        "Order status updated successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <Loading message="Loading orders..." />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Manage Orders
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            View customer orders and manage delivery status.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5">
            <ErrorMessage message={error} />
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Empty */}
        {orders.length === 0 ? (
          <EmptyState
            title="No Orders Found"
            message="Customer orders will appear here."
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const customer =
                order.customerInfo || {};

              const address =
                order.deliveryAddress || {};

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Order Header */}
                  <div className="border-b border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Order ID
                        </p>

                        <p className="mt-1 break-all font-bold text-slate-900">
                          {order._id}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "Pending"}
                        </span>

                        <select
                          value={
                            order.orderStatus ||
                            "Pending"
                          }
                          disabled={
                            updatingId === order._id
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                        >
                          {ORDER_STATUSES.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status
                                  .charAt(0)
                                  .toUpperCase() +
                                  status.slice(1)}
                              </option>
                            )
                          )}
                        </select>

                        {updatingId ===
                          order._id && (
                          <span className="text-xs text-slate-500">
                            Updating...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer + Address */}
                  <div className="grid gap-6 border-b border-slate-200 p-5 lg:grid-cols-2">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                        Customer
                      </h2>

                      <div className="mt-3 space-y-1 text-sm">
                        <p className="font-semibold text-slate-900">
                          {customer.name ||
                            "N/A"}
                        </p>

                        <p className="text-slate-600">
                          {customer.email ||
                            "N/A"}
                        </p>

                        <p className="text-slate-600">
                          {customer.phone ||
                            "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                        Delivery Address
                      </h2>

                      <div className="mt-3 text-sm text-slate-600">
                        <p>
                          {address.address ||
                            "N/A"}
                        </p>

                        <p>
                          {address.city || ""}
                          {address.pincode
                            ? ` - ${address.pincode}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                      Order Items
                    </h2>

                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[640px] text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                            <th className="pb-3">
                              Product
                            </th>

                            <th className="pb-3">
                              Price
                            </th>

                            <th className="pb-3">
                              Quantity
                            </th>

                            <th className="pb-3 text-right">
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {order.items?.map(
                            (item, index) => {
                              const quantity =
                                Number(
                                  item.quantity || 1
                                );

                              const price =
                                Number(
                                  item.price || 0
                                );

                              return (
                                <tr
                                  key={
                                    item._id ||
                                    item.productId ||
                                    index
                                  }
                                >
                                  <td className="py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                        {item.image ? (
                                          <img
                                            src={
                                              item.image
                                            }
                                            alt={
                                              item.name ||
                                              "Product"
                                            }
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                            No Image
                                          </div>
                                        )}
                                      </div>

                                      <span className="font-medium text-slate-900">
                                        {item.name ||
                                          "Product"}
                                      </span>
                                    </div>
                                  </td>

                                  <td className="py-4 text-sm text-slate-600">
                                    {formatCurrency(price)}
                                  </td>

                                  <td className="py-4 text-sm text-slate-600">
                                    {quantity}
                                  </td>

                                  <td className="py-4 text-right font-semibold text-slate-900">
                                    {formatCurrency(
                                      price * quantity
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      {order.items?.length || 0} product
                      {(order.items?.length || 0) !==
                       1
                        ? "s"
                        : ""}
                    </p>

                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Order Total
                      </p>

                      <p className="mt-1 text-2xl font-bold text-blue-600">
                        {formatCurrency(
                          Number(
                            order.totalAmount || 0
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
  );
}

export default ManageOrders;
