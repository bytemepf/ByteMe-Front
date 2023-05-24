import React, { useEffect, useState } from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductsByName } from "../../Redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lowerCaseQuery = searchQuery.toLowerCase(); // Convertir a minúsculas
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) 
    );
    if (filteredProducts.length > 0) {
      dispatch(getProductsByName(searchQuery));
    } else {
      alert("Product not found");
    }
  };

    useEffect(()=>{
      dispatch(getAllProducts())
    }, [dispatch])
    
    return (
        <div>
          <form  className="Search-Container" onSubmit={handleSubmit}>
            <input className="Search-Container" type="text" value={searchQuery} onChange={handleChange} />
            <button className="Search-Container" type="submit">Buscar</button>
          </form>
        </div>
      );
    }
