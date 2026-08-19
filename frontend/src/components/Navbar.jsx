import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  LogOut, 
  Home, 
  Clock, 
  Package, 
  LayoutDashboard 
} from "lucide-react"; 
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useAddToCartAnimation } from "./AddToCartAnimation";

// Custom Abiz Timecraft Logo Component
function LogoAbiz() {
  return (
    <div className="flex items-center gap-3">
      {/* Abstract A + Z Mark */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40">
        <svg 
          viewBox="0 0 40 40" 
          className="h-6 w-6" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* The Outer 'A' Structure */}
          <path d="M 9 32 L 20 7 L 31 32" />
          {/* The Inner 'Z' (acting as the crossbar of A and representing time gears) */}
          <path d="M 14 18 L 26 18 L 16 26 L 28 26" />
        </svg>
      </div>
      
      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center">
        <span className="text-[22px] leading-none font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          Abiz
        </span>
        <span className="mt-[2px] text-[10px] leading-none font-bold uppercase tracking-[0.25em] text-slate-500">
          Timecraft
        </span>
      </div>
    </div>
  );
}

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { registerCartIcon } = useAddToCartAnimation(null);

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login", { replace: true });
  };

  // Clean, simple desktop link classes
  const navLinkClass = ({ isActive }) =>
    [
      "px-3 py-2 text-sm font-semibold transition-colors duration-200",
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600",
    ].join(" ");

  // Clean mobile link classes
  const mobileLinkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        scrolled
          ? "border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm"
          : "border-transparent bg-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Section */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            aria-label="Home"
          >
            <LogoAbiz />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              Collections
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/orders" className={navLinkClass}>
                My Orders
              </NavLink>
            )}

            {user?.role === "admin" && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            {/* Cart Icon */}
            <Link
              to="/cart"
              ref={(el) => {
                if (el) registerCartIcon(0, el);
              }}
              className="relative p-2 text-slate-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-slate-200"></div> {/* Divider */}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-700">
                  Hi, {user?.name?.split(' ')[0] || "User"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions (Cart & Hamburger) */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              ref={(el) => {
                if (el) registerCartIcon(1, el);
              }}
              className="relative p-2 text-slate-600"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={[
          "absolute inset-x-0 top-20 border-b border-slate-200 bg-white transition-all duration-300 ease-in-out md:hidden shadow-xl",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible h-0 overflow-hidden",
        ].join(" ")}
      >
        <div className="px-4 py-6">
          <nav className="flex flex-col gap-2">
            <NavLink to="/" end onClick={closeMobileMenu} className={mobileLinkClass}>
              <Home className="h-5 w-5" />
              Home
            </NavLink>

            <NavLink to="/products" onClick={closeMobileMenu} className={mobileLinkClass}>
              <Clock className="h-5 w-5" />
              Collections
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/orders" onClick={closeMobileMenu} className={mobileLinkClass}>
                <Package className="h-5 w-5" />
                My Orders
              </NavLink>
            )}

            {user?.role === "admin" && (
              <NavLink to="/admin" onClick={closeMobileMenu} className={mobileLinkClass}>
                <LayoutDashboard className="h-5 w-5" />
                Admin Dashboard
              </NavLink>
            )}
          </nav>

          <div className="mt-6 border-t border-slate-100 pt-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role || "user"}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;