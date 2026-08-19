import { Link } from "react-router-dom";
import LogoAbirami from "./LogoAbirami";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <LogoAbirami />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Quality goods at fair prices. Fast shipping and secure checkout.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>

              <Link to="/products" className="transition hover:text-white">
                Products
              </Link>

              <Link to="/cart" className="transition hover:text-white">
                Cart
              </Link>

              <Link to="/orders" className="transition hover:text-white">
                My Orders
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link to="/login" className="transition hover:text-white">
                Login
              </Link>

              <Link to="/register" className="transition hover:text-white">
                Register
              </Link>

              <Link to="/checkout" className="transition hover:text-white">
                Checkout
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <p>thalapathiofficial8@gmail.com</p>
              <p>+91 6369207378</p>
              <p>Chennai, Tamil Nadu</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} Store. All rights reserved.
          </p>

          <p>
            Built with React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
