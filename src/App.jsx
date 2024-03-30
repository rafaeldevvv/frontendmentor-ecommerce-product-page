import "./output.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Lightbox from "./components/Lightbox";
import ProductArticle from "./components/ProductArticle";
import { useCallback, useState, StrictMode } from "react";
import { announcePolitely } from "./components/sr-announcer";
import { MotionConfig } from "framer-motion";

export default function App({ initialCart, product }) {
  const [cart, setCartProducts] = useState(initialCart);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const onAddProduct = useCallback(
    (id, quantity) => {
      let nextCart;
      const productIndex = cart.findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        nextCart = cart.map((p) => {
          if (p.id === id) {
            return { ...p, quantity: p.quantity + quantity };
          } else {
            return p;
          }
        });
      } else {
        /* I know this isn't ideal for a real ecommerce site, but we have only one product any way */
        nextCart = [...cart, { ...product, quantity }];
      }
      setCartProducts(nextCart);
      localStorage.setItem("cart", JSON.stringify(nextCart));
    },
    [cart],
  );

  const onDeleteProduct = useCallback((id) => {
    const nextCart = cart.filter((p) => p.id !== id);
    setCartProducts(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    if (nextCart.length === 0) announcePolitely("Your cart is empty");
  });

  return (
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <div className="grid min-h-screen content-between">
          <Header cartProducts={cart} onDeleteProduct={onDeleteProduct} />
          <main>
            <ProductArticle
              product={product}
              onAddProduct={onAddProduct}
              onOpenLightbox={() => setIsLightboxOpen(true)}
            />
          </main>
          <Footer />
        </div>
        <Lightbox
          open={isLightboxOpen}
          images={product.images}
          onClose={() => setIsLightboxOpen(false)}
        />
      </MotionConfig>
    </StrictMode>
  );
}
