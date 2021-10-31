import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function LogIn({setLoggedIn}) {
  const [Invalid, setInvalid ] = useState(false);
  const handleInvalidClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInvalid(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'))
    console.log(data.get('password'));
    axiosInstance.defaults.headers['Authorization'] = null;
    axiosInstance
    .post(`http://127.0.0.1:8000/api/login/`,{
        'email':data.get('email'),
        'password':data.get('password'),
      })
    .then((res)=>{
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = 
      'Bearer ' + localStorage.getItem('access_token');
       setLoggedIn(true);
       setInvalid(false);
    })
    .catch((e) => {
        console.log(e); // handling network error is pending
        setInvalid(true);
    })
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={Invalid} autoHideDuration={6000} onClose={handleInvalidClose}>
          <Alert onClose={handleInvalidClose} severity="error" sx={{ width: '100%' }}>
            Invalid Email/Password!
          </Alert>
        </Snackbar>
      </Container>
  );
}
