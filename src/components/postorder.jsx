import React from 'react';
import { useContext, useEffect, useState,createContext, } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { CartContext } from "../pages/ProductPage";
import { useAuth0 } from "@auth0/auth0-react";
import "./postorder.css"

export const OrderContext = createContext();

const Postorder = () => {
  const  {user}  = useAuth0();
  const { cartItem, setCartItem } = useContext(CartContext);
  console.log("_____________")
  console.log(cartItem)
  const email =user?.email
  console.log(email)
  console.log("-------------")
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nameU, setnameU] = useState("");
  const navigate = useNavigate();
 const {updateOrderId } = useContext(OrderContext);
 const handleClick = async() => {
  await handleClick()

  // Segunda función
  console.log('Función 2 ejecutada');
};
//productC
  const handlePostRequest = async() => {
    const data = {
      // Coloca los datos que deseas enviar en el cuerpo de la solicitud
      name:nameU,
      adress: address,
      phone: phone,
      city: city,
      country: country,
      productC: cartItem,
    };

  await  axios.post(`https://byte-me-backend.onrender.com/api/order/${email}`, data)
      .then(response => {
        const resp=  response.data
         updateOrderId(resp.order_id)
        console.log(resp)
      })
      .catch(error => {
        console.error(error);
      });
     navigate("/order");
  };
 // const handleDualAction = async () => {
 //  await handlePostRequest();
 //   handleAction2();
 // };
 
  return (
    <div className='postOrder'>
      <div className='inputs'>
      <input type="text" value={nameU} onChange={e => setnameU(e.target.value)} placeholder="Nombre y apellido" className='items'/>
      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección" className='items'/>
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" className='items'/>
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ciudad" className='items'/>
      <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="País" className='items'/>
      <button onClick={handlePostRequest} className='orderButton'>Continuar compra</button>
    </div>
    </div>
  );
};

export default Postorder;