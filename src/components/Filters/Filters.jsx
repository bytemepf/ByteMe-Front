import "./Filters.css"
import {useSelector, useDispatch} from "react-redux"
import React, {useEffect, useState} from "react";
import {getFilters} from "../../Redux/actions"

function Filters() {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        name: '',
        category: '',
        brand: '',
        min: '',
        max: '',
        alphabetic: '',
        numeric: '',
        page: 1,
        limit: 10,
      });
      

      const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value

        setFilters({...filters, [property]:value}) 
        
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        const queryString = Object.keys(filters)
          .filter(key => filters[key])
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
          .join('&');
        dispatch(getFilters(queryString));
        
      }
 //////////FILTRAR INFO PARA MAPEAR LOS FILTROS////////////////////////////////////////////
    const items = useSelector((state) => state.products);
    const filteredItems = Array.isArray(items)? items : [items];

    const filterCategories = filteredItems.reduce((category, product) => {
        if (!category.includes(product.category)) {
            category.push(product.category);
        }
        return category;
      }, []);
      console.log(filterCategories);

    const filterBrands = filteredItems.reduce((brands, product) => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
        return brands;
      }, []);
      console.log(filterBrands);

////QUERY/////////////////////////////////////////////////////////////////////////////

// const applyFilters = () => {
//     const queryString = Object.keys(filters)
//       .filter(key => filters[key]) // Filtrar solo los valores de filtro que no son vacíos
//       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
//       .join('&');
//     dispatch(getFilters(queryString));
//   }

  
/////DROPDOWN/////////////////////////////////////////////////////////////////////////
    function dropdownFilter() {
        document.getElementById("dropdownFilter").classList.toggle("show");
    }
    // Cierra el dropdown si se hace clic fuera de él
    // window.onclick = function(event) {
    //     if (!event.target.matches('.dropbtn')) {
    //         var dropdowns = document.getElementsByClassName("dropdown-content");
    //         for (var i = 0; i < dropdowns.length; i++) {
    //             var openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) {
    //                 openDropdown.classList.remove('show');
    //             }
    //         }
    //     }
    // }
////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="dropdown">
                <button onClick={dropdownFilter} className="dropbtn">FILTROS</button>
                <div id="dropdownFilter" className="dropdown-content">
                    <div>
                        <h2>Ordenar productos</h2>
                        <div> 
                            <select className="select" onChange={handleChange} name="alphabetic">
                            <option disabled selected>Alfabéticamente</option>
                            <option value= "a-z">A to Z</option>
                            <option value= "z-a">Z to A</option>
                            </select>
                        </div>
                        <div> 
                            <select className="select" onChange={handleChange} name="numeric">
                            <option disabled selected>Por precio</option>
                            <option value= "asce">Menor precio</option>
                            <option value= "desc">Mayor precio</option>
                            </select>
                        </div>
                    </div>
                    <div className="container" value={filters.category} name="category" >
                        <h2>Categoría</h2>
                            {filterCategories.map(option => (
                                <div key={option}>
                                <input type="radio" name="category" value={option} id={option} onChange={handleChange}/>
                                <label>{option}</label>
                                </div>
                            ))}
                    </div>  
                    <div className="container" value={filters.brand} name="brand" >    
                        <h2>Marca</h2>
                            {filterBrands.map(option => (
                                <div key={option}>
                                <input type="radio" name="brand" value={option} id={option} onChange={handleChange}/>
                                <label>{option}</label>
                                </div>
                            ))}
                    </div> 
                    <div className="container"  >    
                        <h2>Rango de precio</h2>
                    <div>
                        <input type="text" name="min" value={filters.min} placeholder="min" onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="text" name="max" value={filters.max} placeholder="max" onChange={handleChange}/>
                    </div>
                    </div> 
                    <button onClick={handleSubmit}>Aplicar filtros</button>
                </div>
            </div>

      </>
    )}


  export default Filters;