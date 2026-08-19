function Loading({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-5">
        
        {/* Premium Spinner */}
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Background Track */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-100"></div>
          {/* Spinning Track */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-900 border-t-transparent animate-[spin_0.8s_linear_infinite]"></div>
        </div>

        {/* Loading Text */}
        <p className="animate-pulse text-sm font-medium tracking-wide text-slate-500">
          {message}
        </p>
        
      </div>
    </div>
  );
}

export default Loading;