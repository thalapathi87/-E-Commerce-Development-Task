import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

/* eslint-disable react-refresh/only-export-components */

const CheckoutContext = createContext();

const STORAGE_KEY = "checkoutData";

export function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { address: null, paymentMethod: "COD" };
    } catch {
      return { address: null, paymentMethod: "COD" };
    }
  });

  const [createdOrder, setCreatedOrder] = useState(null);

  const [buyNowProduct, setBuyNowProduct] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutData));
    } catch {
      // ignore write errors
    }
  }, [checkoutData]);

  const setAddress = (address) => {
    setCheckoutData((prev) => ({ ...prev, address }));
  };

  const setPaymentMethod = (method) => {
    setCheckoutData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const clearCheckoutData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCheckoutData({ address: null, paymentMethod: "COD" });
    setCreatedOrder(null);
    setBuyNowProduct(null);
  };

  const value = {
    address: checkoutData.address,
    paymentMethod: checkoutData.paymentMethod,
    setAddress,
    setPaymentMethod,
    createdOrder,
    setCreatedOrder,
    clearCheckoutData,
    buyNowProduct,
    setBuyNowProduct,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckout must be used within a CheckoutProvider"
    );
  }
  return context;
};

export default CheckoutContext;
