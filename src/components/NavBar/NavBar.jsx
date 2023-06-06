import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


export const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink to='/'>DIGESTIÓN | </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/proveedores' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitos' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to='/'><button>Cerrar sesión</button></NavLink>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
