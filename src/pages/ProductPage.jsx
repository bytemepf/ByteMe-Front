import { createContext, useContext, useEffect, useState } from "react";
import "../components/ProductPage.css";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById,addCart,iduser } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
//import { Link } from "react-router-dom";

export const CartContext = createContext();

function ProductPage() {
  const { user } = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state)=> state.details);
  //const item = items.filter((item) => item.id === parseInt(id));
  const idU = useSelector((state)=> state.iduser);
  console.log(idU)
  console.log("-------")
  useEffect(()=>{
    dispatch(getProductsById(id))
  }, [dispatch, id])

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity) => {
    return quantity * item.price;
  };
 function handleAddToCart() {
  dispatch(
    addCart(
      {
        productid: id,
        productname: item.name,
        totalC: item.price,
        quantityP: item.quantity,
      },
    )
  );}

  const [notify, setNotify] = useState(false);

  const showNotify = () => {
    setNotify(!notify);
  };

  return (
    <>
      <div
        onAnimationEnd={() => setNotify(false)}
        className={`notify ${notify ? "slide-in" : ""}`}
      >
        <p>El artículo ha sido agregado al carrito &nbsp; ✅</p>
      </div>

      <div className="product-page-div">
        <div className="container">
          <div className="product-div">
           
            <div className="product-left">
              <div className="big-img">
                <img src={item.image} alt="product" />
              </div>
            </div>
            <div className="product-right">
              <div className="descriptionContainer"> 
                 <h1 className="descriptionH1">{item.name}</h1>
                <p className="description">{item.description}</p>
           
              </div>
              <div className="product-quant">
                <p>Cantidad</p>
                <div className="product-btns">
                  <button onClick={decrease}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button onClick={increase}>+</button>
                </div>
                <p className="product-price">{calcPrice(quantity)}</p>
              </div>
              <div className="atc-buy">
            
            
              <button onClick={() => {addToCart(item); showNotify();}} className="atc-btn">añadir al carrito</button>
                {/* <button className="buy-btn">
                  <Link  to={{ pathname: "/payment"  }}>
                    comprar ahora
                  </Link>
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;