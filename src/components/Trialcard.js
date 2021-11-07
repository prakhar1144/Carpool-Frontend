import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';
import axiosInstance from '../customaxios';
import { Link } from 'react-router-dom';

function Trialcard({ride}) {
    const [joined, setJoined] = useState(false);
    let user_id = localStorage.getItem("user_id")
    function handleClick() {
        if (user_id) {
        axiosInstance
        .put(process.env.REACT_APP_BACKEND_URL + `api/join/${ride.id}`)
        .then(()=>{
            setJoined(!joined);
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    }
    useEffect(() => {
        if (user_id){
        if(JSON.stringify(ride.members).includes(user_id))
        {
            setJoined(true);
        }
    }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    let date,time;
    [date, time] = ride.departure_time.split("T");
    time = time.substring(0,5);

  return (
<Grid item md={4} sm={6} xs={12}>
    <Card sx={{borderRadius:2, backgroundColor: "#f7f7f7"}} raised={true}>
        <CardContent align="center">
            <Typography  gutterBottom variant="h6"  sx={{ fontFamily:"inherit"}}>{ride.destination}</Typography>
            {/* <Typography variant="caption" sx={{color:'text.secondary'}}>12/05/21</Typography> */}
            <Divider variant="middle" />
            <Grid container sx={{my:2, }}>
                <Grid item xs={6}>
                    <Typography  align="center" sx={{color:'text.secondary'}}>Departure</Typography>
                    <Typography variant="caption" align="center" sx={{color:'text.secondary'}}>{date} {time}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="center" sx={{color:'text.secondary'}}>Members</Typography>
                    <Typography variant="caption" align="center" sx={{color:'text.secondary'}}>{ride.members.length}/5</Typography>
                </Grid>
            </Grid>
            { joined ?
            <>
                <Button sx={{"marginRight":"2px"}} variant="outlined" size="small" onClick={handleClick}>
                    Leave
                </Button> 
                <Button sx={{"marginLeft":"2px"}} component={Link} to={`/chat/${ride.id}`} variant="outlined" size="small" >
                    Chat
                </Button>
            </>
            : 
            <Button variant="outlined" size="small" onClick={handleClick}>
                Join
            </Button>
}
        </CardContent>
    </Card>
</Grid>
  )
}

export default Trialcard;