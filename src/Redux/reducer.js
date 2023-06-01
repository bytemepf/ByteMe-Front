import { GET_PRODUCTS, 
    GET_PRODUCTS_BY_ID, 
    GET_PRODUCTS_BY_NAME, 
    GET_USERS, 
    POST_USERS, 
    GET_FILTERS,
    POST_PRODUCTS,
    MODIFY_PRODUCT,
    LOGIN_USER,
    LOGOUT_USER,
    GET_ALL_PRODUCTS, 
    LOGICAL_DELETION,
    LOGICAL_DELETION_PRODUCTS,
    ADD_CART,
    GET_ID_USER,GET_ORDER_BY_ID,
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
    search: [] ,
    cart: [],
    orders:[],
    iduser:[]
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
            case GET_ORDER_BY_ID:
            return {
                ...state,
                orders: action.payload
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
        case MODIFY_PRODUCT:
            const modifiedProduct = action.payload;
            const updatedModifiedProducts = state.products.map((products) => {
                if (products.data.id === modifiedProduct.data.id) {
                // Actualiza el producto si los ID coinciden
                return modifiedProduct;
                }
        return products;
      });

      return {
        ...state,
        products: updatedProducts,
      };
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
            case GET_ID_USER:
                return{
                    ...state,
                    iduser:  action.payload
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
                console.log(updatedUsers)
                delete updatedUsers[action.payload];
                return {
                    ...state,
                    users: updatedUsers,
                };

            case LOGICAL_DELETION_PRODUCTS: 
                const updatedProducts = [ ...state.products.data];
                console.log(updatedProducts);
                delete updatedProducts[action.payload];
                return {
                    ...state,
                    allProducts: updatedProducts
                    } 
                

            case ADD_CART:
                return {
                  ...state,
                  cart: action.payload,
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