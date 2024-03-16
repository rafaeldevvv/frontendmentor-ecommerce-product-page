import Button from "./Button";

export default function QuantityControl() {
  return (
    <div className="flex justify-between items-center bg-lightGrayishBlue rounded-lg md:w-full">
      <button
        type="button"
        className="text-orange font-extrabold text-2xl block aspect-square px-4 md:px-0 md:h-full rounded-lg transition-opacity hover:opacity-60"
      >
        -
      </button>
      <p>0</p>
      <button
        type="button"
        className="text-orange font-extrabold text-2xl block aspect-square px-4 md:px-0 md:h-full rounded-lg transition-opacity hover:opacity-60"
      >
        +
      </button>
    </div>
  );
}
