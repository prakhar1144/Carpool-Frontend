import { Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'

function Navigationbar({loggedIn}) {
    return (
        <>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                <Navbar.Brand ><Link className="navbrand-link" to="/">Carpool</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                    <Nav.Item>
                        <Nav.Link as="div"><Link className="nav-link" to="/new">Create Ride</Link> </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as="div"><Link className="nav-link" to="/">All Ride</Link></Nav.Link>
                    </Nav.Item>
                    { loggedIn ?
                    <Nav.Item>
                        <Nav.Link as="div"> <Link className="nav-link" to="/logout">Logout</Link> </Nav.Link>
                    </Nav.Item>
                    :
                    <>
                    <Nav.Item>
                        <Nav.Link as="div"> <Link className="nav-link" to="/login">Login</Link> </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as="div"> <Link className="nav-link" to="/signup">Signup</Link> </Nav.Link>
                    </Nav.Item>
                    </>
}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar> 
        </>
    )
}

export default Navigationbar;