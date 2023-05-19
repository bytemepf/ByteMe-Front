import React, { useEffect, useState } from "react";
import"./Search.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductsByName } from "../../Redux/actions";

export default function SearchBar(){
    const dispatch=useDispatch();
    const products = useSelector((state) => state.allProducts)
    
    const[searchQuery, setSearchQuery] = useState("");


    const handleChange=(event)=>{
      //event.preventDefault();
      setSearchQuery(event.target.value)
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const filteredProducts = products.filter((product) => product.name === searchQuery)
      if (filteredProducts.length > 0){
        dispatch(getProductsByName(searchQuery))
      } else {
        alert('Product not found')
      }
    }

    useEffect(()=>{
      dispatch(getAllProducts())
    }, [dispatch])
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={searchQuery} onChange={handleChange} />
            <button type="submit">Buscar</button>
          </form>
        </div>
      );
    }
