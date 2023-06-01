import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const GET_USERS = "GET_USERS";
export const POST_USERS = "POST_USERS";
export const POST_PRODUCTS = "POST_PRODUCTS";
export const MODIFY_PRODUCT = "MODIFY_PRODUCT";
export const GET_FILTERS = "GET_FILTERS";
export const LOGIN_USER ="LOGIN_USER";
export const LOGOUT_USER="LOGOUT_USER";
export const GET_ALL_PRODUCTS="GET_ALL_PRODUCTS";
export const LOGICAL_DELETION = "LOGICAL_DELETION";
export const LOGICAL_DELETION_PRODUCTS = "LOGICAL_DELETION_PRODUCTS";

export const ADD_CART = "ADD_CART";
export const CART_BY_USER = "CART_BY_USER"
export const ALL_ORDERS_BY_USER = "ALL_ORDERS_BY_USER"
export const GET_ID_USER = "GET_ID_USER"
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID"
export const SET_CURRENT_USER = "SET_CURRENT_USER";


//export const URL_BASE = "http://localhost:8080/api"
export const URL_BASE = "https://byte-me-backend.onrender.com/api"


export const getProducts = (page, limit) => {
    return async function(dispatch) {
        try {
        const response = await axios.get(`${URL_BASE}/products?&page=${page}&limit=${limit}`);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    } catch (error) {
        console.log(error);
    }
    }
}

export const getProductsById = (id) => {
    return async function(dispatch) {
        const response = await axios.get(`${URL_BASE}/products/${id}`);
        return dispatch({
            type: GET_PRODUCTS_BY_ID,
            payload: response.data
        })
    }
}

export const getProductsByName = (query, page = 1, limit = 10) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/products/search?query=${query}&page=${page}&limit=${limit}`);
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
        const response = await axios.post(`${URL_BASE}/admin/products`);
        return dispatch({
            type: POST_PRODUCTS,
            payload: response.data
        })
    }
}

export const modifyProduct = (id, products) => {
  return async function (dispatch){
    const response = await axios.put(`${URL_BASE}/admin/products/${id}`, products);
    const modifiedProduct = response.data;

    dispatch({type: MODIFY_PRODUCT, payload: modifiedProduct});
    
  }
}

export const getFilters = (queryString) => {
  console.log(queryString);
  return async function(dispatch){
    const response = await axios.get(`${URL_BASE}/products/filter?${queryString}`);
    return dispatch({
      type : GET_FILTERS,
      payload : response.data
    })
  }
}

  export const getAllProducts = () => {
    return async function(dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/products?limit=1000`);
        return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: response.data.data
        })
      } catch (error) {
        console.log(error);
      }}
    }
  
  export const postUsers = (user) => {
    return async function(dispatch) {
      try {
        const response = await axios.post(`${URL_BASE}/auth/register`, user);
        const newUser = response.data;
        console.log(newUser);
        dispatch({
          type: POST_USERS,
          payload: newUser,
        });
      
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const getUsers = () => {
    return async function(dispatch){
              const response = await axios.get(`${URL_BASE}/user/info`);
              return dispatch({
                  type: GET_USERS,
                  payload: response.data
              })
          }
      }

    export const logicalDeletion = (id) => {
      return async function (dispatch){
        await axios.put(`${URL_BASE}/admin/user/active/${id}`);
        dispatch({
          type: LOGICAL_DELETION,
          payload: id,
        })
      }
    }
    export const iduser = (email) => {
      return async function(dispatch){
        const response = await axios.get(`${URL_BASE}/user/${email}`)
        return dispatch ({type: GET_ID_USER, payload: response.data});
      }

    }
    export const addCart = (user_id) => { //agregar al carrito
      return async function(dispatch){
        try{
          const response = await axios.post(`${URL_BASE}/cart/${user_id}`)
          console.log('producto recibido',response.data)
          return dispatch ({type: ADD_CART, payload: response.data});
        }
        catch(error){
          console.log(error.message)
        }
      }
    }
    
    export function getcartUserById(user_id){
      return async function(dispatch){
        try{
          const cart = await axios.get(`${URL_BASE}/cart/${user_id}`);
          return dispatch({
            type: CART_BY_USER, payload: cart.data
          });
        }catch(error){
          console.log(error.message);
        }
      }
    }
    export const allOrdersByUser = (user_id) => {
      return async function(dispatch){
        const orders = await axios.get(`${URL_BASE}/cart/${user_id}`);
          return dispatch({
            type: ALL_ORDERS_BY_USER, payload: orders.data
          })
      }
    }
    export const setCurrentUser = (user) => {
      return {
        type: SET_CURRENT_USER,
        payload: user,
      };
    };
    export const getOrderById = () => {
      return async function(dispatch) {
          const response = await axios.get(`${URL_BASE}/order/pagar`);
          console.log(response.data)
          return dispatch({
              type: GET_ORDER_BY_ID,
              payload: response.data
              
          })
      }
  }


    export const logicalDeletionProducts = (id) => {
      return async function (dispatch){
        await axios.put(`${URL_BASE}/admin/products/active/${id}`);
        dispatch({
          type: LOGICAL_DELETION_PRODUCTS,
          payload: id,
        })
      }
    }




