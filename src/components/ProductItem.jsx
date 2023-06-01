import { useDispatch, useSelector } from "react-redux";
import "./proudProcuts.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProducts, getAllProducts } from "../Redux/actions";

function ProductItem({ activeProducts }) {
  const dispatch = useDispatch();
  const filterByName = useSelector((state) => state.search)

  const filteredItems = Array.isArray(filterByName)? filterByName : [filterByName];

  // useEffect(()=>{     //* Agregué este useEffect para que apenas se monte el componente traiga todos los productos
  //   dispatch(getProducts());
  // }, [dispatch])
console.log(activeProducts);
  return (
    <>
  {filteredItems.length !== 0 ? (
        filteredItems.map((item) => (
          <div className="product normal">
            <Link onClick={() => window.top(0, 0)} to={`/product/${item.id}`}>
              <div className="product-header">
                <img src={item.image} alt="product1" />
              </div>
              <div className="product-details">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p className="item-price">{item.price}$</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        activeProducts.map((item) => (
          <div className="product normal">
            <Link onClick={() => window.top(0, 0)} to={`/product/${item.id}`}>
              <div className="product-header">
                <img src={item.image} alt="product1" />
              </div>
              <div className="product-details">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p className="item-price">{item.price}$</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default ProductItem;