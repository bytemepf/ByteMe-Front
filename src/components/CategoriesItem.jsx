import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../Redux/actions";

function CategoriesItem() {
  const products = useSelector((state) => state.products);
  const items = Array.isArray(products)? products : [products];
  const dispatch = useDispatch();

  console.log(items);

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])
  
  return (
    <>
      <div className="proud-container">
        <div className="container">
          <div className="products-grid">
            {items.map((item) => (
              <div key={item.id} className="product normal">
                <Link
                  onClick={() => window.top(0, 0)}
                  to={`/categories/product/${item.id}`}
                >
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesItem;
