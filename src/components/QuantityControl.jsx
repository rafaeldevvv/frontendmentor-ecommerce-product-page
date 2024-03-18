import Button from "./Button";

export default function QuantityControl() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-lightGrayishBlue md:w-full">
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 md:h-full md:px-0"
      >
        -
      </button>
      <p>0</p>
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 md:h-full md:px-0"
      >
        +
      </button>
    </div>
  );
}
