import { Button, Grid, TextField, CircularProgress, Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";
const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
            disabled={auth.isLoading}
            sx={{
              backgroundColor: "#9155FD",
              padding: ".8rem 0",
              "&:hover": { backgroundColor: "#7b46d9" },
            }}
          >
            {auth.isLoading ? (
              <>
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} /> Logging in...
              </>
            ) : (
              "Log IN"
            )}
          </Button>
        </Grid>
      </form>

      {auth.error && (
        <div className="mt-4">
          <Alert severity="error">{auth.error}</Alert>
        </div>
      )}

            <div className="flex justify-center flex-col items-center">
              <div className="py-3 flex items-center">
                <p>Don't have an account?</p>
                <Button onClick={()=> navigate("/register", { replace: true })} className="ml-5" size="small">Register</Button>
              </div>
            </div>
    </div>
  );
};
export default LoginForm;
