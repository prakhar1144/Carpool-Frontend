import './App.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { withRouter } from 'react-router';
import { useState,useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Chat from './pages/Chat';
import LogIn from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register'
import ListRides from './pages/ListRides';
import CreateRide from './pages/CreateRide';
import { NotFound } from './pages/NotFound';
import NewPassword from './pages/NewPassword';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import Navigationbar from './components/Navigationbar';

function App(props) {

  const create_ride = {
    position: 'fixed',
    bottom: 16,
    right: 32,
  };

  const [LoggedIn, setLoggedIn] = useState(false);

  // When a user visits the site, try to fetch refresh_token from localstorage. If exists, try to login user.
  useEffect(() => {

    const refresh_token = localStorage.getItem("refresh_token");

    if(refresh_token)
    {
      axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL + 'api';
      axios.post('/token/refresh/',
      {
        'refresh':refresh_token
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
      <Navigationbar loggedIn={LoggedIn}/>

      <Switch>
          <Route path="/new" >{ LoggedIn ? <CreateRide/> : <Redirect to="/login"/>}</Route>
          <Route path="/login" render={(props)=> <LogIn setLoggedIn={setLoggedIn} {...props}/>} />
          <Route path="/logout" render={(props)=> <Logout setLoggedIn={setLoggedIn} {...props}/>} />
          <Route path="/signup" ><Register/></Route>
          <Route path="/verify"><CreateAccount setLoggedIn={setLoggedIn}/></Route>
          <Route path="/reset"><ForgotPassword/></Route>
          <Route path="/newpassword"><NewPassword/></Route>
          <Route path="/chat/:id" children={<Chat/>}></Route>
          <Route path="/" exact>
            <ListRides/>
          </Route>
          <Route><NotFound/></Route>
      </Switch>
      {
        props.location.pathname.includes('/chat/')
        ?
        null
        : 
          <Fab component={Link} to="/new" color="primary" size="large" sx={create_ride}>
            <AddIcon />
          </Fab>
      }
    </>
  );
}

export default withRouter(App);
