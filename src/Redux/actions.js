import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const GET_USERS = "GET_USERS";
export const POST_USERS = "POST_USERS";
export const POST_PRODUCTS = "POST_PRODUCTS";
export const GET_FILTERS = "GET_FILTERS";
export const LOGIN_USER ="LOGIN_USER";
export const LOGOUT_USER="LOGOUT_USER"


export const getProducts = () => {
    return async function(dispatch) {
        try {
        const response = await axios.get(`https://byte-me-backend.onrender.com/api/products?&page=1&limit=100`);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error);
    }
    }
}

export const getProductsById = (id) => {
    return async function(dispatch) {
        const response = await axios.get(`https://byte-me-backend.onrender.com/api/products/${id}`);
        return dispatch({
            type: GET_PRODUCTS_BY_ID,
            payload: response.data
        })
    }
}



export const getProductsByName = (query, page = 1, limit = 10) => {
  return async function (dispatch) {
    try {
      console.log("Buscando productos con query:", query, "en la página:", page, "con límite de:", limit);
      const response = await axios.get(`https://byte-me-backend.onrender.com/api/products/search?query=${query}&page=${page}&limit=${limit}`);
      console.log("Respuesta de la búsqueda de productos:", response.data);
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: response.data
      });
    } catch (error) {
      console.log("Error en getProductsByName: " + error);
    }
  }
}


export const postProducts = () => {
    return async function(dispatch){
        const response = await axios.post('https://byte-me-backend.onrender.com/api/admin/products');
        return dispatch({
            type: POST_PRODUCTS,
            payload: response.data
        })
    }
}

export const getUsers = () => {
    return async function(dispatch){
        const response = await axios.get('https://byte-me-backend.onrender.com/api/auth/login');
        return dispatch({
            type: GET_USERS,
            payload: response.data
        })
    }
}
 


export const loginUser = (credentials) => {
  return async function(dispatch) {
    try {
      const response = await axios.post("https://byte-me-backend.onrender.com/api/auth/login", credentials);
      const user = response.data;
      dispatch({
        type: 'LOGIN_USER',
        payload: user
      });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  }
}

export const logoutUser = () => {
  return function(dispatch) {
    dispatch({
      type: 'LOGOUT_USER'
    });
    localStorage.removeItem("user");
  }
}

  
export const postUsers = () => {
    return async function(dispatch){
        const response = await axios.post('https://byte-me-backend.onrender.com/api/auth/register');
        return dispatch({
            type: POST_USERS,
            payload: response.data
        })
    }
}

export const getFilters = (queryString) => {
    console.log(queryString);
    return async function(dispatch){
        const response = await axios.get(`https://byte-me-backend.onrender.com/api/products/filter?${queryString}`);
        return dispatch({
            type : GET_FILTERS,
            payload : response.data
        })
    }
}
