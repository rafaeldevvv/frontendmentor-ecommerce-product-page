import "./output.css";

export default function App() {
  return (
    <div className="">
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <article>
          <div>
            <img src="images/image-product-1-thumbnail.jpg" alt="Sneakers" />
          </div>
          <div>
            <header>
              <p>Sneaker Company</p>
              <h1>Fall Limited Edition Sneakers</h1>
            </header>
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
            <p>
              <strong>$125.00 50%</strong> <s>$250.00</s> {/* check */}
            </p>
            <div>
              <button type="button">down</button>
              <span>0</span>
              <button type="button">up</button>
            </div>
            <button type="button">Add to cart</button>
          </div>
        </article>
      </main>
      <footer>
        <p>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Rafael Maia</a>.
        </p>
      </footer>
    </div>
  );
}
