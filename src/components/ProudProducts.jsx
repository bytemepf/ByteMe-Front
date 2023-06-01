import ProductItem from "./ProductItem";
import Filters from "./Filters/Filters";
import "./ProudProducts.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions";

function ProudProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  console.log(products);
  const activeProducts = products.filter((product) => product.active === true);
  console.log(activeProducts);
  const [page, setPage] = useState(1) 
  const [limit, setLimit] = useState(12)
  const totalPages = useSelector((state) => state.products.totalPages); 
  const pageNumber = useSelector((state) => state.products.page); //numero de pagina recibida en data
  
  const pagination = (page) => {
    setPage(page)
    //dispatch(getProducts(page, limit));
  }
  
  useEffect(()=>{
    dispatch(getProducts(page, limit))
  }, [dispatch, page, limit])

  return (
    <div className="proud-container">
      <h2 className="container proud-h2">Productos</h2>
      <section>
          <Filters page={page} limit={limit} setPage={setPage} setLimit={setLimit}/>
      </section>
      <div className="container">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li key={page} > 
                <a className={`${page == pageNumber ? "active" : ''}`}
                onClick={() => pagination(page)}>{page}</a>
              </li>
            )
          )}
        </ul>
        <div className="products-grid">
          <ProductItem activeProducts={activeProducts} page={page} limit={limit}/>
        </div>
      </div>
    </div>
  );
}

export default ProudProducts;