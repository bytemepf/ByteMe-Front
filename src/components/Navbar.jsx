import "./Navbar.css";
import logo from "../img/logo/logo.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CartWithItems from "./CartWithItems";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../pages/ProductPage";
import SearchBar from "../pages/SearchBar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";



function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);
  const { user } = useAuth0();

  const { cartItem } = useContext(CartContext);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const openCart = () => {
    setCart(!cart);
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`mobile-nav-full ${mobileNav ? "open-flex" : "closed-flex"}`}
      >
        <i
          onClick={() => setMobileNav(!mobileNav)}
          className="fa-sharp fa-solid fa-xmark"
        ></i>
        <div className="mobile-links">

          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/all">
          Categorías
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/user">
          Perfil
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/reviews">
          Opniones de Usuarios Byte Me
          </Link>
          {user && user.nickname === "bytemepf" && (
                <Link onClick={() => window.scrollTo(0, 0)} to="/admin">
                  Administrador
                </Link>
            )}
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${cart ? "open-flex" : "closed-flex"}`}
      ></div>

      {/* cart */}
      <div className={`cart-div ${cart ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
          Carrito de compra ({cartItem.length})
          </h2>
          <i onClick={openCart} className="fa-sharp fa-solid fa-xmark"></i>
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/home" className="logo-container">
              <img
                onClick={scrollToTop}
                src={logo}
                alt="logo"
                className="logo-img"
              />
              <div className= {"byteme-title"}>
                <h1>Byte Me</h1>
              </div>
            </Link>
            <div className="nav-links">
              <SearchBar/>
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
              categorías
              </Link>
              {user && user.nickname === "bytemepf" && (
                <Link onClick={() => window.scrollTo(0, 0)} to="/admin">
                  Administrador
                </Link>
              )}
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/user"
              >
                Perfil
              </Link>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/reviews"
              >
                Opiniones
              </Link>
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                } shopping-cart-icon`}
              ></i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping hamburger-cart ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              ></i>
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className="fa-solid fa-bars hamburger-hamb"
              ></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
