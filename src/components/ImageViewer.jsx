import NextIcon from "../icons/icon-next.svg";
import PreviousIcon from "../icons/icon-previous.svg";

import { useCallback, useState } from "react";
import { announcePolitely } from "./sr-announcer";

/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageViewer({ images, onOpenLightbox }) {
  const [currentImg, setCurrentImg] = useState(0);
  const changeImg = useCallback((nextImg) => {
    setCurrentImg(nextImg);
    announcePolitely("Switched to image " + (nextImg + 1));
  }, []);

  return (
    <div>
      <div className="relative mx-auto w-fit">
        <ul>
          {images.map((img, index) => {
            const [src, alt] = img;
            return (
              <li
                key={src}
                className={`${index === currentImg ? "" : "hidden"}`}
              >
                {onOpenLightbox !== undefined ? (
                  <button
                    type="button"
                    className="block"
                    onClick={onOpenLightbox}
                  >
                    <span className="sr-only">Open lightbox</span>
                    <img
                      src={src}
                      alt={alt}
                      className="aspect-[4/3] w-full object-cover object-center sm:mx-auto sm:aspect-square sm:max-w-lg sm:rounded-xl"
                    />
                  </button>
                ) : (
                  <img
                    src={src}
                    alt={alt}
                    className="aspect-[4/3] w-full object-cover object-center sm:mx-auto sm:aspect-square sm:max-w-lg sm:rounded-xl"
                  />
                )}
              </li>
            );
          })}
        </ul>
        <PreviousButton
          onClick={() => {
            changeImg(currentImg === 0 ? images.length - 1 : currentImg - 1);
          }}
        />
        <NextButton
          onClick={() => {
            changeImg((currentImg + 1) % images.length);
          }}
        />
      </div>
      <ul className="mt-6 hidden gap-x-6 md:flex">
        {images.map((img, index) => {
          const [src] = img;
          return (
            <li key={src}>
              <ClickableThumbnail
                imageNumber={index + 1}
                src={src}
                active={index === currentImg}
                onClick={() => changeImg(index)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PreviousButton({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Previous image"
      className="absolute left-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 md:hidden"
      onClick={onClick}
    >
      {<PreviousIcon />}
    </button>
  );
}

export function NextButton({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Next image"
      className="absolute right-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 md:hidden"
      onClick={onClick}
    >
      {<NextIcon />}
    </button>
  );
}

const activeThumbnailStyles = "outline outline-2 outline-orange",
  thumbnailStyles = "transition-opacity hover:opacity-60";
export function ClickableThumbnail({ imageNumber, src, active, onClick }) {
  return (
    <button
      type="button"
      aria-label={`Switch to image ${imageNumber}`}
      className={`block aspect-square w-full overflow-hidden rounded-lg ${active ? activeThumbnailStyles : thumbnailStyles}`}
      onClick={onClick}
    >
      <img
        src={src.replace(/(\.\w+)$/, "-thumbnail$1")}
        alt={`Image ${imageNumber} of product`}
        className={active ? "opacity-60" : ""}
      />
    </button>
  );
}
