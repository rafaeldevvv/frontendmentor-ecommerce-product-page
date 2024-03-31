import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartIcon from "../icons/icon-cart.svg";
import Cart from "./Cart";
import { remToPx } from "css-unit-converter-js";

/** @type {import("framer-motion").Variant} */
const cartVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transitionEnd: {
      visibility: "hidden",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    visibility: "visible",
  },
};

/**
 * The component that wraps the {@linkcode Cart | `<Cart />`} component.
 * It controls when the {@linkcode Cart | `<Cart />`} appears and disappears and where it is.
 */
export default function CartWidget({ products, onDeleteProduct }) {
  const [expanded, setExpanded] = useState(false),
    // the transformOrigin is used to the scale happens from the center of the cart button
    [posInfo, setPosInfo] = useState({ x: 0, y: 0, transformOrigin: 0.5 });
  const buttonRef = useRef(null),
    cartWrapperRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      const wrapper = cartWrapperRef.current;
      if (!expanded || !wrapper) return;

      if (!wrapper.contains(e.target) && wrapper !== e.target) {
        setExpanded(false);
      }
    }
    function updateCartPosition() {
      const btn = buttonRef.current,
        wrapper = cartWrapperRef.current;
      if (!wrapper) return;
      const {
        x: btnLeft,
        height: btnHeight,
        y: btnTop,
        width: btnWidth,
      } = btn.getBoundingClientRect();
      const wrapperWidth = Math.min(remToPx(21), 0.95 * innerWidth);
      let wrapperLeft = btnLeft + btnWidth / 2 - wrapperWidth / 2;
      if (wrapperLeft + wrapperWidth > innerWidth) {
        wrapperLeft = innerWidth - wrapperWidth - 0.025 * innerWidth;
      }
      setPosInfo({
        x: wrapperLeft,
        y: btnTop + btnHeight + 35,
        transformOrigin: (btnLeft - wrapperLeft + btnWidth / 2) / wrapperWidth,
      });
    }
    updateCartPosition();
    window.addEventListener("scroll", updateCartPosition);
    window.addEventListener("resize", updateCartPosition);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("scroll", updateCartPosition);
      window.removeEventListener("resize", updateCartPosition);
      window.removeEventListener("click", handleClick);
    };
  }, [expanded]);

  const cartItemCount = products.reduce(
    (count, product) => count + product.quantity,
    0,
  );
  const btnLabel =
    (expanded ? "Close" : "Open") +
    (products.length > 0 ? ` cart (${cartItemCount} items)` : " cart");

  return (
    <div className="relative leading-0">
      <button
        aria-label={btnLabel}
        type="button"
        aria-haspopup="menu"
        aria-controls="cart"
        aria-expanded={expanded}
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className="relative h-min fill-gray outline-offset-2 hover:fill-black focus-visible:outline-orange"
        ref={buttonRef}
      >
        <CartIcon />
        {products.length > 0 && (
          <span className="absolute right-0 top-0 block -translate-y-1/2 translate-x-1/2 rounded-xl bg-orange px-1 py-0.5 text-[0.5rem] leading-none text-white">
            {cartItemCount}
          </span>
        )}
      </button>
      <motion.div
        className="fixed z-40 w-[min(21rem,95vw)] leading-normal"
        variants={cartVariants}
        initial="hidden"
        animate={expanded ? "visible" : "hidden"}
        style={{
          left: posInfo.x + "px",
          top: posInfo.y + "px",
          originX: posInfo.transformOrigin,
          originY: 0,
        }}
        transition={{ duration: 0.5 }}
        ref={cartWrapperRef}
        aria-hidden={!expanded}
      >
        <Cart products={products} onDeleteProduct={onDeleteProduct} />
      </motion.div>
    </div>
  );
}
