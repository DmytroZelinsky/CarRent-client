import { useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
const HeaderContainer = () => {
    const history = useHistory()

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => history.push('/home')}>Hello</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => history.push('/home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => history.push('/autoparks')}>Autoparks</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default HeaderContainer
