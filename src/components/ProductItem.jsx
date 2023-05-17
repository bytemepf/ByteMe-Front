import { useDispatch, useSelector } from "react-redux";
import "./ProudProducts.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../Redux/actions";

function ProductItem({items}) {
  const dispatch = useDispatch();
  const filterByName = useSelector((state) => state.products)

  useEffect(()=>{     //* Agregué este useEffect para que apenas se monte el componente traiga todos los productos
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      {filterByName.length !== 0 ? 
        (filterByName.map((item) => (
          <div key={item.id} className="product normal">
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
        items.map((item) => (
          <div key={item.id} className="product normal">
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