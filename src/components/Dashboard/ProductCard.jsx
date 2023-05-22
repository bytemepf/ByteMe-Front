import { useDispatch, useSelector } from "react-redux";
import "./ProductCard.module.css";
import { Link } from "react-router-dom";
//import { getProducts, getAllProducts } from "../../Redux/actions";

function ProductCard({ products, handleEdit  }) {
  const filterByName = useSelector((state) => state.search)
  const filteredItems = Array.isArray(filterByName)? filterByName : [filterByName];

  // useEffect(()=>{     //* Agregué este useEffect para que apenas se monte el componente traiga todos los productos
  //   dispatch(getProducts());
  // }, [dispatch])
  const handleEditClick = (id) => {
    handleEdit(id);
  };
  
  return (
    <>
      {filteredItems.length !== 0 ? (
          filteredItems.map((item) => (
            <div className="product normal">
              <div className="product-header">
                <img src={item.image} alt="product1" />
              </div>
            <div className="product-details">
                <h3>Nombre: {item.name}</h3>
                <p>ID: {item.id}</p>
                <p>Descripción: {item.description}</p>
                <p>Marca: {item.brand}</p>
                <p>Precio: {item.price}$</p>
                <p>Categoría: {item.category}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={handleEditClick(item.id)}>
                    EDITAR<i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
        products.map((item) => (
          <div className="product normal">
            <div className="product-header">
              <img src={item.image} alt="product1" />
            </div>
            <div className="product-details">
                <h3>Nombre: {item.name}</h3>
                <p>ID: {item.id}</p>
                <p>Descripción: {item.description}</p>
                <p>Marca: {item.brand}</p>
                <p>Precio: {item.price}$</p>
                <p>Categoría: {item.category}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={handleEditClick(item.id)}>
                  EDITAR <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </div>
      ))
      )}
    </>
  );
}

export default ProductCard;