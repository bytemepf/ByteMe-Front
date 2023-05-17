import ProductItem from "./ProductItem";
import Filters from "./Filters/Filters";
import "./ProudProducts.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions";

function ProudProducts() {
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)
  const products = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const totalPages = Math.ceil(filteredProducts.length || products.length / itemsPerPage); 

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = filteredProducts.length
    ? filteredProducts.slice(startIndex, endIndex) 
    : products.slice(startIndex, endIndex)
    ;          

console.log(items);

  return (
    <div className="proud-container">
      <h2 className="container proud-h2">Productos</h2>
      <section>
          <Filters/>
      </section>
      <div className="container">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
        <div className="products-grid">
          <ProductItem items={items} />
        </div>
      </div>
    </div>
  );
}

export default ProudProducts;