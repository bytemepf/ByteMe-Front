import { GET_PRODUCTS, 
    GET_PRODUCTS_BY_ID, 
    GET_PRODUCTS_BY_NAME, 
    GET_USERS, 
    POST_USERS, 
    GET_FILTERS,
    POST_PRODUCTS,
    LOGIN_USER,
    LOGOUT_USER,
    GET_ALL_PRODUCTS, 
    LOGICAL_DELETION,
    SET_CURRENT_USER} from "./actions"

let initialState = {
    products: {
        data: [],
        totalProducts: 0,
        totalPages: 0,
        page: 1
    },
    users: [],
    currentUser: null,
    details: [],
    filterByName: [],
    allProducts: [],
    search: [] 
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: {
                    ...state.products,
                    data: action.payload.data,
                    totalProducts: action.payload.totalProducts,
                    totalPages: action.payload.totalPages,
                    page: action.payload.page
                }
            }
            
        case GET_PRODUCTS_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        case GET_PRODUCTS_BY_NAME:
            return {
                ...state,
                search: action.payload.data
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
                products: {
                    ...state.products,
                    data: action.payload.data,
                    totalProducts: action.payload.totalProducts,
                    totalPages: action.payload.totalPages,
                    page: action.payload.page
                }
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
            
            case GET_ALL_PRODUCTS:
                return{
                    ...state,
                    allProducts: action.payload
                }
            
            case LOGICAL_DELETION:
                const updatedUsers = { ...state.users };
                delete updatedUsers[action.payload];
                return {
                    ...state,
                    users: updatedUsers,
                };
                case SET_CURRENT_USER:
                    return {
                        ...state,
                        currentUser: action.payload,
                    };
            
        default:
            return{
            ...state,
        }
    }
}

export default rootReducer;