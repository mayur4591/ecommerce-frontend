import {
    GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
    CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE,
    PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, PLACED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE,
    CANCELLED_ORDER_REQUEST, CANCELLED_ORDER_SUCCESS, CANCELLED_ORDER_FAILURE,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,
    SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS, SHIP_ORDER_FAILURE
} from "../Order/ActionType";

const initialState = {
    loading: false,
    orders: [],
    error: "",

    confirmedSuccess: false,
    shippedSuccess: false,
    deliveredSuccess: false,
    cancelledSuccess: false,
    deleteSuccess: false,
};

const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {

        // ================= GET ALL ORDERS =================
        case GET_ORDERS_REQUEST:
            return { ...state, loading: true };

        case GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: "" };

        case GET_ORDERS_FAILURE:
            return { ...state, loading: false, orders: [], error: action.payload };


        // =========== REQUEST (RESET FLAGS HERE) ===========
        case CONFIRMED_ORDER_REQUEST:
            return { ...state, loading: true, confirmedSuccess: false };

        case SHIP_ORDER_REQUEST:
            return { ...state, loading: true, shippedSuccess: false };

        case DELIVERED_ORDER_REQUEST:
            return { ...state, loading: true, deliveredSuccess: false };

        case CANCELLED_ORDER_REQUEST:
            return { ...state, loading: true, cancelledSuccess: false };

        case DELETE_ORDER_REQUEST:
            return { ...state, loading: true, deleteSuccess: false };


        // =============== SUCCESS ===================
        case CONFIRMED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmedSuccess: true,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };

        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                shippedSuccess: true,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };

        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                deliveredSuccess: true,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };

        case CANCELLED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                cancelledSuccess: true,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteSuccess: true,
                orders: state.orders.filter(order => order.id !== action.payload)
            };


        // ================= FAILURE =================
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELLED_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };


        default:
            return state;
    }
};

export default adminOrderReducer;
