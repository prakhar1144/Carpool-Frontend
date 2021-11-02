import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory, useLocation } from 'react-router';
import axiosInstance from '../customaxios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ForgotPassword() {
    let query = useQuery();
    let history = useHistory();
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
        console.log(query)
        axiosInstance
        .put(`http://127.0.0.1:8000/api/reset/`,{
            'new_password': data.get('password'),
            'secret_code': query.get("token"),
          })
        .then((res)=>{
            if(res.status===200)
            {
                history.push("/login");
            }
        })
        .catch((e)=>{
            console.log(e);
            setInvalid(true);
        })
    }
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
                New Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              Submit
            </Button>
          </Box>
        </Box>
        <Snackbar open={Invalid} autoHideDuration={6000} onClose={handleInvalidClose}>
          <Alert onClose={handleInvalidClose} severity="error" sx={{ width: '100%' }}>
            Some Error Occurred !
          </Alert>
        </Snackbar>
      </Container>
    )
}

export default ForgotPassword
