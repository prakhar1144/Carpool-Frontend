import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Navigationbar from './components/Navigationbar';
import Ridecard from './components/Ridecard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Trialcard from './components/Trialcard';

function App() {
  const create_ride = {
    position: 'fixed',
    bottom: 16,
    right: 32,
  };

  return (
    <>
      <Navigationbar />
      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Carpool</Typography>
        </Toolbar>
      </AppBar> */}

      <Container>
        <h3 className="text-center my-5">Upcoming Rides</h3>
        <Grid container spacing={3}>
          <Trialcard/>
          <Trialcard/>
          <Trialcard/>
          <Trialcard/>
          <Trialcard/>
          <Trialcard/>
        </Grid>
        <Fab color="primary" size="large" sx={create_ride}>
          <AddIcon />
        </Fab>
      </Container> 
    </>
  );
}

export default App;
