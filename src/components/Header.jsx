import Logo from "../icons/logo.svg";
import CartIcon from "../icons/icon-cart.svg";
import MenuIconBurguer from "../icons/icon-menu.svg";
import MenuIconClose from "../icons/icon-close.svg";
import { useState, useRef, useEffect, useCallback } from "react";
import Cart from "./Cart";
import { motion, AnimatePresence } from "framer-motion";
import { remToPx } from "css-unit-converter-js";
import useMedia from "../hooks/useMedia";

export default function Header({ cartProducts, onDeleteProduct }) {
  return (
    <header className="h-18 border-b-2 border-solid border-lightGrayishBlue bg-white md:h-28 md:border-0 md:px-4">
      <div className="container flex h-full items-center justify-between border-solid border-lightGrayishBlue px-5 md:border-b-2 md:p-0">
        <div className="flex items-center gap-x-[clamp(1rem,5vw,3rem)] md:h-full md:flex-row-reverse">
          <NavigationMenu />
          <div>
            <Logo />
          </div>
        </div>

        <div className="flex items-center gap-x-[clamp(.7rem,5vw,3rem)]">
          <CartWidget
            products={cartProducts}
            onDeleteProduct={onDeleteProduct}
          />
          <Profile
            src="images/image-avatar.png"
            alt="Avatar"
            profileLink="https://rafaeldevvv.github.io/portfolio"
          />
        </div>
      </div>
    </header>
  );
}

export function Profile({ src, alt, profileLink }) {
  return (
    <div>
      <a
        href={profileLink}
        target="_blank"
        className="focus block rounded-full outline outline-0 outline-offset-0 outline-orange hover:outline-2 focus-visible:outline-2"
      >
        <img
          src={src}
          alt={alt}
          className="aspect-square w-[clamp(1.6rem,6vw,3rem)] min-w-4"
        />
        <span className="sr-only">Profile</span>
      </a>
    </div>
  );
}

export function NavigationMenu() {
  const [expanded, setExpanded] = useState(false);
  const clickHandlerRef = useRef(null),
    btnLabel = `${expanded ? "Close" : "Open"} main menu`,
    links = ["Collections", "Men", "Women", "About", "Contact"];

  const onToggleMenu = useCallback(() => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
    if (nextExpanded) {
      let firstTouch = true;
      /** @param {Event} e */
      function handleClick(e) {
        if (firstTouch) {
          firstTouch = false;
          return;
        }
        e.stopPropagation();
        const nav = document.querySelector("#nav-menu"),
          target = e.target;
        if (target.id !== "nav-menu" && !nav.contains(target)) {
          window.removeEventListener("click", handleClick);
          setExpanded(false);
        }
      }
      window.addEventListener("click", handleClick);
      clickHandlerRef.current = handleClick;
    } else {
      window.removeEventListener("click", clickHandlerRef.current);
      clickHandlerRef.current = null;
    }
  }, [expanded, clickHandlerRef]);

  return (
    <nav className="h-min leading-0 md:flex md:h-full md:place-items-center">
      <button
        aria-label={btnLabel}
        title={btnLabel}
        aria-expanded={expanded}
        aria-haspopup="menu"
        aria-controls="nav-menu"
        type="button"
        onClick={onToggleMenu}
        className="relative z-50 md:hidden"
        id="nav-toggle"
      >
        {expanded ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            key="close"
          >
            <MenuIconClose />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            key="open"
          >
            <MenuIconBurguer />
          </motion.div>
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-30 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{
              opacity: 0,
              transition: {
                delay: links.length * 0.05,
              },
            }}
          />
        )}
      </AnimatePresence>
      <NavList links={links} expanded={expanded} />
    </nav>
  );
}

/** @type {import("framer-motion").Variants} */
const navListVariants = {
  hidden(numOfChildren) {
    return {
      right: "100vw",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delay: (numOfChildren + 1) * 0.05,
      },
    };
  },
  visible: {
    right: "40vw",
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
};

/** @type {import("framer-motion").Variants} */
const navListItemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

export function NavList({ links, expanded }) {
  const isMobile = useMedia("(max-width: 767px)");

  if (isMobile) {
    return (
      <AnimatePresence>
        {expanded && (
          <motion.ul
            id="nav-menu"
            className="fixed bottom-0 left-0 top-0 z-40 flex flex-col gap-4 overflow-hidden bg-white pl-5 pt-20 leading-normal"
            custom={links.length}
            variants={navListVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {links.map((l) => (
              <motion.li
                key={l}
                className="relative md:flex md:h-full md:place-items-center md:focus-within:before:absolute md:focus-within:before:inset-x-0 md:focus-within:before:top-full md:focus-within:before:block md:focus-within:before:h-0.5 md:focus-within:before:bg-orange md:hover:before:absolute md:hover:before:inset-x-0 md:hover:before:top-full md:hover:before:block md:hover:before:h-0.5 md:hover:before:bg-orange"
                variants={navListItemVariants}
              >
                <a
                  href="https://www.example.com"
                  className="font-bold md:font-semibold md:text-darkGrayishBlue md:hover:text-black md:focus-visible:text-black"
                >
                  {l}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    );
  } else {
    return (
      <ul
        id="nav-menu"
        className={`flex h-full items-center gap-[clamp(0.8rem,3vw,2rem)] leading-normal`}
      >
        {links.map((l) => (
          <li
            key={l}
            className="relative flex h-full place-items-center focus-within:before:absolute focus-within:before:inset-x-0 focus-within:before:top-full focus-within:before:block focus-within:before:h-0.5 focus-within:before:bg-orange hover:before:absolute hover:before:inset-x-0 hover:before:top-full hover:before:block hover:before:h-0.5 hover:before:bg-orange"
          >
            <a
              href="https://www.example.com"
              className="font-semibold text-darkGrayishBlue hover:text-black focus-visible:text-black"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export function CartWidget({ products, onDeleteProduct }) {
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
    (products.length > 0 ? `cart (${cartItemCount} items)` : "cart");

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
