export default function ProductInfo({ company, name, desc, price, discount }) {
  const actualPrice = price * (discount / 100);
  return (
    <div className="space-y-6">
      <header>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-orange md:text-sm">
          {company}
        </p>
        <h1 className="text-[clamp(1.875rem,5vw,3rem)] font-extrabold capitalize leading-none text-black md:mb-10">
          {name}
        </h1>
      </header>
      <p className="text-md leading-relaxed text-darkGrayishBlue">{desc}</p>
      <p>
        <span className="sr-only">
          $&nbsp;{actualPrice} with a discount of {discount}%
        </span>
        <span
          aria-hidden="true"
          className="flex items-center justify-between md:block"
        >
          <span className="flex items-center gap-x-4">
            <span className="text-3xl font-extrabold">
              ${actualPrice.toFixed(2)}
            </span>
            <span className="text-md block rounded bg-paleOrange px-1 font-bold text-orange">
              {discount}%
            </span>
          </span>
          <span className="block font-semibold text-grayishBlue line-through">
            ${price.toFixed(2)}
          </span>
        </span>
      </p>
    </div>
  );
}
