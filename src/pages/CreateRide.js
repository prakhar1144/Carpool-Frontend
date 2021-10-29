import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BasicDateTimePicker from '../components/BasicDateTime';

export default function CreateRide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
           <LocalTaxiOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
           New Ride
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="destination"
                  placeholder="Destination"
                  name="destination"
                />
              </Grid>
              <Grid item xs={12}>
                <BasicDateTimePicker/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
        </Box>
        </Box>
    </Container>
  )
}