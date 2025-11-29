import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";
import { store } from "../../State/Store";
const RegisterForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store)
 
  useEffect(() => {
    if(jwt){
      dispatch(getUser())
    }
  },[jwt,auth.jwt])



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData =  Object.fromEntries(data.entries());

    dispatch(register(userData))
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              backgroundColor: "#9155FD",
              padding: ".8rem 0",
              "&:hover": { backgroundColor: "#7b46d9" },
            }}
          >
            Register
          </Button>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>Already have an accoun?</p>
          <Button onClick={()=> navigate("/login")} className="ml-5" size="small">Login</Button>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
