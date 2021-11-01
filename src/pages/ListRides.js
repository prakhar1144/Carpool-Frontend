import Grid from "@mui/material/Grid"
import Trialcard from "../components/Trialcard"
import Container from '@mui/material/Container';
import { useEffect,useState } from "react";
import axiosInstance from '../customaxios';

const ListRides = ({rides}) => {
    const [Rides, setRides] = useState([]);

    function getRides(){
      axiosInstance.get('http://127.0.0.1:8000/api/list/',{ skipAuthRefresh: true })
      .then((response)=>{
        setRides(response.data);
      })
      .catch((e)=>{
        console.log(e);
      })
    }

    useEffect(() => {
        getRides()
    }, [])

    return (
        <Container>
            <h3 className="text-center my-5">Upcoming Rides</h3>
            <Grid container spacing={3}>
                {Rides.map((ride)=>{
                    return (<Trialcard key={ride.id} ride={ride} />)
                })}
            </Grid>
        </Container>
    )
}

export default ListRides
