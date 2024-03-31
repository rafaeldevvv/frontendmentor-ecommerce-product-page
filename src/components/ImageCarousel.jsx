import NextIcon from "../icons/icon-next.svg";
import PreviousIcon from "../icons/icon-previous.svg";

import { useCallback, useState } from "react";
import useMedia from "../hooks/useMedia";
import { announcePolitely } from "./sr-announcer";
import { motion, AnimatePresence } from "framer-motion";

import { Tab, TabList } from "./TabbedInterface";
import getThumbnailSrc from "../utils/getThumbnailSrc";

/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageCarousel({
  images,
  onOpenLightbox,
  showSideButtonsAlways = false,
  idPrefix = ""
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

  const isMobile = useMedia("(max-width: 768px)");

  const imagesIds = images.map(([src]) =>
      idPrefix + src.replace(/[\W]/g, "-").replace(/^-+/g, ""),
    ),
    tabsIds = imagesIds.map((id) => id + "-tab");

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
          labelledby={tabsIds[currentImg]}
        />
        <PreviousButton
          onClick={onPrevious}
          showAlways={showSideButtonsAlways}
        />
        <NextButton onClick={onNext} showAlways={showSideButtonsAlways} />
      </div>
      <TabList
        label="Images"
        className="mt-8 hidden justify-center gap-x-8 md:flex"
        tabSetSize={images.length}
        currentIndex={currentImg}
        setIndex={changeImg}
      >
        {images.map((img, index) => {
          const [src] = img;
          return (
            <ClickableThumbnail
              imageNumber={index + 1}
              src={src}
              active={index === currentImg}
              onClick={() => changeImg(index)}
              controls={imagesIds[index]}
              numOfImgs={images.length}
              id={tabsIds[index]}
              key={src}
            />
          );
        })}
      </TabList>
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
  labelledby,
}) {
  const aria = {};
  if (!isMobile) {
    aria.role = "tabpanel";
    aria.tabIndex = 0;
    aria["aria-labelledby"] = labelledby;
  }

  return (
    <div className="relative aspect-[4/3] w-full sm:mx-auto sm:aspect-square">
      <AnimatePresence initial={false} custom={direction}>
        {onOpenLightbox !== undefined && !isMobile ? (
          <motion.div
            role="tabpanel"
            aria-labelledby={labelledby}
            className="absolute block size-full"
            custom={direction}
            variants={bigImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            key={src}
          >
            <button
              type="button"
              className="block size-full"
              onClick={onOpenLightbox}
            >
              <span className="sr-only">Open lightbox</span>
              <img
                src={src}
                alt={alt}
                className="size-full object-cover object-center sm:rounded-xl"
                id={id}
              />
            </button>
          </motion.div>
        ) : (
          <motion.div
            {...aria}
            className="absolute size-full"
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
          >
            <img
              src={src}
              alt={alt}
              className="size-full object-cover object-center sm:rounded-xl"
              id={id}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ClickableThumbnail({
  imageNumber,
  numOfImgs,
  src,
  active,
  onClick,
  controls,
  id,
}) {
  return (
    <Tab
      className="group relative block aspect-square w-full max-w-24 rounded-lg bg-white outline outline-0 outline-offset-8 outline-orange focus-visible:outline-[3px]"
      onClick={onClick}
      controls={controls}
      pos={imageNumber}
      setsize={numOfImgs}
      active={active}
      id={id}
    >
      <span
        className={`block overflow-hidden rounded-lg ${active ? "outline outline-2 outline-orange" : ""}`}
      >
        <span className="sr-only">{`Image ${imageNumber} of product`}</span>
        <img
          src={getThumbnailSrc(src)}
          alt=""
          className={
            active ? "opacity-60" : "transition-opacity group-hover:opacity-60"
          }
        />
      </span>
    </Tab>
  );
}
