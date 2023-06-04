import React, { useEffect, useState,useContext  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {OrderContext}  from '../postorder';
import { getOrderById } from '../../Redux/actions';
import { Link } from "react-router-dom";
import "./OrderDetails.css"

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useContext(OrderContext);
  const dispatch = useDispatch();
  const ordeD = useSelector((state)=> state.orders);
  
  useEffect(()=>{
    dispatch(getOrderById())
  }, [dispatch])
console.log(ordeD)
  if (!ordeD) {
    return <div>Cargando...</div>;
  }

  const { detail, adress, city, country, phone, total } = ordeD;

  return (
    <div className='contei'>
      <h2>Detalles de la orden</h2>
    <div className='detail'> <p>Detalle: {detail}</p> </div> 
      <p>Dirección: {adress}</p>
      <p>Ciudad: {city}</p>
      <p>País: {country}</p>
      <p>Teléfono: {phone}</p>
      <p>Total: {total}</p>
      <Link to='/payment'>
        <button className='detailButton'>Pagar</button>
      </Link> 
    </div>
  );
};

export default OrderDetails;