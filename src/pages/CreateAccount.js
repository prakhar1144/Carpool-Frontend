import {useLocation, useHistory} from 'react-router-dom'
import axiosInstance from '../customaxios'
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CreateAccount({setLoggedIn}) {
    let query = useQuery();
    const [Invalid, setInvalid] = useState(false);
    const [open, setOpen] = useState(true);
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
          setOpen(false);
          history.push("/")
        })
        .catch((e) => {
            if(e.response && (e.response.status === 406 || e.response.status === 400))
            {
                setOpen(false);
                setInvalid(true);
            }
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={Invalid} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error, try signing up again!
                </Alert>
            </Snackbar>
        </>
    )
}

export default CreateAccount;