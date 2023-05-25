import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const GET_USERS = "GET_USERS";
export const POST_USERS = "POST_USERS";
export const POST_PRODUCTS = "POST_PRODUCTS";
export const GET_FILTERS = "GET_FILTERS";
export const LOGIN_USER ="LOGIN_USER";
export const LOGOUT_USER="LOGOUT_USER";
export const GET_ALL_PRODUCTS="GET_ALL_PRODUCTS";
export const LOGICAL_DELETION = "LOGICAL_DELETION";

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

// export const loginUser = (credentials) => {
//   return async function(dispatch) {
//     try {
//       const response = await axios.post(`${URL_BASE}/auth/login`, credentials);
//       const user = response.data;
//       dispatch({
//         type: 'LOGIN_USER',
//         payload: user
//       });
//       localStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// export const logoutUser = () => {
//   return function(dispatch) {
//     dispatch({
//       type: 'LOGOUT_USER'
//     });
//     localStorage.removeItem("user");
//   }
// }



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
              const response = await axios.get(`${URL_BASE}/user`);
              return dispatch({
                  type: GET_USERS,
                  payload: response.data
              })
          }
      }

    export const logicalDeletion = (id) => {
      return async function (dispatch){
        await axios.put(`${URL_BASE}/admin/${id}`);
        dispatch({
          type: LOGICAL_DELETION,
          payload: id,
        })
      }
    }