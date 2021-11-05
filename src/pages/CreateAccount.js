import {useLocation, useHistory} from 'react-router-dom'
import axiosInstance from '../customaxios'
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CreateAccount({setLoggedIn}) {
    let query = useQuery();
    const [Invalid, setInvalid] = useState(false);
    let history = useHistory()
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setInvalid(false);
    };
    useEffect(()=>
    {
        axiosInstance
        .get(process.env.REACT_APP_BACKEND_URL + `api/createaccount/?token=${query.get("token")}`)
        .then((res)=>{
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          localStorage.setItem('user_id', res.data.user_id);
          axiosInstance.defaults.headers['Authorization'] = 
          'Bearer ' + localStorage.getItem('access_token');
          setLoggedIn(true);
          history.push("/")
        })
        .catch((e) => {
            if(e.response && (e.response.status === 406 || e.response.status === 400))
            {
                setInvalid(true);
            }
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
        <h1>Verifying Email...</h1>
            <Snackbar open={Invalid} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error, try signing up again!
                </Alert>
            </Snackbar>
        </>
    )
}

export default CreateAccount;