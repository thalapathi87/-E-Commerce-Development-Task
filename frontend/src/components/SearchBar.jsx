import { Search, X } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  placeholder = "Search for clocks...",
  onClear,
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="group relative w-full">
      {/* Animated Search Icon */}
      <Search 
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-slate-900" 
        strokeWidth={2}
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-300 focus:bg-white focus:shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:text-base"
      />

      {/* Clear Button with smooth entry/exit */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-95"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;