import "./output.css";

export default function App() {
  return (
    <div className="">
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">
                Men
              </a>
            </li>
            <li>
              <a href="#">
                Women
              </a>
            </li>
            <li>
              <a href="#">
                About
              </a>
            </li>
            <li>
              <a href="#">
                Contact
              </a>
            </li>

          </ul>
        </nav>
      </header>
      <main>
        <article>
          <h1 className="text-4xl">Fall Limited Edition Sneakers</h1>
          <p>
            These low-profile sneakers are your perfect casual wear companion. Featuring a 
            durable rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
        </article>
      </main>
    </div>
  );
}
