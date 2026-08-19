import { Link } from "react-router-dom";
import { PackageX } from "lucide-react";

function EmptyState({
  title = "No items found",
  message = "There are no items to display here.",
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400">
        <PackageX className="h-10 w-10" />
      </div>

      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {message}
      </p>

      {(actionLabel && (actionTo || onAction)) && (
        <>
          {actionTo ? (
            <Link
              to={actionTo}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {actionLabel}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default EmptyState;
