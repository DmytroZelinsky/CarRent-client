import { useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
const HeaderContainer = () => {
    const history = useHistory()

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => history.push('/home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => history.push('/autoparks')}>Autoparks</Nav.Link>
                        <Nav.Link onClick={() => history.push('/booking')}>Book a car</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default HeaderContainer
