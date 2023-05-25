import style from "./ProductForm.module.css"
import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
//import { getAllCountries } from "../../Redux/actions";
import axios from "axios";

const numbersRegExp = /^[0-9]+$/
const urlRegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const validate = (form) => {
    let errors = {}
        if(!form.name) {
            errors.name = "*Debe ingresar un nombre"
        }
        if(!form.description) {
            errors.description = "*Debe ingresar una descripción"
        }
        if(!form.brand) {
            errors.brand = "*Debe ingresar una marca"
        }
        if(form.price === null) {
            errors.price = "*Debe ingresar un precio"
        }
        else if(!numbersRegExp.test(form.price)){
            errors.price = "*Precio inválido, debe ingresar un número"
        }
        if(!form.category) {
            errors.category = "*Debe ingresar una categoría"
        }
        if(form.quantity  === null) {
            errors.quantity = "*Debe ingresar cantidad"
        }
        else if(!numbersRegExp.test(form.quantity)){
            errors.quantity = "*Cantidad inválida, debe ingresar un número"
        }
        if(!form.image) {
            errors.image = "*Debe seleccionar una imagen"
        }
        return errors
}


const ProductForm = ({isEditMode, selectedProductId}) => {
    const [button, setButton] = useState(true);
    const [form, setForm] = useState({
       
        name:"",
        description:"",
        brand:"",
        price: null,
        category:"",
        quantity: null,
        image: ""
    });

    const [errors, setErrors] = useState({
       
        name:"",
        description:"",
        brand:"",
        price:"",
        category:"",
        quantity: "",
        image: ""
    });
   
    
    useEffect(()=>{
        setErrors(validate(form));
    }, [form]); 
    
    useEffect(()=>{
        if (form.name.length > 0 && form.description.length > 0 && form.brand.length > 0 && form.price  !== null && form.category.length > 0 && form.quantity  !== null) setButton(false) 
        else setButton(true)
    }, [form, setButton]);
    
    const [notify, setNotify] = useState(false);
    const showNotify = () => {
        setNotify(!notify);
    };
    
    const [modify, setModify] = useState(false);
    const showModify = () => {
        setModify(!notify);
    };

    const handleChange = (e) => {
        const property = e.target.name;
        let value = e.target.value; // Usar let en lugar de const
        
        if (property === "price" || property === "quantity") {
            // Convertir el valor a número
            value = parseInt(value);
        }
    
        const updatedForm = { ...form, [property]: value };
        const updatedErrors = validate(updatedForm);
    
        setForm(updatedForm);
        setErrors(updatedErrors);
    };

    const urlApi = `${process.env.REACT_APP_URL_BACK}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(`${urlApi}/admin/products`, form)
        .then(showNotify())
        .catch(err => {
            console.log(err.response.message);
            alert(err);})
    };
 
    // const handleModify = (e, selectedProductId) => {
    //         e.preventDefault();
    //     // Obtener los datos del producto actual del servidor
    //     axios
    //       .get(`${urlApi}/products/${selectedProductId}`)
    //       .then((response) => {
    //         const productData = response.data; // Datos del producto obtenidos del servidor
      
    //         // Preenlazar el formulario con los datos del producto
    //         setForm({
    //             id: productData.id,
    //           name: productData.name,
    //           description: productData.description,
    //           brand: productData.brand,
    //           price: productData.price,
    //           category: productData.category,
    //           quantity: productData.quantity,
    //           image: productData.image,
    //         });
      
    //         // Realizar las acciones necesarias después de prellenar el formulario
    //         console.log("Producto cargado para modificar:", productData);
    //         // Otras acciones necesarias, como mostrar una notificación, habilitar el botón de modificar, etc.
    //       })
    //       .catch((error) => {
    //         console.log("Error al obtener los datos del producto:", error.response.data);
    //         // Manejar el error, mostrar una notificación de error, etc.
    //       });
    //   };
     
    //   if (isEditMode) {
    //     handleModify(selectedProductId)
    //   }

    // const submitModify = (e) => {
    //     e.preventDefault();
    //     axios
    //       .put(`${urlApi}/admin/products/${form.id}`, form)
    //       .then((response) => {
    //         console.log("Producto modificado:", response.data);
    //         // Restablecer el estado del formulario
    //         setForm({
    //           name: "",
    //           description: "",
    //           brand: "",
    //           price: "",
    //           category: "",
    //           quantity: "",
    //           image: "",
    //         });
    //         // Otras acciones necesarias, como mostrar una notificación de éxito, redirigir a otra página, etc.
    //         showModify()
    //       })
    //       .catch((error) => {
    //         console.log("Error al modificar el producto:", error.response.data);
    //         // Manejar el error, mostrar una notificación de error, etc.
    //       });
    //   };

const category = ["Teclados", "Ratones", "Gabinetes", "Monitores", "Sillas", "Audio", "Camaras", "Mandos"]

    return(
        <div className={style.main_wrapper}>
        <div
            onAnimationEnd={() => setNotify(false)}
            className={`notify ${notify ? "slide-in" : ""}`}>
            <p>El producto ha sido creado exitosamente &nbsp; ✅</p>
        </div>
        <div
            onAnimationEnd={() => setModify(false)}
            className={`notify ${modify ? "slide-in" : ""}`}>
            <p>El producto ha sido modificado exitosamente &nbsp; ✅</p>
        </div>
        <div className={style.container}>
            <form className={style.productForm} onSubmit={handleSubmit} encType="multipart/form-data"> 
            <h1>Crear producto</h1>
                {/* id */}
                <input type="hidden" name="id" value={form.id} />
                {/* name */}
                <div className={style.input_container}>
                    <label>Nombre: </label>
                    <input className={style.input_name} type="text" value={form.name} name="name" placeholder="Nombre..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div> 
                {/* description */}
                <div className={style.input_container}>
                    <label>Descripción: </label>
                    <input className={style.input_name} type="text" value={form.description} name="description" placeholder="Descripción..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.description && <p>{errors.description}</p>}</div> 
                {/* brand */}
                <div className={style.input_container}>
                    <label>Marca: </label>
                    <input className={style.input_name} type="text" value={form.brand} name="brand" placeholder="Marca..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.brand && <p>{errors.brand}</p>}</div>
                {/* price */}
                <div className={style.input_container}>
                    <label>Precio: </label>
                    <input className={style.input_name} type="text" value={form.price} name="price" placeholder="Precio..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.price && <p>{errors.price}</p>}</div>
                {/* category */}
                <div className={style.input_container} name="category" value={form.category} >
                    <label>Elige una categoría:</label>
                    {category.map(c => (
                        <><input type="radio" name="category" value={c} onChange={handleChange} />
                        <label>{c}</label></>))}
                </div>
                <div className={style.error_form}>{errors.category && <p>{errors.category}</p>}</div>
                {/* quantity */}
                <div className={style.input_container}>
                    <label>Cantidad: </label>
                    <input className={style.input_name} type="text" value={form.quantity} name="quantity" placeholder="Cantidad..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.quantity && <p>{errors.quantity}</p>}</div>
                {/* Image */}
                <div  name="image" value={form.image}>
                <label>Seleccionar imagen:</label>
                    <input className={style.input_name} type="text" value={form.image} name="image" placeholder="Imagen..." onChange={handleChange}/>
                </div>
                <div className={style.error_form}>{errors.image && <p>{errors.image}</p>}</div>
                {/* botones submit */}
                {isEditMode ? (
                    <button className={style.button_add} disabled={button} type="submit" >
                         MODIFICAR</button>
                    ) : (
                    <button className={style.button_add} disabled={button} type="submit">
                     CREAR</button>
                )}
            </form>
        </div>
        </div>
    )
}

export default ProductForm;