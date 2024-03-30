import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

const initialCart = JSON.parse(localStorage.getItem("cart"));

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

const root = document.querySelector("#root");
ReactDOM.createRoot(root).render(
  <App initialCart={initialCart || []} product={sneakers} />,
);
