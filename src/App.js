import './App.css';
import Navigationbar from './components/Navigationbar';
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
import CreateAccount from './pages/CreateAccount';
import { NotFound } from './pages/NotFound';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Logout from './pages/Logout'

function App() {

  const create_ride = {
    position: 'fixed',
    bottom: 16,
    right: 32,
  };
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const rt = localStorage.getItem("refresh_token");
    console.log(rt);
    if(rt)
    {
      axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
      axios.post('/token/refresh/',
      {
        'refresh':rt
      })
      .then((response)=>{
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setLoggedIn(true);
      })
      .catch((e)=>{
        console.log(e)
      })
    }
  }, [])

  return (
    <>
    <BrowserRouter>
      <Navigationbar loggedIn={LoggedIn}/>

      <Switch>
          <Route path="/new" >{ LoggedIn ? <CreateRide/> : <Redirect to="/login"/>}</Route>
          <Route path="/login"><LogIn setLoggedIn={setLoggedIn}/></Route>
          <Route path="/logout"><Logout setLoggedIn={setLoggedIn}/></Route>
          <Route path="/signup" ><Register/></Route>
          <Route path="/verify"><CreateAccount setLoggedIn={setLoggedIn}/></Route>
          <Route path="/" exact>
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
          <Route><NotFound/></Route>
      </Switch>
      <Fab component={Link} to="/new" color="primary" size="large" sx={create_ride}>
        <AddIcon />
      </Fab>
    </BrowserRouter>
    </>
  );
}

export default App;
