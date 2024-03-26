import ImageViewer from "./ImageViewer";
import CloseIcon from "../icons/icon-close.svg";

import { useEffect, useRef } from "react";

export default function Lightbox({ onClose, images, open }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
      document.body.style.overflowY = "hidden";
      /* this is a padding that replaces the scroll so we don't have a layout shift */
      document.body.style.paddingRight =
        innerWidth - document.documentElement.clientWidth + "px";
    } else {
      dialog.close();
      document.body.style.overflowY = "auto";
      document.body.style.paddingRight = "0";
    }
  }, [open]);

  return (
    <dialog
      className="inset-0 m-0 h-screen max-h-none w-screen max-w-none bg-black bg-opacity-60"
      ref={dialogRef}
      onClick={onClose}
    >
      <div className="flex min-h-screen items-center">
        <div
          className="mx-auto max-w-xl py-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6">
            <button
              className="float-right block fill-white text-2xl hover:fill-orange focus-visible:fill-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              type="button"
              aria-label="Close lightbox"
              autoFocus
              onClick={onClose}
            >
              <CloseIcon />
            </button>
            <span className="clear-right block" />
          </div>
          <ImageViewer images={images} showSideButtonsAlways />
        </div>
      </div>
    </dialog>
  );
}
