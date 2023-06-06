import { useContext, useEffect, useState } from "react";
import { CartContext } from "../pages/ProductPage";
import axios from "axios";
//const token = localStorage.getItem('token');


function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const { cartItem, setCartItem } = useContext(CartContext);

  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };
  //console.log(token)

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity, item) => {
    return quantity * item;
  };

  const [deleteItem, setDeleteItem] = useState(cartItem);

  const removeFromCart = (id) => {
    const updateCart = cartItem.filter((item) => item.id !== id);
    setDeleteItem(updateCart);
    const json = JSON.stringify(cartItem.id);
    localStorage.removeItem("cartItem", json);
  };

  useEffect(() => {
    setCartItem(deleteItem);
  }, [deleteItem, setCartItem]);
  console.log(cartItem)

  return (
    <>
      {cartItem.map((item, id) => (
        <div key={id} className="cart-item">
          <div className="cart-img">
            <img src={item.image} alt="product" />
          </div>
          <div className="cart-middle">
            <p className="cart-name">{item.name}</p>
            <div className="cart-btns">
              <button onClick={decrease}>-</button>
              <p className="quantity">{quantity}</p>
              <button onClick={increase}>+</button>
            </div>
          </div>
          <div className="cart-right">
            <p className="cart-price">{calcPrice(quantity, item.price)}.00$</p>
            <i
              onClick={() => removeFromCart(item.id)}
              className="fa-sharp fa-solid fa-xmark"
            ></i>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItem;
