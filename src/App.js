import './App.css';
import Navigationbar from './components/Navigationbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
import ListRides from './pages/ListRides';
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import Chat from './pages/Chat';

function App() {

  const create_ride = {
    position: 'fixed',
    bottom: 16,
    right: 32,
  };
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const rt = localStorage.getItem("refresh_token");
    if(rt)
    {
      axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL + 'api';
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
      <Fab component={Link} to="/new" color="primary" size="large" sx={create_ride}>
        <AddIcon />
      </Fab>
    </BrowserRouter>
    </>
  );
}

export default App;
