import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError("");

        const response = await api.get("/products?limit=8&sort=newest");

        const data =
          response.data.products || response.data;

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.slate.800),_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                <span className="h-px w-6 bg-blue-400" />
                The General Catalog
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Good things,
                <span className="block text-blue-400">
                  kept in stock.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                A shelf of quality goods at fair prices — shipped
                within 48 hours, and exactly what you ordered when
                it arrives.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Shop the shelf
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-blue-400"
                >
                  See what&apos;s new
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              <p className="mt-10 text-xs uppercase tracking-widest text-slate-400">
                Secure checkout &nbsp;&middot;&nbsp; Quality checked &nbsp;&middot;&nbsp; Fast shipping
              </p>
            </div>

            {/* Decorative element - hidden on mobile */}
            <div className="hidden lg:block">
              <div className="relative mx-auto h-80 w-full max-w-md">
                <div className="absolute left-1/2 top-6 h-64 w-px -translate-x-1/2 border-l border-dashed border-slate-700" />

                <div className="absolute left-4 top-2 w-64 -rotate-6 rounded-xl bg-white p-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <span className="text-xs font-bold">01</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Checked by hand</p>
                      <p className="text-xs text-slate-500">Every order, inspected first.</p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-2 top-28 w-64 rotate-3 rounded-xl bg-white p-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <span className="text-xs font-bold">02</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Out the door fast</p>
                      <p className="text-xs text-slate-500">Packed and shipped in 48 hours.</p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-10 top-[13.5rem] w-64 -rotate-2 rounded-xl bg-blue-600 p-5 shadow-2xl text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs font-bold">03</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Locked-down payment</p>
                      <p className="text-xs text-blue-100">Encrypted, every checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            The Fine Print
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Everything&apos;s accounted for
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Three things we don&apos;t compromise on, spelled out plainly.
          </p>

          <dl className="mt-10 divide-y divide-slate-200">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5">
              <dt className="font-semibold text-slate-900">
                Quality, checked
              </dt>
              <span
                aria-hidden="true"
                className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-slate-300 sm:block"
              />
              <dd className="text-sm font-medium text-blue-600">
                Verified
              </dd>
              <p className="basis-full text-sm text-slate-500">
                Every item passes inspection before it ships.
              </p>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5">
              <dt className="font-semibold text-slate-900">
                Delivered in days, not weeks
              </dt>
              <span
                aria-hidden="true"
                className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-slate-300 sm:block"
              />
              <dd className="text-sm font-medium text-blue-600">
                48 HR
              </dd>
              <p className="basis-full text-sm text-slate-500">
                Orders leave the warehouse within two days.
              </p>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5">
              <dt className="font-semibold text-slate-900">
                Payment, locked down
              </dt>
              <span
                aria-hidden="true"
                className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-slate-300 sm:block"
              />
              <dd className="text-sm font-medium text-blue-600">
                Secured
              </dd>
              <p className="basis-full text-sm text-slate-500">
                Encrypted checkout, the same way every time.
              </p>
            </div>
          </dl>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-t-2 border-slate-900 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                From the Shelf
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Featured Products
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                New arrivals, picked this week.
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-blue-600 underline decoration-2 underline-offset-4 transition hover:text-blue-700"
            >
              Browse the full shelf
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </Link>
          </div>

          {error && (
            <div className="mt-8">
              <ErrorMessage message={error} />
            </div>
          )}

          {!error && products.length === 0 && (
            <div className="mt-8">
              <EmptyState
                title="No products available"
                message="Check back soon for new arrivals."
                actionLabel="Browse Products"
                actionTo="/products"
              />
            </div>
          )}

          {!error && products.length > 0 && (
            <div className="mt-10">
              <ProductGrid products={products} loading={loading} />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_theme(colors.slate.800),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Ready to fill your cart?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Everything on the shelf is one checkout away.
          </p>
          <Link
            to="/products"
            className="relative mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Shop the shelf
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
