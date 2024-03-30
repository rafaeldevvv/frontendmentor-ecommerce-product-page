import { useRef, useEffect, useContext, useState } from "react";
import { TabFocusContext } from "./TabContext";

export function Tab({
  children,
  active,
  pos,
  setsize,
  controls,
  onClick,
  id,
  className = "",
  activeClassname = "active",
}) {
  const tabCanFocus = useContext(TabFocusContext);
  const tabRef = useRef(null);

  useEffect(() => {
    if (active && tabCanFocus) {
      tabRef.current.focus();
    }
  }, [active, tabCanFocus]);

  if (active) className += " " + activeClassname;

  return (
    <button
      role="tab"
      ref={tabRef}
      id={id}
      className={className}
      aria-selected={active}
      aria-posinset={pos}
      aria-setsize={setsize}
      aria-controls={controls}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TabList({
  className = "",
  children,
  label,
  orientation = "horizontal",
  style = {},
  tabSetSize,
  currentIndex,
  setIndex,
}) {
  const [canFocus, setCanFocus] = useState(false);

  return (
    <div
      role="tablist"
      className={className}
      aria-label={label}
      onFocus={() => setCanFocus(true)}
      onKeyDown={(e) => {
        const { key } = e;

        /* we need to prevent default in some situations */
        if (
          ((key === "ArrowUp" || key === "ArrowDown") &&
            orientation === "vertical") ||
          key === "Home" ||
          key === "End"
        ) {
          e.preventDefault();
        }

        if (
          (key === "ArrowRight" && orientation === "horizontal") ||
          (key === "ArrowDown" && orientation === "vertical")
        ) {
          setIndex(currentIndex === tabSetSize - 1 ? 0 : currentIndex + 1);
        } else if (
          (key === "ArrowLeft" && orientation === "horizontal") ||
          (key === "ArrowUp" && orientation === "vertical")
        ) {
          setIndex(currentIndex === 0 ? tabSetSize - 1 : currentIndex - 1);
        }

        if (key === "Home") setIndex(0);
        if (key === "End") setIndex(tabSetSize - 1);
      }}
      aria-orientation={orientation}
      style={style}
    >
      <TabFocusContext.Provider value={canFocus}>
        {children}
      </TabFocusContext.Provider>
    </div>
  );
}

export function TabPanel({ className = "", id, labelledBy, children, active }) {
  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={className}
      id={id}
      aria-labelledby={labelledBy}
      hidden={!active}
    >
      {children}
    </div>
  );
}
