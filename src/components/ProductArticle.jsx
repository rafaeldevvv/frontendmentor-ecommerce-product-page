import ImageViewer from "./ImageViewer";
import ProductInfo from "./ProductInfo";
import QuantityControl from "./QuantityControl";
import Button from "./Button";
import CartIcon from "../icons/icon-cart.svg";

export default function ProductArticle({ product }) {
  const { images, name, company, description, price, discount } = product;

  return (
    <article>
      <div>
        <ImageViewer images={images} />
      </div>
      <div>
        <ProductInfo
          name={name}
          company={company}
          desc={description}
          price={price}
          discount={discount}
        />
        <QuantityControl />
        <Button>
          <CartIcon /> Add to cart
        </Button>
      </div>
    </article>
  );
}
