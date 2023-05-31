import React from 'react';
import { useContext, useEffect, useState,createContext, } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { CartContext } from "../pages/ProductPage";
import { useAuth0 } from "@auth0/auth0-react";
import "./postorder.css"

export const OrderContext = createContext();

const Postorder = () => {
  const { cartItem, setCartItem } = useContext(CartContext);
  console.log("_____________")
  console.log(cartItem)
  const email ="matiassvelazquez@gmail.com"//user?.email
  console.log(email)
  console.log("-------------")
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
//  import { useHistory } from 'react-router-dom';
 
 const {updateOrderId } = useContext(OrderContext);

  const handlePostRequest = async() => {
    const data = {
      // Coloca los datos que deseas enviar en el cuerpo de la solicitud
      adress: address,
      phone: phone,
      city: city,
      country: country,
      productC: [],
    };

  await  axios.post(`http://localhost:8080/api/order/${email}`, data)
      .then(response => {
        const resp=  response.data
         updateOrderId(resp.order_id)
        console.log(resp)
      })
      .catch(error => {
        console.error(error);
      });
  };
 // const handleDualAction = async () => {
 //  await handlePostRequest();
 //   handleAction2();
 // };
 
  return (
    <div className='inputs'>

      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección" />
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" />
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ciudad" />
      <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="País" />
 
      <button onClick={handlePostRequest}>countinuar compra</button>
    </div>
  );
};

export default Postorder;