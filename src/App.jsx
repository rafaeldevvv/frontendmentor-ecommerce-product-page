import "./output.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductArticle from "./components/ProductArticle";
import { useCallback, useState, StrictMode } from "react";

const sneakers = {
  name: "Fall Limited Edition Sneakers",
  id: 0,
  company: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250,
  discount: 50,
  images: [
    [
      "images/image-product-1.jpg",
      "A pair of white and beige sneakers against an orange background",
    ],
    [
      "images/image-product-2.jpg",
      "A pair of light grey sneakers with white soles and orange accents, placed on top of two white rocks.",
    ],
    [
      "images/image-product-3.jpg",
      "A sneaker with white soles and orange and beige accents, placed on top of two white rocks.",
    ],
    [
      "images/image-product-4.jpg",
      "A stylish sneaker on white stones against an orange background.",
    ],
  ],
};

export default function App() {
  const [cartProducts, setCartProducts] = useState([]);

  const onAddProduct = useCallback(
    (id, quantity) => {
      const productIndex = cartProducts.findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        setCartProducts(
          cartProducts.map((p) => {
            if (p.id === id) {
              return { ...p, quantity: p.quantity + quantity };
            } else {
              return p;
            }
          }),
        );
      } else {
        /* I know this isn't ideal for a real ecommerce site, but we have only one product any way */
        setCartProducts([...cartProducts, { ...sneakers, quantity }]);
      }
    },
    [cartProducts],
  );

  const onDeleteProduct = useCallback((id) => {
    setCartProducts(cartProducts.filter((p) => p.id !== id));
  });

  return (
    <StrictMode>
      <div className="grid min-h-screen content-between">
        <Header cartProducts={cartProducts} onDeleteProduct={onDeleteProduct} />
        <main>
          <ProductArticle product={sneakers} onAddProduct={onAddProduct} />
        </main>
        <Footer />
      </div>
    </StrictMode>
  );
}
