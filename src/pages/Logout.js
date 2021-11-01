import axiosInstance from "../customaxios";
import { useEffect } from "react";

function Logout(props){
    useEffect(() => {
        axiosInstance
        .post(`http://127.0.0.1:8000/api/logout/`,{
            'refresh_token': localStorage.getItem("refresh_token"),
        })
        .then((res)=>{
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          axiosInstance.defaults.headers['Authorization'] = null;
          props.setLoggedIn(false);
          props.history.goBack()
        })
        .catch((e) => {
            console.log(e);
        })
    },[])
    return (
        <>
        </>
)
}

export default Logout;
