import DeleteIcon from "../icons/icon-delete.svg";

export default function Cart({ products }) {
  let contents;
  if (!products || products.length === 0) {
    contents = (
      <div className="flex place-items-center font-bold text-darkGrayishBlue">
        <p>Your cart is empty</p>
      </div>
    );
  } else {
    contents = (
      <div className="grid grid-rows-[max-content_min-content]">
        <ul className="mb-6 space-y-4 overflow-y-auto">
          {products.map((p) => {
            return (
              <li key={p.name}>
                <CartItem product={p} />
              </li>
            );
          })}
        </ul>
        <a
          type="button"
          className="mt-4 block w-full rounded-md bg-orange py-4 text-center text-white transition-opacity hover:opacity-60 md:mt-0"
        >
          Checkout
        </a>
      </div>
    );
  }
  return (
    <section
      aria-labelledby="cart-heading"
      className="grid max-h-96 min-h-52 grid-rows-[min-content_min-content_1fr] rounded-md bg-white p-4 drop-shadow-xl"
      id="cart"
    >
      <h2 id="cart-heading">Cart</h2>
      <div className="h-0.5 bg-lightGrayishBlue"></div>
      {contents}
    </section>
  );
}

export function CartItem({ product }) {
  const { price, images, name, quantity } = product;
  const formattedPrice = "$" + price.toFixed(2),
    formattedTotal = "$" + (price * quantity).toFixed(2);

  return (
    <div className="flex items-center gap-x-4">
      <div>
        <img
          src={images[0][0].replace(/\.(\w+)$/, "-thumbnail.$1")}
          alt={images[0][1]}
          className="rounded"
        />
      </div>
      <div>
        <p>{name}</p>
        <p>
          <span className="sr-only">
            {quantity} items for ${formattedPrice} each, ${formattedTotal} total
          </span>
          <span aria-hidden="true">
            ${formattedPrice} x {quantity}
          </span>{" "}
          <strong>{formattedTotal}</strong>
        </p>
      </div>
      <button
        type="button"
        aria-label="delete"
        className="h-min w-min leading-0"
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
