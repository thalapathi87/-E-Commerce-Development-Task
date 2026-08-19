import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
      {/* Previous */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Page Info */}
      <span className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

export default Pagination;
