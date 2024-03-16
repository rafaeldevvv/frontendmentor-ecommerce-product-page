import ImageViewer from "./ImageViewer";
import ProductInfo from "./ProductInfo";
import QuantityControl from "./QuantityControl";
import CartIcon from "../icons/icon-cart.svg";

export default function ProductArticle({ product }) {
  const { images, name, company, description, price, discount } = product;

  return (
    <article className="md:grid md:grid-cols-2 sm:my-10 md:my-20 gap-x-[clamp(1rem,5vw,6rem)] md:container items-center">
      <div>
        <ImageViewer images={images} />
      </div>
      <div className="p-6 sm:px-0 max-w-md mx-auto">
        <ProductInfo
          name={name}
          company={company}
          desc={description}
          price={price}
          discount={discount}
        />
        <div className="mt-8 md:grid gap-x-4 grid-cols-[2fr_3fr]">
          <QuantityControl />
          <button
            type="button"
            className="text-white bg-orange rounded-md py-4 w-full flex items-center justify-center gap-x-4 fill-white mt-4 md:mt-0 hover:opacity-60 transition-opacity shadow-[0_15px_60px_-15px_theme(colors.orange)]"
          >
            <CartIcon className="fill-white" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
