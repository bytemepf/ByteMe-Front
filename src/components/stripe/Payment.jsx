import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./payment.css";
import Swal from 'sweetalert2';
import { loadStripe } from "@stripe/stripe-js";
import logo from "../../img/logo/logo.png"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { getAllProducts, getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = () => {
  const item = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users);
  const products = useSelector((state) => state.allProducts)
  
  const {user} = useAuth0();
  
  const dispatch = useDispatch();
  const productPrice = item.total;
  //const productImg = {logo} //esto era la imagen de un product
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); 



  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getAllProducts())
  }, dispatch)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (products.length > 0 && products[0].quantity === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes realizar la compra',
        text: 'La cantidad del producto es 0',
      });
      setLoading(false);
      return;
    }

    if (products[0].active === false ) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes realizar la compra',
        text: 'El producto está desactivado',
      });
      setLoading(false);
      return;
    }

    // Obtener el usuario actual
    if (user){
      const currentUserEmail = user.email;
      const currentUser = users.find((user) => user.email === currentUserEmail); 
      // Verificar si el usuario está activo
      if (!currentUser.active) {
        Swal.fire({
          icon: 'warning',
          title: 'No puedes realizar la compra',
          text: 'Tu cuenta está inactiva',
        });
        setLoading(false);
        return;
      }
    }

    
  
    if(error){
      if (error.code === 'incomplete_number') {
        Swal.fire({
          icon: 'warning',
          title: ('Faltan datos ')
        });
        setLoading(false);
      };
      if (error.code === 'invalid_number') {
        Swal.fire({
          icon: 'warning',
          title: ('Numero invalido')
        });
        setLoading(false);

        
      }
      Swal.fire({
        icon: 'warning',
        title: "Faltan datos de la tarjeta"
      });
      setLoading(false);
    }
    if (!error) {
      const { id } = paymentMethod;
      try {
        const data = await axios.post("https://byte-me-backend.onrender.com/api/checkout" , {
          id,
          quantity: 1,
          price: productPrice,
          email:user.email
        } , { credentials: 'include' });
    console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada con éxito',
          text: 'Te llegará la información a tu casilla de correo',
        });

        elements.getElement(CardElement).clear();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: error.response,
        });
      }
      setLoading(false);
    }

    if (!email) {
      Swal.fire({
        title: 'Atención',
        text: 'Por favor, ingresa tu correo electrónico.',
        icon: 'warning',
      });
      return;
    } 
  };


  return (
    
      <div className="pay">
        <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-image">
              <img src={logo} alt="Not Image Found" />
            </div>
            <h3 className="checkout-form__price">Precio: {productPrice}$</h3>
            <input
            className="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
            <div className="checkout-form__card-element">
              <CardElement />
            </div>
            
            <button disabled={loading || !stripe} className="checkout-form__button">
              {loading ? (
                <div className="checkout-form__spinner" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Comprar"
              )}
            </button>
          
          </form>
        </div>
    
  );
};

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container">
        <div className="row">
          <div className="col">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;