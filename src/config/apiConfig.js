import axios from "axios"

export const API_BASE_URL = "http://localhost:8080"
const jwt = localStorage.getItem("jwt")


export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type" : "application/json"
    }
})

api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("jwt");
    console.log("Token is ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);