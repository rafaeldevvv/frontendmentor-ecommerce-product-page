import Logo from "../icons/logo.svg";
import CartWidget from "./CartWidget";
import NavigationMenu from "./NavigationMenu";
import Profile from "./Profile";

export default function Header({ cartProducts, onDeleteProduct }) {
  return (
    <header className="h-18 border-b-2 border-solid border-lightGrayishBlue bg-white md:h-28 md:border-0 md:px-4">
      <div className="container flex h-full items-center justify-between border-solid border-lightGrayishBlue px-5 md:border-b-2 md:p-0">
        <div className="flex items-center gap-x-[clamp(1rem,5vw,3rem)] md:h-full md:flex-row-reverse">
          <NavigationMenu />
          <div>
            <Logo />
          </div>
        </div>

        <div className="flex items-center gap-x-[clamp(.7rem,5vw,3rem)]">
          <CartWidget
            products={cartProducts}
            onDeleteProduct={onDeleteProduct}
          />
          <Profile
            src="images/image-avatar.png"
            alt="Avatar"
            profileLink="https://rafaeldevvv.github.io/portfolio"
          />
        </div>
      </div>
    </header>
  );
}
