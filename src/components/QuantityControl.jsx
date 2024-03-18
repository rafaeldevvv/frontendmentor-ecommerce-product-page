import { useState } from "react";

export default function QuantityControl() {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="flex items-center justify-between rounded-lg bg-lightGrayishBlue md:w-full">
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 md:h-full md:px-0"
        onClick={() => setQuantity(Math.max(0, quantity - 1))}
        aria-label="less"
      >
        -
      </button>
      <p aria-live="polite" className="font-bold">
        {quantity}
      </p>
      <button
        type="button"
        className="block aspect-square rounded-lg px-4 text-2xl font-extrabold text-orange transition-opacity hover:opacity-60 md:h-full md:px-0"
        onClick={() => setQuantity(quantity + 1)}
        aria-label="more"
      >
        +
      </button>
    </div>
  );
}
