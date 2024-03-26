import ImageViewer from "./ImageViewer";
import ProductInfo from "./ProductInfo";
import QuantityControl from "./QuantityControl";
import CartIcon from "../icons/icon-cart.svg";
import { useState, useCallback } from "react";
import { announcePolitely } from "./sr-announcer";

export default function ProductArticle({
  product,
  onAddProduct,
  onOpenLightbox,
}) {
  const { images, name, company, description, price, discount, id } = product;

  const [quantity, setQuantity] = useState(0);
  const onMore = useCallback(() => setQuantity(quantity + 1), [quantity]),
    onLess = useCallback(
      () => setQuantity(Math.max(0, quantity - 1)),
      [quantity],
    );

  return (
    <article className="items-center gap-x-[clamp(1rem,5vw,6rem)] md:container sm:my-10 md:my-20 md:grid md:grid-cols-2">
      <div>
        <ImageViewer images={images} onOpenLightbox={onOpenLightbox} />
      </div>
      <div className="mx-auto max-w-md p-6 sm:px-0">
        <ProductInfo
          name={name}
          company={company}
          desc={description}
          price={price}
          discount={discount}
        />
        <div className="mt-8 grid-cols-[2fr_3fr] gap-x-4 md:grid">
          <QuantityControl
            quantity={quantity}
            onLess={onLess}
            onMore={onMore}
          />
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-x-4 rounded-md bg-orange fill-white py-4 text-white shadow-[0_15px_60px_-15px_theme(colors.orange)] transition-opacity hover:opacity-60 active:scale-95 md:mt-0"
            onClick={() => {
              if (quantity === 0) {
                alert("Select the amount you want first");
                return;
              }
              onAddProduct(id, quantity);
              announcePolitely(`${quantity} items were added`);
            }}
          >
            <CartIcon className="fill-white" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
