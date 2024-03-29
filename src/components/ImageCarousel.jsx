import NextIcon from "../icons/icon-next.svg";
import PreviousIcon from "../icons/icon-previous.svg";

import { useCallback, useEffect, useState } from "react";
import { announcePolitely } from "./sr-announcer";
import { motion, AnimatePresence } from "framer-motion";

/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageCarousel({
  images,
  onOpenLightbox,
  showSideButtonsAlways = false,
}) {
  const [currentImg, setCurrentImg] = useState(0),
    [direction, setDirection] = useState(1);
  const changeImg = useCallback(
    (nextImg, nextDirection) => {
      if (nextImg > currentImg) setDirection(-1);
      else setDirection(1);

      if (nextDirection) setDirection(nextDirection);

      setCurrentImg(nextImg);
      announcePolitely("Selected image " + (nextImg + 1));
    },
    [currentImg],
  );

  const onPrevious = useCallback(() => {
      changeImg(currentImg === 0 ? images.length - 1 : currentImg - 1, 1);
    }, [currentImg]),
    onNext = useCallback(() => {
      changeImg((currentImg + 1) % images.length, -1);
    }, [currentImg]);

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
    src.replace(/[\W.]/, "-").replace(/^-+/, ""),
  );

  const currentImageData = images.find((_, i) => i === currentImg);

  return (
    <div className="select-none">
      <div className="relative mx-auto w-full sm:max-w-lg md:max-w-none">
        <BigImage
          src={currentImageData[0]}
          alt={currentImageData[1]}
          onOpenLightbox={onOpenLightbox}
          isMobile={isMobile}
          id={imagesIds[currentImg]}
          direction={direction}
          onSwipe={(d) => {
            if (d === 1) {
              onNext();
            } else {
              onPrevious();
            }
          }}
        />
        <PreviousButton
          onClick={onPrevious}
          showAlways={showSideButtonsAlways}
        />
        <NextButton onClick={onNext} showAlways={showSideButtonsAlways} />
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
      className={`absolute left-6 top-1/2 z-20 aspect-square -translate-y-1/2 rounded-full bg-white stroke-darkGray px-4 leading-0 hover:stroke-orange focus-visible:stroke-orange ${showAlways ? "md:left-0 md:-translate-x-1/2" : "md:hidden"}`}
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
      className={`absolute right-6 top-1/2 z-20 aspect-square -translate-y-1/2 rounded-full bg-white stroke-darkGray px-4 leading-0 hover:stroke-orange focus-visible:stroke-orange ${showAlways ? "md:right-0 md:translate-x-1/2" : "md:hidden"}`}
      onClick={onClick}
    >
      <NextIcon />
    </button>
  );
}

/** @type {import("framer-motion").Variant} */
const bigImageVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction === 1 ? -500 : 500,
    zIndex: 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    zIndex: 1,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === 1 ? 500 : -500,
    zIndex: 0,
  }),
  transition: {
    duration: 0.8,
    x: {
      type: "spring",
      stiffness: 300,
      damping: 40,
    },
  },
};

const swipeConfidenceThreshold = 9000;
function swipePower(offset, velocity) {
  return Math.abs(offset) * velocity;
}
export function BigImage({
  isMobile,
  onOpenLightbox,
  src,
  alt,
  id,
  direction,
  onSwipe,
}) {
  return (
    <div className="relative aspect-[4/3] w-full sm:mx-auto sm:aspect-square">
      <AnimatePresence initial={false} custom={direction}>
        {onOpenLightbox !== undefined && !isMobile ? (
          <motion.button
            type="button"
            className="absolute block size-full"
            onClick={onOpenLightbox}
            custom={direction}
            variants={bigImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            key={src}
          >
            <span className="sr-only">Open lightbox</span>
            <img
              src={src}
              alt={alt}
              className="size-full object-cover object-center sm:rounded-xl"
              id={id}
            />
          </motion.button>
        ) : (
          <motion.img
            src={src}
            alt={alt}
            className="absolute size-full object-cover object-center sm:rounded-xl"
            id={id}
            custom={direction}
            variants={bigImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const power = swipePower(offset.x, velocity.x);
              if (power > swipeConfidenceThreshold) onSwipe(-1);
              else if (power < -swipeConfidenceThreshold) onSwipe(1);
            }}
            key={src}
          />
        )}
      </AnimatePresence>
    </div>
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
