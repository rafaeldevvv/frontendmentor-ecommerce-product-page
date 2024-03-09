/* images a is an array of tuples of type [src: string, alt: string] */
export default function ImageViewer({ images }) {
  return (
    <div>
      <ul>
        {images.map((img) => {
          const [src, alt] = img;
          return (
            <li key={src}>
              <img src={src} alt={alt} />
            </li>
          );
        })}
      </ul>
      <ul>
        {images.map((img, index) => {
          const [src] = img;
          return (
            <li key={src}>
              <button type="button" aria-label={`Switch to image ${index + 1}`}>
                <img src={src.replace(/(\.\w+)$/, "-thumbnail$1")} alt={`Image ${index + 1} of product`} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
