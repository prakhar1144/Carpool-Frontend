import './App.css';
import Navigationbar from './components/Navigationbar';
import Ridecard from './components/Ridecard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Trialcard from './components/Trialcard';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Register from './pages/Register'
import LogIn from './pages/Login';
import CreateRide from './pages/CreateRide';

function App() {
  const create_ride = {
    position: 'fixed',
    bottom: 16,
    right: 32,
  };

  return (
    <>
    <BrowserRouter>
      <Navigationbar />
      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Carpool</Typography>
        </Toolbar>
      </AppBar> */}

      <Switch>
          <Route path="/new" ><CreateRide/></Route>
          <Route path="/login" ><LogIn/></Route>
          <Route path="/signup" ><Register/></Route>
          <Route path="/">
          <Container>
              <h3 className="text-center my-5">Upcoming Rides</h3>
              <Grid container spacing={3}>
                <Trialcard/>
                <Trialcard/>
                <Trialcard/>
                <Trialcard/>
                <Trialcard/>
                <Trialcard/>
              </Grid>
          </Container>
          </Route>
      </Switch>
      <Fab component={Link} to="/new" color="primary" size="large" sx={create_ride}>
        <AddIcon />
      </Fab>
    </BrowserRouter>
    </>
  );
}

export default App;
