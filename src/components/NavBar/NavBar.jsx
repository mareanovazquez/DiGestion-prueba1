import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';
import { Link } from 'react-router-dom';


export const NavBar = () => {

    const handleCloseUser = () => {
        setEmail('')
        setLoggedIn(false)
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email');
    }



    const { name, setName, email, setEmail, permisos, setPermisos, loggedIn, setLoggedIn, token, setToken } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {/* Menú de opciones definido por permisos de usuario */}

                {/* ADMIN */}

                {loggedIn ? <NavLink className='text-white' to='/inicio'>DIGESTIÓN | </NavLink> : <NavLink className='text-white' to='/'>DIGESTIÓN | </NavLink>}
                {loggedIn ? <Navbar.Toggle aria-controls="responsive-navbar-nav" /> : null}

                <Navbar.Collapse id="responsive-navbar-nav">
                    {loggedIn && 
                    <Nav className="me-auto">
                        <NavLink to='/proveedores' className={({ isActive }) => isActive ? 'nav-link btn text-white fw-bolder' : 'nav-link btn text-white text-left'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitos' className={({ isActive }) => isActive ? 'nav-link btn text-white fw-bolder' : 'nav-link btn text-white'}>REMITOS</NavLink>
                        <NavLink to='/perifericos' className={({ isActive }) => isActive ? 'nav-link btn text-white fw-bolder' : 'nav-link btn text-white'}>PERIFÉRICOS</NavLink>
                    </Nav>
                    }

                    {/* READ AND WRITE */}
                    {permisos === 'ReadAndWrite' && <NavLink className='text-white' to='/inicioRaW'>DIGESTIÓN | </NavLink>}
                    {permisos === 'ReadAndWrite' && <Nav className="me-auto">
                        <NavLink to='/proveedoresRaW' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitosRaW' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                        <NavLink to='/perifericosRaW' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PERIFÉRICOS</NavLink>
                    </Nav>}

                    {/* READ */}
                    {permisos === 'Read' && <NavLink className='text-white' to='/inicioR'>DIGESTIÓN |  </NavLink>}
                    {permisos === 'Read' && <Nav className="me-auto">
                        {/* <NavLink to='/proveedoresR' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink> */}
                        <NavLink to='/remitosR' className={({ isActive }) => isActive ? 'nav-link btn text-white ' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                        <NavLink to='/perifericosR' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PERIFÉRICOS</NavLink>
                    </Nav>}

                    {/* Botón de cerrar sesión definido por permisos de usuario */}
                    {loggedIn &&
                        <Nav>
                            <NavDropdown className='text-white' title={name} id="basic-nav-dropdown">
                                <NavLink to='/' >
                                    <button className="btn" onClick={handleCloseUser}>
                                        Cerrar sesión
                                    </button>
                                </NavLink>
                            </NavDropdown>
                        </Nav>
                    }

                    {permisos === 'ReadAndWrite' && <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/' replace><button onClick={handleCloseUser} >Cerrar sesión</button></NavLink>

                        </NavDropdown>
                    </Nav>
                    }
                    {permisos === 'Read' && <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/' replace><button onClick={handleCloseUser} >Cerrar sesión</button></NavLink>
                        </NavDropdown>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
