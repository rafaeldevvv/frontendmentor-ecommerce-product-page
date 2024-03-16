import Logo from "../icons/logo.svg";
import CartIcon from "../icons/icon-cart.svg";
import Button from "./Button";
import MenuIconBurguer from "../icons/icon-menu.svg";
import MenuIconClose from "../icons/icon-close.svg";
import { useState, useRef } from "react";

export default function Header() {
  return (
    <header className="h-18 bg-white border-b-2 border-solid border-lightGrayishBlue md:border-0 md:h-28 md:px-4">
      <div className="container flex justify-between h-full items-center md:p-0 md:border-b-2 border-solid border-lightGrayishBlue">
        <div className="flex items-center gap-x-[clamp(1rem,5vw,3rem)] md:flex-row-reverse">
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
              className="rounded-full hover:outline-2 hover:outline-orange hover:outline block"
            >
              <img
                src="images/image-avatar.png"
                alt="Avatar"
                className="w-[clamp(1.6rem,6vw,3rem)] min-w-4 aspect-square"
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

  const items = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <nav className="h-min leading-0">
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
        className="md:hidden z-50 relative"
      >
        {expanded ? <MenuIconClose /> : <MenuIconBurguer />}
      </button>
      {expanded && (
        <div className="bg-black opacity-40 fixed inset-0 z-30 md:hidden"></div>
      )}
      <ul
        id="nav-menu"
        className={`leading-normal fixed left-0 top-0 bottom-0 bg-white pt-20 pl-4 pr-32 z-40 ${
          expanded ? "flex" : "hidden"
        } flex-col md:static md:flex md:flex-row gap-4 md:p-0`}
      >
        {items.map((i) => (
          <li key={i} className="font-bold md:font-normal">
            <a href="https://www.example.com">{i}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
