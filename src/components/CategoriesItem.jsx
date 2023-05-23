import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../Redux/actions";
import "./CategoriesItem.css";

function CategoriesItem() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const itemsPerPage = 12; // Número de productos por página
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calcular el índice de los productos que deben mostrarse en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentItems);

  useEffect(() => {
    dispatch(getAllProducts(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="proud-container">
        <div className="container">
            <div className="pagination">
              {Array.from({ length: Math.ceil(allProducts.length / itemsPerPage) }, (_, index) => index + 1).map(
                (page) => (
                  <span key={page} onClick={() => paginate(page)}>
                    {page}
                  </span>
                )
              )}
            </div>
          <div className="products-grid">
          
            {currentItems.map((item) => (
              <div key={item.id} className="product normal">
                <Link onClick={() => window.top(0, 0)} to={`/categories/product/${item.id}`}>
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