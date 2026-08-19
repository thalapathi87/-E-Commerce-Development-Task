import { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import api from "../../services/api";
import useCart from "../../hooks/useCart";
import ErrorMessage from "../ErrorMessage";
import OrderSummary from "./OrderSummary";
import { CreditCard, Banknote } from "lucide-react";

const PAYMENT_OPTIONS = [
  {
    value: "COD",
    label: "Cash on Delivery",
    icon: Banknote,
    description: "Pay cash when your order arrives",
  },
  {
    value: "MOCK_PAYMENT",
    label: "Mock Online Payment",
    icon: CreditCard,
    description:
      "Demo payment — no real transaction",
  },
];

function PaymentForm({ onSuccess, onBack }) {
  const { address, setPaymentMethod, paymentMethod, setCreatedOrder } =
    useCheckout();

  const { cart, cartTotal, clearCart } = useCart();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartTotal;
  const shipping = 0;
  const grandTotal = subtotal + shipping;

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!address) {
      setError("Address is missing. Please go back and enter your address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setPaymentMethod(paymentMethod || "COD");

    try {
      setIsPlacingOrder(true);

      const orderData = {
        name: address.name,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        paymentMethod: paymentMethod || "COD",
      };

      const response = await api.post("/orders", orderData);

      const createdOrder =
        response.data.order || response.data;

      setCreatedOrder(createdOrder);

      clearCart();

      onSuccess(createdOrder);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to place order. Please try again."
      );
      setCreatedOrder(null);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const selectedLabel =
    PAYMENT_OPTIONS.find((o) => o.value === paymentMethod)
      ?.label || "Cash on Delivery";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <aside className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Selected:{" "}
            <span className="font-medium text-slate-700">
              {selectedLabel}
            </span>
          </p>
        </div>

        {error && (
          <ErrorMessage message={error} onRetry={() => setError("")} />
        )}

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <fieldset className="space-y-3">
            {PAYMENT_OPTIONS.map((option) => {
              const isSelected =
                paymentMethod === option.value;

              const Icon = option.icon;

              return (
                <div
                  key={option.value}
                  className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => handlePaymentSelect(option.value)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>

                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isSelected
                          ? "text-blue-600"
                          : "text-slate-500"
                      }`}
                    />

                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          isSelected
                            ? "text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        {option.label}
                      </p>

                      <p className="mt-0.5 text-sm text-slate-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </fieldset>

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isPlacingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Address
        </button>
      </aside>

      <OrderSummary
        cart={cart}
        subtotal={subtotal}
        shipping={shipping}
        grandTotal={grandTotal}
      />
    </div>
  );
}

export default PaymentForm;
