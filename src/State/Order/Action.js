import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    console.log("BEFORE_CREATING_ORDER: ",reqData)
    const { data } = await api.post(`/api/orders/`, reqData.address);
    console.log("ORDER_CREATED_DATA: ",data);
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  try {
    console.log("ORDER_ID",orderId)
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    const { data } = await api.get(`api/orders/${orderId}`);
    console.log("OREDR_BY_ID",data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

export const getOrderHistory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });
    console.log("📤 Calling API: /api/orders/user");

    const { data } = await api.get("/api/orders/user");

    console.log("✅ Order History API Response:", data);

    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("❌ Order History API Error:", error);

    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};



