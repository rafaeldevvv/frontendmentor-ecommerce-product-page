export default function QuantityControl({ onMore, onLess, quantity }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-lightGrayishBlue md:w-full">
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 active:scale-75 md:h-full md:px-0"
        onClick={onLess}
        aria-label="less items"
      >
        -
      </button>
      <p aria-live="polite" className="font-bold">
        {quantity}
        <span className="sr-only">{quantity === 1 ? "item" : "items"}</span>
      </p>
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 active:scale-75 md:h-full md:px-0"
        onClick={onMore}
        aria-label="more items"
      >
        +
      </button>
    </div>
  );
}
