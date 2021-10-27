import './App.css';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Navigationbar from './components/Navigationbar';
import Ridecard from './components/Ridecard';

function App() {
  return (
    <>
      <Navigationbar />
      <Container>
        <h3 className="text-center my-5">Upcoming Rides</h3>
        <Row>
          <Ridecard/>
          <Ridecard/>
          <Ridecard/>
        </Row>
        <Row className="my-5">
          <Ridecard/>
          <Ridecard/>
          <Ridecard/>
        </Row>
        <FontAwesomeIcon className="create_ride" icon={faPlusCircle} size="4x"></FontAwesomeIcon>
      </Container> 
    </>
  );
}

export default App;
