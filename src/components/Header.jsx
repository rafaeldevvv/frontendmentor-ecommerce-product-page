import Logo from "../icons/logo.svg";
import CartIcon from "../icons/icon-cart.svg";
import Button from "./Button";
import MenuIconBurguer from "../icons/icon-menu.svg";
import MenuIconClose from "../icons/icon-close.svg";
import { useState, useRef } from "react";

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
          <div className="h-min leading-0">
            <Button label="Cart">
              <CartIcon className="fill-gray" />
            </Button>
          </div>
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
