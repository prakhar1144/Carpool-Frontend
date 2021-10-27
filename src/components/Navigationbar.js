import { Container, Nav, Navbar} from 'react-bootstrap';

function Navigationbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                <Navbar.Brand href="#">Carpool</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                    <Nav.Item>
                        <Nav.Link href="#" > Create Ride </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" > All Rides </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" > Login </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" > Signup </Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar> 
        </>
    )
}

export default Navigationbar;