import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from "../../context/authContext";
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});
export default function Login(){
  const [inputs,setInputs]=useState({
      email:"",
      password:"",
  });
  
  
  const navigate=useNavigate();
 
  const { login }=useContext(AuthContext);
 

  const handleChange = e => {
      setInputs((prev)=>({...prev, [e.target.name] : e.target.value}))
  };

  const handleSubmit=async (e) =>{
    e.preventDefault()
    try {
      await schema.validate(inputs, { abortEarly: false });
      await  login(inputs)
      navigate("/home");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        console.log(errors);
      } else if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
}

  return(
      <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='email' name='email' onChange={handleChange}/>
       <input type='password' placeholder='password' name='password' onChange={handleChange}/>
       <button onClick={handleSubmit}>Login</button>
    
       <span>No tienes una cuenta?<Link to="/register">Registro</Link></span>
      </form>

      </div>
     
  )
}
