import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

const AnimationContext = createContext(null);

const FLY_DURATION = 1000;
const ARC_HEIGHT_FACTOR = 0.35;
const SIZE = 56;

export function AnimationProvider({ children }) {
  const cartIconRefs = useRef([]);
  const [animations, setAnimations] = useState([]);
  const [cartBounceId, setCartBounceId] = useState(null);
  const bounceIdRef = useRef(0);

  const findTargetRect = useCallback(() => {
    if (!cartIconRefs.current) return null;
    const visibleEl = cartIconRefs.current.find(
      (el) =>
        el &&
        el.getBoundingClientRect().width > 0 &&
        el.getBoundingClientRect().height > 0
    );
    if (!visibleEl) return null;
    return visibleEl.getBoundingClientRect();
  }, []);

  const registerCartIcon = useCallback((index, el) => {
    cartIconRefs.current[index] = el;
  }, []);

  const triggerAddToCartAnimation = useCallback(
    (product, startElement) => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return false;
      }

      if (!startElement || !product?.image) return false;

      const startRect = startElement.getBoundingClientRect();
      const targetRect = findTargetRect();
      if (!targetRect) return false;

      const id = `${Date.now()}-${Math.random()}`;
      setAnimations((prev) => [
        ...prev,
        { id, product, startRect, targetRect },
      ]);
      return true;
    },
    [findTargetRect]
  );

  const removeAnimation = useCallback((id) => {
    setAnimations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const triggerCartBounce = useCallback(() => {
    const bounceId = ++bounceIdRef.current;
    setCartBounceId(bounceId);
    setTimeout(() => {
      setCartBounceId((current) => (current === bounceId ? null : current));
    }, 700);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        cartIconRefs,
        registerCartIcon,
        triggerAddToCartAnimation,
        triggerCartBounce,
      }}
    >
      {children}
      {createPortal(
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {animations.map((anim) => (
            <FlyingElement
              key={anim.id}
              data={anim}
              onComplete={removeAnimation}
              onReachTarget={triggerCartBounce}
            />
          ))}
        </div>,
        document.body
      )}
      {createPortal(
        <div className="fixed inset-0 pointer-events-none z-[90]">
          {cartIconRefs.current?.map((el, idx) => {
            if (!el || cartBounceId === null) return null;
            return (
              <CartBounce key={`bounce-${idx}-${cartBounceId}`} target={el} />
            );
          })}
        </div>,
        document.body
      )}
    </AnimationContext.Provider>
  );
}

export const useAddToCartAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    return {
      cartIconRefs: { current: [] },
      registerCartIcon: () => {},
      triggerAddToCartAnimation: () => false,
      triggerCartBounce: () => {},
    };
  }
  return context;
};

function FlyingElement({ data, onComplete, onReachTarget }) {
  const { product, startRect, targetRect } = data;
  const elementRef = useRef(null);
  const startImageRef = useRef(null);

  const {
    dx,
    dy,
    arcHeight,
    startCenterX,
    startCenterY,
    targetCenterX,
    targetCenterY,
  } = useMemo(() => {
    const scx = startRect.left + startRect.width / 2;
    const scy = startRect.top + startRect.height / 2;
    const tcx = targetRect.left + targetRect.width / 2;
    const tcy = targetRect.top + targetRect.height / 2;

    const dxVal = tcx - scx;
    const dyVal = tcy - scy;
    const arcHeightVal = Math.max(
      60,
      Math.min(Math.abs(dyVal) * ARC_HEIGHT_FACTOR, 220)
    );

    return {
      startCenterX: scx,
      startCenterY: scy,
      targetCenterX: tcx,
      targetCenterY: tcy,
      dx: dxVal,
      dy: dyVal,
      arcHeight: arcHeightVal,
    };
  }, [startRect, targetRect]);

  useEffect(() => {
    const element = elementRef.current;
    const startImage = startImageRef.current;
    if (!element || !startImage) return;

    element.style.left = `${startCenterX}px`;
    element.style.top = `${startCenterY}px`;
    element.style.transform = "translate(0, 0) scale(1)";
    element.style.opacity = "1";

    startImage.style.transition =
      "transform 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 220ms ease";
    startImage.style.transform = "scale(0.85) translateY(-6px)";
    startImage.style.opacity = "0.85";

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / FLY_DURATION, 1);

      const eased = easeInOutCubic(rawProgress);

      const x = dx * eased;
      const y = dy * eased - arcHeight * Math.sin(Math.PI * eased);

      const scale = 1 - 0.35 * eased;
      const opacity = 1 - 0.25 * eased;

      element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      element.style.opacity = String(opacity);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        startImage.style.transition =
          "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 380ms ease";
        startImage.style.transform = "scale(1) translateY(0)";
        startImage.style.opacity = "1";

        onReachTarget();
        setTimeout(() => onComplete(data.id), 50);
      }
    };

    const raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      if (startImage) {
        startImage.style.transition = "";
        startImage.style.transform = "";
        startImage.style.opacity = "";
      }
    };
  }, [data.id, dx, dy, arcHeight, startCenterX, startCenterY, onComplete, onReachTarget]);

  return (
    <div
      ref={elementRef}
      className="fixed rounded-full overflow-hidden pointer-events-none"
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        marginLeft: `-${SIZE / 2}px`,
        marginTop: `-${SIZE / 2}px`,
        zIndex: 9999,
        boxShadow: "0 20px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <img
        ref={startImageRef}
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function CartBounce({ target }) {
  useEffect(() => {
    const el = target;
    if (!el) return;

    el.style.transition =
      "transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 180ms ease";
    el.style.transform = "scale(1.25)";
    el.style.boxShadow = "0 0 0 8px rgba(59, 130, 246, 0.25), 0 10px 25px rgba(0,0,0,0.15)";

    const t = setTimeout(() => {
      el.style.transition =
        "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 420ms ease";
      el.style.transform = "scale(1)";
      el.style.boxShadow = "";
    }, 180);

    return () => clearTimeout(t);
  }, [target]);

  return null;
}
