import { Redirect } from "react-router";
import axiosInstance from "../axios";
import { useEffect } from "react";

function Logout({setLoggedIn}){
    useEffect(() => {
        console.log(localStorage.getItem("refresh_token"))
        console.log("pehlibaar")
        axiosInstance
        .post(`http://127.0.0.1:8000/api/logout/`,{
            'refresh_token': localStorage.getItem("refresh_token"),
        })
        .then((res)=>{
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          axiosInstance.defaults.headers['Authorization'] = null;
          console.log(res.status)
          setLoggedIn(false);
          <Redirect to="/"/>
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
