import axiosInstance from "../customaxios";
import { useEffect } from "react";

function Logout(props){
    useEffect(() => {
        axiosInstance
        .post(process.env.REACT_APP_BACKEND_URL + 'api/logout/',{
            'refresh_token': localStorage.getItem("refresh_token"),
        })
        .then((res)=>{
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_id');
          axiosInstance.defaults.headers['Authorization'] = null;
          props.setLoggedIn(false);
          props.history.push("/")
        })
        .catch((e) => {
            console.log(e);
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        </>
)
}

export default Logout;
