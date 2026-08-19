/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [syncing, setSyncing] = useState(false);

  // Load cart from backend when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // For logged-out users, keep localStorage behavior
      try {
        const savedCart = localStorage.getItem("cart");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(savedCart ? JSON.parse(savedCart) : []);
      } catch {
        setCart([]);
      }
      return;
    }

    let isMounted = true;

    const loadBackendCart = async () => {
      try {
        setSyncing(true);
        const response = await api.get("/cart");

        const backendCart =
          response.data.cart || response.data;

        const items = backendCart?.items || [];

        if (isMounted) {
          // Merge backend cart with local product data
          const enrichedItems = await Promise.all(
            items.map(async (item) => {
              if (item.product && typeof item.product === "object") {
                return {
                  _id: item.product._id,
                  name: item.product.name,
                  price: item.product.price,
                  image: item.product.image,
                  quantity: item.quantity,
                };
              }

              return {
                _id: item.product,
                name: item.name || "Product",
                price: item.price || 0,
                image: item.image || "",
                quantity: item.quantity || 1,
              };
            })
          );

          setCart(enrichedItems);
          localStorage.setItem(
            "cart",
            JSON.stringify(enrichedItems)
          );
        }
      } catch {
        // If backend cart fails, fall back to localStorage
        if (isMounted) {
          try {
            const savedCart = localStorage.getItem("cart");
            setCart(savedCart ? JSON.parse(savedCart) : []);
          } catch {
            setCart([]);
          }
        }
      } finally {
        if (isMounted) {
          setSyncing(false);
        }
      }
    };

    loadBackendCart();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const syncWithBackend = async (cartUpdater) => {
    if (!isAuthenticated) {
      // Local-only update for guest users
      setCart(cartUpdater);
      return;
    }

    try {
      setSyncing(true);
      const newCart = cartUpdater(cart);
      setCart(newCart);

      // Sync with backend
      if (newCart.length === 0) {
        // Clear backend cart by removing all items
        for (const item of cart) {
          await api.delete(`/cart/${item._id}`);
        }
      } else {
        // Get current backend cart
        const response = await api.get("/cart");
        const backendCart = response.data.cart || response.data;
        const backendItems = backendCart?.items || [];

        // Find items that need to be added/updated
        for (const item of newCart) {
          const existingItem = backendItems.find(
            (bi) =>
              (bi.product && bi.product._id) === item._id
          );

          if (existingItem) {
            // Update quantity if different
            if (existingItem.quantity !== item.quantity) {
              await api.put(`/cart/${item._id}`, {
                quantity: item.quantity,
              });
            }
          } else {
            // Add new item
            await api.post("/cart", {
              productId: item._id,
              quantity: item.quantity,
            });
          }
        }

        // Remove items that are no longer in cart
        for (const item of backendItems) {
          const productId =
            item.product && typeof item.product === "object"
              ? item.product._id
              : item.product;

          if (!newCart.find((c) => c._id === productId)) {
            await api.delete(`/cart/${productId}`);
          }
        }
      }
    } catch {
      // Even if backend sync fails, keep local state updated
      setCart(cartUpdater);
    } finally {
      setSyncing(false);
    }
  };

  const addToCart = (product) => {
    syncWithBackend((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    syncWithBackend((prevCart) =>
      prevCart.filter(
        (item) => item._id !== productId
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      return;
    }

    syncWithBackend((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    syncWithBackend(() => []);
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    syncing,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
