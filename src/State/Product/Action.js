import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_BY_ID_REQUEST,
  FIND_PRODUCTS_BY_ID_FAILURE,
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

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Action to fetch all products for the Home Page (No Filters)
export const fetchAllProducts = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  try {
    const { data } = await api.get(`/api/products/all`, {
      params: {
        pageNumber,
        pageSize,
      },
    });

    console.log("API Response Data:", data); // Should show an object with a 'content' array
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
        type: FIND_PRODUCTS_FAILURE, 
        payload: error.response?.data?.message || error.message 
    });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/products/id/${reqData.productId}`);
    console.log("Product with ID ",data);
    dispatch({ type: FIND_PRODUCTS_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await api.post(`/api/admin/products/`, product.data);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    // Return created product so callers can react (e.g., show success dialog)
    return data;
  } catch (error) {
    // Log server response body to help debugging
    console.error("CREATE_PRODUCT error response:", error.response?.data ?? error.message);
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.response?.data?.message || error.message });
    // Re-throw so callers can catch the error if needed
    throw error;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    await api.delete(`/api/admin/products/${productId}/delete`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }

}