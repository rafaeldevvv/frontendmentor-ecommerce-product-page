import "./output.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductArticle from "./components/ProductArticle";

const sneakers = {
  name: "Fall Limited Edition Sneakers",
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
  return (
    <div className="">
      <Header />
      <main>
        <ProductArticle product={sneakers} />
      </main>
      <Footer />
    </div>
  );
}
