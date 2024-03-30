import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIconBurguer from "../icons/icon-menu.svg";
import MenuIconClose from "../icons/icon-close.svg";
import useMedia from "../hooks/useMedia";

export default function NavigationMenu() {
  const [expanded, setExpanded] = useState(false),
    clickHandlerRef = useRef({}),
    btnLabel = `${expanded ? "Close" : "Open"} main menu`,
    links = ["Collections", "Men", "Women", "About", "Contact"];

  const onToggleMenu = useCallback(() => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
    if (nextExpanded) {
      /* the first touch is the click to open the menu itself, so we disconsider it */
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
      clickHandlerRef.current = {};
    }
  }, [expanded]);

  return (
    <nav className={`h-min leading-0 md:flex md:h-full md:place-items-center ${expanded ? "w-4 md:w-max" : ""}`}>
      <button
        aria-label={btnLabel}
        title={btnLabel}
        aria-expanded={expanded}
        aria-haspopup="menu"
        aria-controls="nav-menu"
        type="button"
        onClick={onToggleMenu}
        className={`${expanded ? "fixed left-5 top-[1.71rem]" : "relative"} z-50 md:hidden`}
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
