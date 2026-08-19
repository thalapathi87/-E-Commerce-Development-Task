import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";
import { CheckoutProvider, useCheckout } from "../context/CheckoutContext";
import CheckoutStepIndicator from "../components/checkout/CheckoutStepIndicator";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderSuccess from "../components/checkout/OrderSuccess";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";

function CheckoutContent() {
  const [step, setStep] = useState(1);

  const { cart, cartTotal, syncing } = useCart();
  const { clearCheckoutData, createdOrder } = useCheckout();

  const navigate = useNavigate();

  const subtotal = cartTotal;
  const shipping = 0;
  const grandTotal = subtotal + shipping;

  const handleAddressNext = () => {
    setStep(2);
  };

  const handlePaymentSuccess = () => {
    setStep(3);
  };

  const handleContinueShopping = () => {
    clearCheckoutData();
    navigate("/products");
  };

  // Step 1: Address
  if (step === 1) {
    if (syncing && cart.length === 0) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loading message="Syncing your cart..." />
        </main>
      );
    }

    if (cart.length === 0) {
      return (
        <main className="min-h-screen bg-slate-50">
          <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4">
            <EmptyState
              title="Your Cart is Empty"
              message="Add products before proceeding to checkout."
              actionLabel="Continue Shopping"
              actionTo="/products"
            />
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 border-b-2 border-slate-900 pb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Step 1 of 3
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Checkout
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your delivery details.
            </p>
          </div>

          <CheckoutStepIndicator currentStep={step} />

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Delivery Address
              </h2>

              <div className="mt-6">
                <AddressForm onNext={handleAddressNext} />
              </div>
            </section>

            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Order Summary
                </h3>

                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="min-w-0 truncate">
                        {item.name}{" "}
                        <span className="text-slate-400">
                          x{item.quantity}
                        </span>
                      </span>
                      <span>
                        {formatCurrency(
                          Number(item.price || 0) *
                            Number(item.quantity || 0)
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-slate-200 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>

                  <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                  Secure checkout
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  // Step 2: Payment
  if (step === 2) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 border-b-2 border-slate-900 pb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Step 2 of 3
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Payment
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select a payment method and confirm your order.
            </p>
          </div>

          <CheckoutStepIndicator currentStep={step} />

          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onBack={() => setStep(1)}
          />
        </div>
      </main>
    );
  }

  // Step 3: Success
  if (step === 3) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full">
          <div className="mb-8 border-b-2 border-slate-900 pb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Step 3 of 3
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Order Confirmation
            </h1>
          </div>

          <CheckoutStepIndicator currentStep={step} />

          <OrderSuccess
            order={createdOrder}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </main>
    );
  }

  return null;
}

function Checkout() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}

export default Checkout;
