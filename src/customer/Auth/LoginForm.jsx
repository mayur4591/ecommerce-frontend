import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";
const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
    const userData =  Object.fromEntries(data.entries());
    dispatch(login(userData))
    console.log(userData)

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
            Log IN
          </Button>
        </Grid>
      </form>

            <div className="flex justify-center flex-col items-center">
              <div className="py-3 flex items-center">
                <p>Don't have an account?</p>
                <Button onClick={()=> navigate("/register")} className="ml-5" size="small">Register</Button>
              </div>
            </div>
    </div>
  );
};
export default LoginForm;
