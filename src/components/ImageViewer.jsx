import NextIcon from "../icons/icon-next.svg";
import PreviousIcon from "../icons/icon-previous.svg";

import { useCallback, useEffect, useState } from "react";
import { announcePolitely } from "./sr-announcer";

/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageViewer({
  images,
  onOpenLightbox,
  showSideButtonsAlways = false,
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const changeImg = useCallback((nextImg) => {
    setCurrentImg(nextImg);
    announcePolitely("Selected image " + (nextImg + 1));
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = matchMedia("(max-width:768px)");
    setIsMobile(mql.matches);

    mql.onchange = function (e) {
      setIsMobile(e.matches);
    };
    return () => {
      mql.onchange = null;
    };
  }, []);

  const imagesIds = images.map(([src]) =>
    src.replace(/\W/, "-").replace(/^-+/, ""),
  );

  return (
    <div className="select-none">
      <div className="relative mx-auto w-fit md:w-full">
        <ul>
          {images.map((img, index) => {
            const [src, alt] = img;
            return (
              <li
                key={src}
                className={`${index === currentImg ? "" : "hidden"}`}
                id={imagesIds[index]}
              >
                <BigImage
                  src={src}
                  alt={alt}
                  onOpenLightbox={onOpenLightbox}
                  isMobile={isMobile}
                />
              </li>
            );
          })}
        </ul>
        <PreviousButton
          onClick={() => {
            changeImg(currentImg === 0 ? images.length - 1 : currentImg - 1);
          }}
          showAlways={showSideButtonsAlways}
        />
        <NextButton
          onClick={() => {
            changeImg((currentImg + 1) % images.length);
          }}
          showAlways={showSideButtonsAlways}
        />
      </div>
      <ul className="mt-8 hidden justify-center gap-x-8 md:flex">
        {images.map((img, index) => {
          const [src] = img;
          return (
            <li key={src}>
              <ClickableThumbnail
                imageNumber={index + 1}
                src={src}
                active={index === currentImg}
                onClick={() => changeImg(index)}
                controls={imagesIds[index]}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PreviousButton({ onClick, showAlways = false }) {
  return (
    <button
      type="button"
      aria-label="Previous image"
      className={`stroke-darkGray absolute left-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 hover:stroke-orange focus-visible:stroke-orange ${showAlways ? "md:left-0 md:-translate-x-1/2" : "md:hidden"} `}
      onClick={onClick}
    >
      <PreviousIcon />
    </button>
  );
}

export function NextButton({ onClick, showAlways = false }) {
  return (
    <button
      type="button"
      aria-label="Next image"
      className={`stroke-darkGray absolute right-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 hover:stroke-orange focus-visible:stroke-orange ${showAlways ? "md:right-0 md:translate-x-1/2" : "md:hidden"} `}
      onClick={onClick}
    >
      <NextIcon />
    </button>
  );
}

export function BigImage({ isMobile, onOpenLightbox, src, alt }) {
  return onOpenLightbox !== undefined && !isMobile ? (
    <button type="button" className="block" onClick={onOpenLightbox}>
      <span className="sr-only">Open lightbox</span>
      <img
        src={src}
        alt={alt}
        className="aspect-[4/3] w-full object-cover object-center sm:mx-auto sm:aspect-square sm:max-w-lg md:max-w-none sm:rounded-xl"
      />
    </button>
  ) : (
    <img
      src={src}
      alt={alt}
      className="aspect-[4/3] w-full object-cover object-center sm:mx-auto sm:aspect-square sm:max-w-lg md:max-w-none sm:rounded-xl"
    />
  );
}

const activeThumbnailStyles = "outline outline-2 outline-orange";
export function ClickableThumbnail({
  imageNumber,
  src,
  active,
  onClick,
  controls,
}) {
  return (
    <button
      type="button"
      aria-label={`Switch to image ${imageNumber}`}
      className={`group block aspect-square w-full max-w-24 overflow-hidden rounded-lg bg-white ${active ? activeThumbnailStyles : ""}`}
      onClick={onClick}
      aria-controls={controls}
      aria-expanded={active}
      tabIndex={active ? -1 : 0}
    >
      <img
        src={src.replace(/(\.\w+)$/, "-thumbnail$1")}
        alt={`Image ${imageNumber} of product`}
        className={
          active
            ? "opacity-60"
            : "transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
        }
      />
    </button>
  );
}
