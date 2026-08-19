import { Check } from "lucide-react";

const steps = [
  { key: 1, label: "Address" },
  { key: 2, label: "Payment" },
  { key: 3, label: "Confirmation" },
];

function CheckoutStepIndicator({ currentStep }) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mb-8"
    >
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, idx) => {
          const isActive = step.key === currentStep;
          const isComplete = step.key < currentStep;

          const bgClass = isActive || isComplete
            ? "bg-blue-600 text-white"
            : "bg-slate-200 text-slate-500";

          const labelClass = isActive || isComplete
            ? "font-semibold text-blue-600"
            : "text-slate-500";

          return (
            <li
              key={step.key}
              className="flex items-center"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${bgClass}`}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.key
                )}
              </div>

              <span
                className={`ml-2 text-sm font-medium ${labelClass}`}
              >
                {step.label}
              </span>

              {idx < steps.length - 1 && (
                <span className="mx-2 sm:mx-4 hidden h-0.5 w-8 bg-slate-200 sm:w-12" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default CheckoutStepIndicator;
