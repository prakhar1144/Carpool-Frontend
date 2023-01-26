import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import axiosInstance from '../customaxios'
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Register() {
  const [exists, setExists] = useState(false);
  const [Invalid, setInvalid ] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExistsClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setExists(false);
  };
  const handleInvalidClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInvalid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop default behaviour like refresh on submit
    const data = new FormData(event.currentTarget);
    setLoading(true);
    axiosInstance
    .post(process.env.REACT_APP_BACKEND_URL + 'api/signup/',{
        'email':data.get('email'),
        'password':data.get('password'),
      })
    .then((res)=>{
        alert("check your mail");
    })
    .catch((e) => {
        if (e.response && e.response.data.email[0]==="user with this email already exists.")
        {
          setExists(true);
        }
        else if (e.response && e.response.data.email[0]==="Enter a valid email address.")
        {
          setInvalid(true);
        }
        console.log(e);
    })
    .finally(()=>{
      setLoading(false);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              loadingIndicator="Signing Up..."
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Snackbar open={exists} autoHideDuration={6000} onClose={handleExistsClose}>
          <Alert onClose={handleExistsClose} severity="error" sx={{ width: '100%' }}>
            User Already Exists!
          </Alert>
        </Snackbar>
        <Snackbar open={Invalid} autoHideDuration={6000} onClose={handleInvalidClose}>
          <Alert onClose={handleInvalidClose} severity="error" sx={{ width: '100%' }}>
            Invalid Email!
          </Alert>
        </Snackbar>

      </Container>
  );
}
