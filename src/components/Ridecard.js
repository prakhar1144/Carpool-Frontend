import { Col, Card, ListGroup } from 'react-bootstrap';

function Ridecard() {
    return (
        <>
            <Col md={4}>
                <Card>
                <Card.Header>Bus Stand</Card.Header>
                <ListGroup>
                    <ListGroup.Item>Departure : 11:00 AM</ListGroup.Item>
                    <ListGroup.Item>Members : 3/4 </ListGroup.Item>
                </ListGroup>
                <Card.Footer>Join Group</Card.Footer>
                </Card>
            </Col>
        </>  
    )
}

export default Ridecard;