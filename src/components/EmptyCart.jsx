import EmptyCartImg from "../img/cart/empty-cart.png";

function EmptyCart({ openCart }) {
  return (
    <div className="empty-cart">
      <img src={EmptyCartImg} alt="empty-cart" />
      <p>Tu carrito esta vacío</p>
      <button onClick={openCart}>Seguir navegando</button>
    </div>
  );
}

export default EmptyCart;
