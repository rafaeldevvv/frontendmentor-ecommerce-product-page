import ImageViewer from "./ImageCarousel";
import ProductInfo from "./ProductInfo";
import QuantityControl from "./QuantityControl";
import CartIcon from "../icons/icon-cart.svg";
import { useState, useCallback } from "react";
import { announcePolitely } from "./sr-announcer";
import { toast } from "react-toastify";

export default function ProductArticle({
  product,
  onAddProduct,
  onOpenLightbox,
}) {
  const { images, name, company, description, price, discount, id } = product;

  const [quantity, setQuantity] = useState(0);
  const onMore = useCallback(() => setQuantity((q) => q + 1), []),
    onLess = useCallback(() => setQuantity((q) => Math.max(0, q - 1)), []);

  return (
    <article className="items-center gap-x-[clamp(2rem,8vw,9rem)] md:container sm:my-10 md:my-20 md:grid md:grid-cols-2">
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
        <div className="mt-8 grid grid-rows-2 gap-x-4 gap-y-4 md:grid-cols-[2fr_3fr] md:grid-rows-1">
          <QuantityControl
            quantity={quantity}
            onLess={onLess}
            onMore={onMore}
          />
          <button
            type="button"
            className="flex w-full items-center justify-center gap-x-4 rounded-md bg-orange fill-white py-4 text-white shadow-[0_15px_60px_-15px_theme(colors.orange)] transition-opacity hover:opacity-60 focus-visible:bg-opacity-60 active:scale-95 md:mt-0"
            onClick={() => {
              if (quantity === 0) {
                toast("Please, choose how many items you want first", {
                  theme: "colored",
                  type: "error",
                });
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
