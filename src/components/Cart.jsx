import DeleteIcon from "../icons/icon-delete.svg";
import { announcePolitely } from "./sr-announcer";

export default function Cart({ products, onDeleteProduct }) {
  let contents;
  if (!products || products.length === 0) {
    contents = (
      <div className="flex w-full place-items-center font-bold text-darkGrayishBlue">
        <p className="w-full text-center">Your cart is empty</p>
      </div>
    );
  } else {
    contents = (
      <div className="grid grid-rows-[max-content_min-content] p-5">
        <ul className="mb-6 space-y-4 overflow-y-auto">
          {products.map((p) => {
            return (
              <li key={p.name}>
                <CartItem item={p} onDelete={onDeleteProduct} />
              </li>
            );
          })}
        </ul>
        <a
          type="button"
          className="mt-4 block w-full rounded-md bg-orange py-4 text-center text-white transition-opacity hover:opacity-60 md:mt-0"
          href="https://www.example.com/"
        >
          Checkout
        </a>
      </div>
    );
  }
  return (
    <section
      aria-labelledby="cart-heading"
      className="grid max-h-96 min-h-52 grid-rows-[min-content_min-content_1fr] rounded-md bg-white drop-shadow-xl"
      id="cart"
    >
      <h2 id="cart-heading" className="px-4 py-5 font-semibold text-black">
        Cart
      </h2>
      <div className="h-0.5 bg-lightGrayishBlue"></div>
      {contents}
    </section>
  );
}

function formatPrice(price) {
  if (Number.isInteger(price)) {
    return "$" + price.toLocaleString("en") + ".00";
  } else {
    const priceStr = price.toString(),
      decimalIndex = priceStr.indexOf("."),
      decimal = priceStr.slice(decimalIndex, decimalIndex + 3);
    return (
      "$" + Math.floor(price).toLocaleString("en") + decimal.padEnd(3, "0")
    );
  }
}

export function CartItem({ item, onDelete }) {
  const { price, images, name, quantity } = item;
  const formattedPrice = formatPrice(price),
    formattedTotal = formatPrice(price * quantity);

  return (
    <div className="flex items-center gap-x-4">
      <div>
        <img
          src={images[0][0].replace(/\.(\w+)$/, "-thumbnail.$1")}
          alt={images[0][1]}
          className="max-w-12 rounded"
        />
      </div>
      <div className="text-sm">
        <p>{name}</p>
        <p>
          <span className="sr-only">
            {quantity} items for {formattedPrice} each, totalling {formattedTotal}
          </span>
          <span aria-hidden="true">
            {formattedPrice} x {quantity}
          </span>{" "}
          <strong>{formattedTotal}</strong>
        </p>
      </div>
      <button
        type="button"
        aria-label="delete"
        className="fill-lightGray h-min w-min leading-0 outline-offset-2 hover:fill-black focus-visible:fill-black"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
          announcePolitely("Item deleted");
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
