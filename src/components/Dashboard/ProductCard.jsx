import { useDispatch, useSelector } from "react-redux";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {logicalDeletionProducts} from "../../Redux/actions"
//import { getProducts, getAllProducts } from "../../Redux/actions";

function ProductCard({ products, isEditMode  }) {
  const filterByName = useSelector((state) => state.search)
  const filteredItems = Array.isArray(filterByName)? filterByName : [filterByName];

  // useEffect(()=>{     //* Agregué este useEffect para que apenas se monte el componente traiga todos los productos
  //   dispatch(getProducts());
  // }, [dispatch])

  const navigate = useNavigate()

  const handleEditClick = (id, name, description, brand, price, category, quantity, image) => {
    console.log(id, name, description, brand, price, category, quantity, image, "jajajaj");
    navigate("/admin/edit", {state: {  
      isEditMode: true, 
      id: id, 
      name: name, 
      description: description, 
      brand: brand,
      price: price, 
      category: category, 
      quantity: quantity, 
      imageM: image
      } 
    });
    //handleEdit(id);
  };

  const dispatch = useDispatch();
  const handleStatusClick = (id, active) => {
    dispatch(logicalDeletionProducts(id));
  };

  
  return (
    <>
      {filteredItems.length !== 0 ? (
          filteredItems.map((item) => (
            <div className="item normal">
              <div className="item-header">
                <img src={item.image} alt="item1" className="item-image"/>
              </div>
            <div className="item-details">
                <h3>Nombre: {item.name}</h3>
                <p>ID: {item.id}</p>
                <p>Descripción: {item.description}</p>
                <p>Marca: {item.brand}</p>
                <p>Precio: ${item.price}</p>
                <p>Categoría: {item.category}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={() => handleEditClick(item.id)}>
                    EDITAR<i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
        products.map((item) => (
          <div className={style.item_normal}>
            <div className={style.item_imagecontainer}>
              <img src={item.image} alt="item1" className={style.item_image}/>
            </div>
            <div className={style.item_details}>
                <h3>{item.name}</h3>
                <p>ID: {item.id}</p>
                <p>Descripción: {item.description}</p>
                <p>Marca: {item.brand}</p>
                <p>Precio: ${item.price}</p>
                <p>Categoría: {item.category}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Activo: {item.active ? "Si" : "No"}</p>
              <div className={style.buttons}>
                <button className={style.edit} onClick={() => handleEditClick(item.id, item.name, item.description, item.brand, item.price,item.category, item.quantity, item.image)}>
                  EDITAR <i className="fa-solid fa-pen-to-square"></i>
                </button>
                {item.active ? (
                <button onClick={() => handleStatusClick(item.id, item.active)} className={style.deactivate}>
                    Desactivar
                  </button>
                ) : (
                  <button onClick={() => handleStatusClick(item.id, item.active)} className={style.activate}>
                    Activar
                  </button>
                )}
              </div>
            </div>
        </div>
      ))
      )}
    </>
  );
}

export default ProductCard;