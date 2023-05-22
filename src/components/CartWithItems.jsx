import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../pages/ProductPage";
import EmptyCart from "./EmptyCart";

function CartWithItems() {
  const { cartItem, setCartItem } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItem.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItem, totalPrice]);

  return (
    <>
      <div className="full-cart-div">
        <div className="full-cart">
          {cartItem.map((item, id) =>
            cartItem.length !== 0 ? (
              <CartItem key={id} item={item} setCartItem={setCartItem} />
            ) : (
              <EmptyCart key={id} />
            )
          )}
        </div>
      </div>
      <div className="subtotal-div">
        <div className="sub-right">
          <p>Total</p>
          <p className="total-price">{totalPrice + "$"}</p>
        </div>
        <div className="sub-left">
          <Link>Ir a Caja</Link>
        </div>
      </div>
    </>
  );
}

export default CartWithItems;
