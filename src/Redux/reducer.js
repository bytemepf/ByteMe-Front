import { GET_PRODUCTS, 
    GET_PRODUCTS_BY_ID, 
    GET_PRODUCTS_BY_NAME, 
    GET_USERS, 
    POST_USERS, 
    GET_FILTERS,
    POST_PRODUCTS,
    LOGIN_USER,
    LOGOUT_USER } from "./actions"

let initialState = {
    products: [],
    users: [],
    details: [],
    filteredProducts: [],
    filterByName: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
            
        case GET_PRODUCTS_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        case GET_PRODUCTS_BY_NAME:
            return {
                ...state,
                products: action.payload.data
            }
        case POST_PRODUCTS:
            return{
                ...state,
                products: [...state.products, action.payload]
            }
        case GET_USERS: 
            return{
                ...state,
                users: action.payload
            }
        case POST_USERS:
            return{
                ...state,
                users: [...state.users, action.payload]
            }

        case GET_FILTERS:
            return {
                ...state,
                filteredProducts: action.payload.data
            }

            case LOGIN_USER:
                return{
                    ...state,
                    isLoggedIn: true,
                    token: action.payload.token,
                    user: action.payload.user
                }
            case LOGOUT_USER:
                return{
                    ...state,
                    isLoggedIn: false,
                    token: null,
                    user: null
                }
    

        default:
            return{
            ...state,
        }
    }
}

export default rootReducer;