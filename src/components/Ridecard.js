import { Card, ListGroup } from 'react-bootstrap';
import Grid from '@mui/material/Grid';

function Ridecard() {
    return (
        <>
            <Grid item md={4}>
                <Card>
                <Card.Header>Bus Stand</Card.Header>
                <ListGroup>
                    <ListGroup.Item>Departure : 11:00 AM</ListGroup.Item>
                    <ListGroup.Item>Members : 3/4 </ListGroup.Item>
                </ListGroup>
                <Card.Footer>Join Group</Card.Footer>
                </Card>
            </Grid>
        </>  
    )
}

export default Ridecard;