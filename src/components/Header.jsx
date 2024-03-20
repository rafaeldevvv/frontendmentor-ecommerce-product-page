import Logo from "../icons/logo.svg";
import CartIcon from "../icons/icon-cart.svg";
import MenuIconBurguer from "../icons/icon-menu.svg";
import MenuIconClose from "../icons/icon-close.svg";
import { useState, useRef, useEffect } from "react";
import Cart from "./Cart";

export default function Header() {
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
          <CartWidget />
          <div>
            <a
              href="https://rafaeldevvv.github.io/portfolio"
              target="_blank"
              className="block rounded-full hover:outline hover:outline-2 hover:outline-orange"
            >
              <img
                src="images/image-avatar.png"
                alt="Avatar"
                className="aspect-square w-[clamp(1.6rem,6vw,3rem)] min-w-4"
              />
              <span className="sr-only">Profile</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function NavigationMenu() {
  const [expanded, setExpanded] = useState(false);
  const clickHandlerRef = useRef(null);

  const btnLabel = `${expanded ? "Close" : "Open"} main menu`;

  const links = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <nav className="h-min leading-0 md:flex md:h-full md:place-items-center">
      <button
        aria-label={btnLabel}
        title={btnLabel}
        aria-expanded={expanded}
        aria-haspopup="menu"
        aria-controls="nav-menu"
        type="button"
        onClick={() => {
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
          }
        }}
        className="relative z-50 md:hidden"
      >
        {expanded ? <MenuIconClose /> : <MenuIconBurguer />}
      </button>
      {expanded && (
        <div className="fixed inset-0 z-30 bg-black opacity-40 md:hidden"></div>
      )}
      <ul
        id="nav-menu"
        className={`fixed bottom-0 left-0 top-0 z-40 bg-white pl-5 pr-32 pt-20 leading-normal ${
          expanded ? "flex" : "hidden"
        } flex-col gap-4 md:static md:flex md:h-full md:flex-row md:items-center md:gap-[clamp(0.8rem,3vw,2rem)] md:p-0 `}
      >
        {links.map((l) => (
          <li
            key={l}
            className="relative md:flex md:h-full md:place-items-center md:focus-within:before:absolute md:focus-within:before:inset-x-0 md:focus-within:before:top-full md:focus-within:before:block md:focus-within:before:h-0.5 md:focus-within:before:bg-orange md:hover:before:absolute md:hover:before:inset-x-0 md:hover:before:top-full md:hover:before:block md:hover:before:h-0.5 md:hover:before:bg-orange"
          >
            <a
              href="https://www.example.com"
              className="font-bold md:font-semibold md:text-darkGrayishBlue md:hover:text-black md:focus-visible:text-black"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function CartWidget() {
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
      const { x, height, y, width: btnWidth } = btn.getBoundingClientRect(),
        { width: wrapperWidth } = wrapper.getBoundingClientRect();
      let leftPos = x + btnWidth / 2 - wrapperWidth / 2;
      if (leftPos + wrapperWidth > innerWidth) {
        leftPos = innerWidth - wrapperWidth;
      }
      setPos({ x: leftPos, y: y + height + 25 });
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

  return (
    <div className="relative leading-0">
      <button
        aria-label="Cart"
        type="button"
        aria-haspopup="menu"
        aria-controls="cart"
        aria-expanded={expanded}
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className="h-min fill-gray hover:fill-black"
        ref={buttonRef}
      >
        <CartIcon />
      </button>
      {expanded && (
        <div
          className="fixed z-40 w-[min(20rem,80vw)] leading-normal"
          style={{ left: pos.x + "px", top: pos.y + "px" }}
          ref={cartWrapperRef}
        >
          <Cart />
        </div>
      )}
    </div>
  );
}
