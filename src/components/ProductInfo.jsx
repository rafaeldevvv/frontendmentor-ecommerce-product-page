export default function ProductInfo({ company, name, desc, price, discount }) {
  const actualPrice = price * (discount / 100);
  return (
    <div>
      <header>
        <p>{company}</p>
        <h1>{name}</h1>
      </header>
      <p>{desc}</p>
      <p>
        <strong>
          ${actualPrice.toFixed(2)} {discount}%
        </strong>{" "}
        <s>${price.toFixed(2)}</s> {/* check */}
      </p>
    </div>
  );
}
