import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./payment.css";
import Swal from 'sweetalert2';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = () => {
  const item = useSelector((state) => state.details);
  const productPrice = item.price;
  const productImg = item.image;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
 /*  const [email, setEmail] = useState(""); */

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
   
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
    }
    if (!error) {
      console.log('no error')
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("https://localhost:8080/api/checkout" , {
          tokenId: id,
          quantity: 1,
          price: productPrice,
             
          
        });
     
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada con éxito',
          text: 'Te llegará la información a tu casilla de correo',
        });
        console.log( "este es mi token"+data.tokenId);

        elements.getElement(CardElement).clear();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: error.message,
        });
        console.log(error);
      }
      setLoading(false);
    }

  /*   if (!email) {
      Swal.fire({
        title: 'Atención',
        text: 'Por favor, ingresa tu correo electrónico.',
        icon: 'warning',
      });
      return;
    } */
  };

  console.log(!stripe || loading);

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="checkout-image">
        <img src={productImg} alt="Not Image Found" />
      </div>
      <h3 className="checkout-form__price">Precio: {productPrice}$</h3>
    {/*   <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}
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
