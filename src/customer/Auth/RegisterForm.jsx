import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  // ✅ Select only auth slice
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [jwt, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = Object.fromEntries(data.entries());
    dispatch(register(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required name="firstName" label="First Name" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required name="lastName" label="Last Name" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required name="email" label="Email" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              fullWidth
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
          <p>Already have an account?</p>
          <Button
            onClick={() => navigate("/login", { replace: true })}
            className="ml-5"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
