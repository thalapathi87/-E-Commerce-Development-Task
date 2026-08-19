import { AlertCircle } from "lucide-react";

function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
  retryLabel = "Retry",
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>

      <p className="text-sm font-semibold text-red-700">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
