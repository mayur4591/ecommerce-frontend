import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
  ,CLEAR_AUTH_ERROR
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: localStorage.getItem("jwt"),
  isAuthenticated: !!localStorage.getItem("jwt")
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload);
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        isAuthenticated: true
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        jwt: null,
        isAuthenticated: false
      };

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        user: null,
        isLoading: false,
        error: null,
        jwt: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
