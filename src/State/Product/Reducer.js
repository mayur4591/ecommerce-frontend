import {
    FIND_PRODUCTS_BY_ID_FAILURE,
    FIND_PRODUCTS_BY_ID_REQUEST,
    FIND_PRODUCTS_BY_ID_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from "./ActionType";

const initialState = {
    products: [], // Will hold the Page object (with .content)
    product: null, // Will hold single product details
    loading: false,
    error: null,
};

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        // 1. ALL REQUESTS
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCTS_BY_ID_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        // 2. FETCH MULTIPLE PRODUCTS (Listings/Home)
        case FIND_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null,
            };

        // 3. FETCH SINGLE PRODUCT (Details Page)
        case FIND_PRODUCTS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
                error: null,
            };

        // 4. CREATE PRODUCT (Admin)
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                // Safely handle adding to the content array
                products: {
                    ...state.products,
                    content: [action.payload, ...(state.products?.content || [])]
                },
                error: null,
            };

        // 5. DELETE PRODUCT (Admin)
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                // Filter the ID out of the content array inside the Page object
                products: {
                    ...state.products,
                    content: (state.products?.content || []).filter((item) => item.id !== action.payload)
                },
                error: null,
            };

        // 6. ALL FAILURES
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCTS_BY_ID_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        case CREATE_PRODUCT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        default:
            return state;
    }
};