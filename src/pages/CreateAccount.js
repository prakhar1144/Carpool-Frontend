import {useLocation, useHistory} from 'react-router-dom'
import axiosInstance from '../axios'
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CreateAccount({setLoggedIn}) {
    let query = useQuery();
    console.log(query.get("token"));
    const [Invalid, setInvalid] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setInvalid(false);
    };
    useEffect(()=>
    {
        axiosInstance
        .get(`http://127.0.0.1:8000/api/createaccount/?token=${query.get("token")}`)
        .then((res)=>{
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          axiosInstance.defaults.headers['Authorization'] = 
          'Bearer ' + localStorage.getItem('access_token');
          setLoggedIn(true);
        })
        .catch((e) => {
            if(e.response && (e.response.status === 406 || e.response.status === 400))
            {
                setInvalid(true);
            }
        })
    },[])
    return (
        <>
        <h1>Verifying Email, lets redirect to login ater email verified</h1>
            <Snackbar open={Invalid} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error, try signing up again!
                </Alert>
            </Snackbar>
        </>
    )
}

export default CreateAccount;