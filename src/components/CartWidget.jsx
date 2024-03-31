import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartIcon from "../icons/icon-cart.svg";
import Cart from "./Cart";
import { remToPx } from "css-unit-converter-js";

/** 
 * The component that wraps the {@linkcode Cart | `<Cart />`} component. 
 * It controls when the {@linkcode Cart | `<Cart />`} appears and disappears and where it is. 
 */
export default function CartWidget({ products, onDeleteProduct }) {
  const [expanded, setExpanded] = useState(false),
    [pos, setPos] = useState({ x: 0, y: 0 });
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
      const { x, height, y, width: btnWidth } = btn.getBoundingClientRect();
      const wrapperWidth = Math.min(remToPx(21), 0.95 * innerWidth);
      let leftPos = x + btnWidth / 2 - wrapperWidth / 2;
      if (leftPos + wrapperWidth > innerWidth) {
        leftPos = innerWidth - wrapperWidth - 0.025 * innerWidth;
      }
      setPos({ x: leftPos, y: y + height + 35 });
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
  }, [buttonRef, cartWrapperRef, expanded]);

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
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed z-40 w-[min(21rem,95vw)] leading-normal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              left: pos.x + "px",
              top: pos.y + "px",
              originX: 0.5,
              originY: 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 }}
            ref={cartWrapperRef}
          >
            <Cart products={products} onDeleteProduct={onDeleteProduct} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
