import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from '../customaxios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

function ForgotPassword() {
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
    
        axiosInstance
        .post(process.env.REACT_APP_BACKEND_URL + 'api/reset/',{
            'email': data.get('email'),
          })
        .then((res)=>{
            if(res.status===200)
            {
                alert("check mail");
            }
            else if(res.status===204)
            {
                setInvalid(true);
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
                Forgot Password
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
            No user is registered with that mail !
          </Alert>
        </Snackbar>
      </Container>
    )
}

export default ForgotPassword
