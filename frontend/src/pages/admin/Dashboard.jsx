import { useEffect, useState } from "react";
import {
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  IndianRupee,
  Clock,
  CheckCircle2,
  Truck,
  ShieldCheck,
} from "lucide-react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import formatCurrency from "../../utils/formatCurrency";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, productsResponse] = await Promise.all([
          api.get("/admin/dashboard/stats"),
          api.get("/products?limit=50&sort=newest"),
        ]);

        const statsData = statsResponse.data.stats || statsResponse.data;
        setStats(statsData);
        setRecentOrders(statsData.recentOrders || []);

        const products = productsResponse.data.products || productsResponse.data;
        const lowStock = Array.isArray(products)
          ? products.filter((p) => Number(p.stock || 0) <= 5)
          : [];
        setLowStockProducts(lowStock.slice(0, 5));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div>
        <Sidebar />
        <main className="lg:ml-64">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <ErrorMessage message={error} />
          </div>
        </main>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: "blue",
    },
    {
      label: "Total Categories",
      value: stats?.totalCategories ?? 0,
      icon: FolderTree,
      color: "purple",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
      color: "emerald",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "amber",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: IndianRupee,
      color: "slate",
    },
  ];

  const orderStats = [
    {
      label: "Pending",
      value: stats?.pendingOrders ?? 0,
      icon: Clock,
      color: "slate",
    },
    {
      label: "Confirmed",
      value: stats?.confirmedOrders ?? 0,
      icon: CheckCircle2,
      color: "amber",
    },
    {
      label: "Shipped",
      value: stats?.shippedOrders ?? 0,
      icon: Truck,
      color: "blue",
    },
    {
      label: "Delivered",
      value: stats?.deliveredOrders ?? 0,
      icon: ShieldCheck,
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Welcome back! Here is what is happening with your store.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClasses[card.color]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500">
                        {card.label}
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Status */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderStats.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClasses[card.color]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500">
                        {card.label}
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Orders + Low Stock */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Recent Orders */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Orders
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {recentOrders.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No orders yet.
                  </div>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="px-5 py-4 sm:px-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {order._id}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.customerInfo?.name || "Customer"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">
                            {formatCurrency(order.totalAmount || 0)}
                          </p>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                              order.orderStatus === "Delivered"
                                ? "bg-emerald-100 text-emerald-700"
                                : order.orderStatus === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.orderStatus === "Confirmed"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {order.orderStatus || "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Low Stock Products
                </h2>
                <p className="text-xs text-slate-500">
                  Products with 5 or fewer items
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {lowStockProducts.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    All products are well stocked.
                  </div>
                ) : (
                  lowStockProducts.map((product) => (
                    <div
                      key={product._id}
                      className="px-5 py-4 sm:px-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                            Number(product.stock) === 0
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {product.stock} left
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
  );
}

export default Dashboard;
