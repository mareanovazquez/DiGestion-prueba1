import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';


export const NavBar = () => {

    const { usuarios, setUsuarios} = useContext (UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink to='/inicio'>DIGESTIÓN | </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/proveedores' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitos' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/'><button>Cerrar sesión</button></NavLink>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
