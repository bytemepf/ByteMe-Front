import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../Redux/actions";

function CategoriesItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.allProducts);
  const filteredItems = items.filter((i) => i.category === "Monitores")
  
  useEffect(()=>{
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      <div className="proud-container">
        <div className="container">
          <div className="products-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="product normal">
                <Link to={`/categories/product/${item.id}`}>
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
