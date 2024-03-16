export default function ProductInfo({ company, name, desc, price, discount }) {
  const actualPrice = price * (discount / 100);
  return (
    <div className="space-y-6">
      <header>
        <p className="text-orange text-xs md:text-sm uppercase font-bold mb-4 tracking-widest">
          {company}
        </p>
        <h1 className="text-[clamp(1.875rem,5vw,3rem)] text-black capitalize font-extrabold leading-none">
          {name}
        </h1>
      </header>
      <p className="text-darkGrayishBlue text-md leading-relaxed">{desc}</p>
      <p>
        <span className="sr-only">
          $&nbsp;{actualPrice} with a discount of ${discount}%
        </span>
        <span
          aria-hidden="true"
          className="flex justify-between items-center md:block"
        >
          <span className="flex gap-x-4 items-center">
            <span className="font-extrabold text-3xl">
              ${actualPrice.toFixed(2)}
            </span>
            <span className="font-bold text-md text-orange bg-paleOrange rounded px-1 block">
              {discount}%
            </span>
          </span>
          <span className="line-through text-grayishBlue font-semibold block">
            ${price.toFixed(2)}
          </span>
        </span>
      </p>
    </div>
  );
}
