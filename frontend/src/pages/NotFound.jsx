import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
