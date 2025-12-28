import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { CLEAR_AUTH_ERROR } from "./ActionType"


const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (user) => ({type:REGISTER_SUCCESS,payload:user});
const registerFailure = (error) => ({type:REGISTER_FAILURE,payload:error});

export const register = (userData) => async (dispatch) => {

    dispatch(registerRequest())


    try{
        const response = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
        const user =response.data;

        if(user.jwt){

            localStorage.setItem("jwt",user.jwt)

        }
        console.log("GET_USER",user)

        dispatch(registerSuccess(user.jwt))
        // After successful signup, fetch the user's profile so UI updates accordingly
        dispatch(getUser())
    }catch(error) {
        dispatch(registerFailure(error.message))
        console.log(error)
    }

}


const loginRequest = () => ({type:LOGIN_REQUEST});
const loginSuccess = (user) => ({type:LOGIN_SUCCESS,payload:user});
const loginFailure = (error) => ({type:LOGIN_FAILURE,payload:error});

export const login = (userData) => async (dispatch) => {
    
    dispatch(loginRequest())
    try{
        const response = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
        const user =response.data;

        if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
        }
        console.log("LOGIN_USER",user)
        dispatch(loginSuccess(user.jwt))
        // Fetch the authenticated user's profile so UI components depending on `auth.user` update
        dispatch(getUser())
    }catch(error) {
        dispatch(loginFailure(error.message))
        console.log(error)
    }
}



const getUserRequest = () => ({type:GET_USER_REQUEST});
const getUserSuccess = (user) => ({type:GET_USER_SUCCESS,payload:user});
const getUserFailure = (error) => ({type:GET_USER_FAILURE,payload:error});


export const getUser = (userData) => async (dispatch) => {
    
    dispatch(getUserRequest())
    try{
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        const user =response.data;
        console.log("GET_USER",user)
        
        dispatch((getUserSuccess(user)))
    }catch(error) {
        dispatch(getUserFailure(error.message))
        console.log(error)
    }
}


export const logout = () => (dispatch) => {
    dispatch({type:LOGOUT,payload:null})
    localStorage.clear()
}

export const clearAuthError = () => (dispatch) => {
    dispatch({ type: CLEAR_AUTH_ERROR })
}
