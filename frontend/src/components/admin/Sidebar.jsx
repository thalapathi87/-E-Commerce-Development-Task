import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: "📊",
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: "📦",
  },
  {
    label: "Add Product",
    path: "/admin/products/add",
    icon: "➕",
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: "🗂️",
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: "🚚",
  },
];

function Sidebar({ onClose }) {
  return (
    <aside className="flex h-full flex-col border-b border-slate-200 bg-white font-sans">
      <div className="flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">
            Admin Panel
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Store Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:overflow-visible">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin" || item.path === "/admin/products"}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              <span className="text-base">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4">
        <p className="text-xs leading-5 text-slate-400">
          Admin access only
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
