import Grid from "@mui/material/Grid"
import RideCard from "../components/RideCard"
import Container from '@mui/material/Container';
import { useEffect,useState } from "react";
import axiosInstance from '../customaxios';

const ListRides = ({rides}) => {
    const [Rides, setRides] = useState([]);

    function getRides(){
      axiosInstance.get(process.env.REACT_APP_BACKEND_URL + 'api/list/',{ skipAuthRefresh: true })
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
                    return (<RideCard key={ride.id} ride={ride} />)
                })}
            </Grid>
        </Container>
    )
}

export default ListRides
