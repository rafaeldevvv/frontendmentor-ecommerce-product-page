import NextIcon from "../icons/icon-next.svg";
import PreviousIcon from "../icons/icon-previous.svg";

/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageViewer({ images }) {
  return (
    <div>
      <div className="relative mx-auto w-fit">
        <ul>
          {images.map((img, index) => {
            const [src, alt] = img;
            return (
              <li key={src} className={`${index === 0 ? "" : "hidden"}`}>
                <img
                  src={src}
                  alt={alt}
                  className="aspect-[4/3] w-full object-cover object-center sm:mx-auto sm:aspect-square sm:max-w-lg sm:rounded-xl"
                />
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          aria-label="Previous image"
          className="absolute left-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 md:hidden"
        >
          {<PreviousIcon />}
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="absolute right-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white px-4 leading-0 md:hidden"
        >
          {<NextIcon />}
        </button>
      </div>
      <ul className="mt-6 hidden gap-x-6 md:flex">
        {images.map((img, index) => {
          const [src] = img;
          return (
            <li key={src}>
              <ClickableThumbnail imageNumber={index + 1} src={src} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ClickableThumbnail({ imageNumber, src }) {
  return (
    <button
      type="button"
      aria-label={`Switch to image ${imageNumber}`}
      className="block aspect-square w-full overflow-hidden rounded-lg transition-opacity hover:opacity-60"
    >
      <img
        src={src.replace(/(\.\w+)$/, "-thumbnail$1")}
        alt={`Image ${imageNumber} of product`}
      />
    </button>
  );
}
