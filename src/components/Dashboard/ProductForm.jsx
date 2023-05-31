import style from "./ProductForm.module.css"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getAllCountries } from "../../Redux/actions";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getProductsById } from "../../Redux/actions";
import notavailable from "../../img/notAvailableImage/notavailable.jpg"

const numbersRegExp = /^[0-9]+$/
const priceRegExp = /\d{1,3}[,\\.]?(\\d{1,2})?/

const validate = (form, image) => {
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
        else if(!priceRegExp.test(form.price)){
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
        if(image !== File) {
            errors.image = "*Debe seleccionar una imagen"
        }
        return errors
}


const ProductForm = () => {
    const [button, setButton] = useState(true);
    const [form, setForm] = useState({
        id: "",
        name:"",
        description:"",
        brand:"",
        price: null,
        category:"",
        quantity: null,
    });
    const [image, setImage] = useState();
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
        setErrors(validate(form, image));
    }, [form, image]); 
    
    useEffect(()=>{
        if (form.name.length > 0 && form.description.length > 0 && form.brand.length > 0 && form.price !== null && form.category.length > 0 && form.quantity  !== null && image !== undefined) setButton(false) 
        else setButton(true)
    }, [form, image, setButton]);
    
    const [notify, setNotify] = useState(false);
    const showNotify = () => {
        setNotify(!notify);
    };

    const handleChange = (e) => {
        const property = e.target.name;
        let value = e.target.value; // Usar let en lugar de const
        
        const updatedForm = { ...form, [property]: value };
        const updatedErrors = validate(updatedForm);
    
        setForm(updatedForm);
        setErrors(updatedErrors);
    };

    const urlApi = `${process.env.REACT_APP_URL_BACK}`;

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("description", form.description)
        formData.append("brand", form.brand)
        formData.append("price", form.price)
        formData.append("category", form.category)
        formData.append("quantity", form.quantity)
        formData.append("image", image)
        axios
        .post(`${urlApi}/admin/products`,formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        .then(showNotify())
        .catch(err => {
            console.log(err.response.message);
            alert(err);})
    };
    
    // const location = useLocation();
    // const isEditMode = location.state && location.state.isEditMode;
    // const {id, name, description, brand, price, category, quantity, imageM} = location.state;
    // console.log(isEditMode)
    // console.log(id);
    // console.log(name)

    // useEffect((e) => {
    //     if (isEditMode && location.state){
    //     const productData = { isEditMode, id, name, description, brand, price, category, quantity, imageM }
    //            // Preenlazar el formulario con los datos del producto
    //            setForm((prevForm) => ({
    //             ...prevForm,
    //             //id: productData.id,
    //             name: productData.name,
    //             description: productData.description,
    //             brand: productData.brand,
    //             price: productData.price,
    //             category: productData.category,
    //             quantity: productData.quantity,
    //             image: productData.imageM
    //           }));
         
    //            console.log("Producto cargado para modificar:", productData);  
    //     } else {
    //         handleChange(e)
    //     }
    // }, [isEditMode,id, name, description, brand, price, category, quantity, imageM])
      
     
    //   if (isEditMode) {
    //     handleModify(selectedProductId)
    //   }

    // const handleModifySubmit = (e) => {
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

    const categories = ["Teclados", "Ratones", "Gabinetes", "Monitores", "Sillas", "Audio", "Camaras", "Mandos"]

    const handleImage = (e) => {
        setImage(e.target.files[0])
        setErrors(validate({[image]:e.target.files[0]}))
        previewImage()
            
    }

    function previewImage() {
        var file = document.getElementById("image").files
        if (file.length > 0) {
            var fileReader = new FileReader()

            fileReader.onload = function (event) {
                document.getElementById("preview").setAttribute("src", event.target.result)
            }

            fileReader.readAsDataURL(file[0])
        }else {
            // Si no hay imagen seleccionada, puedes mostrar una imagen predeterminada o limpiar la vista previa
            document.getElementById("preview").setAttribute("src", {notavailable}); // Limpiar la vista previa
            //document.getElementById("preview").setAttribute("src", "ruta_a_imagen_predeterminada"); // Mostrar imagen predeterminada
          }
    }

    return(
        <div className={style.main_wrapper}>
        <div
            onAnimationEnd={() => setNotify(false)}
            className={`notify ${notify ? "slide-in" : ""}`}>
            <p>El producto ha sido creado exitosamente &nbsp; ✅</p>
        </div>
        <div className={style.container}>
            <form className={style.productForm} encType="multipart/form-data" onSubmit={handleCreateSubmit}> 
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
                    {categories.map(c => (
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
                <div  name="image" value={image}>
                <label>Seleccionar imagen:</label>
                    <input type="file" id="image" name="image" onChange={handleImage}/>
                    <img id="preview" width="150" height="150" src={notavailable} />
                </div>
                <div className={style.error_form}>{errors.image && <p>{errors.image}</p>}</div>
                {/* botones submit */}
                    <button className={style.button_add} disabled={button} type="submit">
                     CREAR</button>
            </form>
        </div>
        </div>
    )
}

export default ProductForm;