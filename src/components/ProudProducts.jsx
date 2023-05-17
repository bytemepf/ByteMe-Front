import ProductItem from "./ProductItem";
import Filters from "./Filters/Filters";
import "./ProudProducts.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function ProudProducts() {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)
  const products = useSelector((state) => state.products);
  //const filteredProducts = useSelector((state) => state.filteredProducts);
 // console.log(filteredProducts);
  console.log(products)
  const totalPages = Math.ceil( products.length / itemsPerPage); 

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const items = products.slice(startIndex, endIndex);
  // const items = filteredProducts.length              //si encuentra filtros aplicados
  //   ? filteredProducts.slice(startIndex, endIndex) //trae los productos filtrados
  //   : products.slice(startIndex, endIndex);          // si no, trae todos los productos

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