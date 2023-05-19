import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { useAuth0 } from '@auth0/auth0-react';


export default function Register(){
    const {loginWithRedirect} = useAuth0()

    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
    });
    
    const [err,setError]=useState(null);

    const navigate=useNavigate();
    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name] : e.target.value}))
    };

    const handleSubmit=async e =>{
        e.preventDefault()
        try {
            await axios.post("https://byte-me-backend.onrender.com/api/auth/register", inputs)
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return(
        <div className='auth'>
        <h1>Registro</h1>
            <form>
                <input  required={true}  type='text' placeholder='name'  name='name' onChange={handleChange}/>
                <input required={true}  type='email' placeholder='email' name='email' onChange={handleChange}/>
                <input  required ={true} type='password' placeholder='password' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Registrarme</button>
                {err &&<p>{err}</p>}
                <label>Ya tienes una cuenta? Presiona: <button onClick={loginWithRedirect}>Login</button></label>
            </form>

        </div>
    )
}
