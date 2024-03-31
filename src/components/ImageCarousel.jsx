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
  idPrefix = "",
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

  const imagesIds = images.map(
      ([src]) => idPrefix + src.replace(/[\W]/g, "-").replace(/^-+/g, ""),
    ),
    tabsIds = imagesIds.map((id) => id + "-tab");

  const currentImageData = images.find((_, i) => i === currentImg);

  return (
    <div className="select-none">
      <div className="relative">
        <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden sm:aspect-square sm:max-w-lg md:max-w-none">
          <ImagePanelSwipeWrapper
            onSwipe={(d) => {
              // if swiped right
              if (d === 1) {
                onNext();
              } else {
                // if swiped left
                onPrevious();
              }
            }}
            isMobile={isMobile}
          >
            {images.map((img, index) => {
              return (
                <ImagePanel
                  src={img[0]}
                  alt={img[1]}
                  id={imagesIds[index]}
                  isMobile={isMobile}
                  onOpenLightbox={onOpenLightbox}
                  visible={index === currentImg}
                  direction={direction}
                  key={imagesIds[index]}
                />
              );
            })}
          </ImagePanelSwipeWrapper>
        </div>
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
      title="Previous image"
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
      title="Next image"
    >
      <NextIcon />
    </button>
  );
}

const swipeConfidenceThreshold = 9000;
function swipePower(offset, velocity) {
  return Math.abs(offset) * velocity;
}
export function ImagePanelSwipeWrapper({ children, onSwipe, isMobile }) {
  return (
    <motion.div
      className="absolute flex h-full w-full"
      drag={isMobile ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const power = swipePower(offset.x, velocity.x);
        // swiping right
        if (power > swipeConfidenceThreshold)
          onSwipe(-1); // previous image
        // swiping left
        else if (power < -swipeConfidenceThreshold) onSwipe(1); // next image
      }}
    >
      {children}
    </motion.div>
  );
}

/** @type {import("framer-motion").Variant} */
const imagePanelVariants = {
  hidden(direction) {
    return { opacity: 0, x: [0, direction * 600] };
  },
  visible(direction) {
    return {
      opacity: 1,
      x: [-direction * 600, 0],
    };
  },
};

export function ImagePanel({
  id,
  src,
  alt,
  isMobile,
  onOpenLightbox,
  labelledby,
  visible,
  direction,
}) {
  const shouldIncludeButton = onOpenLightbox !== undefined && !isMobile;

  return (
    <motion.div
      role="tabpanel"
      aria-labelledby={labelledby}
      id={id}
      className="absolute size-full"
      tabIndex={!visible ? -1 : shouldIncludeButton ? -1 : 0}
      aria-hidden={!visible}
      variants={imagePanelVariants}
      custom={direction}
      initial={false}
      animate={visible ? "visible" : "hidden"}
    >
      {shouldIncludeButton ? (
        <button
          type="button"
          title="Open lightbox"
          className="block size-full rounded-lg"
          onClick={onOpenLightbox}
          tabIndex={visible ? 0 : -1}
        >
          <span className="sr-only">Open lightbox</span>
          <img
            src={src}
            alt={alt}
            className="size-full object-cover object-center sm:rounded-lg"
          />
        </button>
      ) : (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover object-center sm:rounded-lg"
        />
      )}
    </motion.div>
  );
}

export function ClickableThumbnail({
  imageNumber,
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
