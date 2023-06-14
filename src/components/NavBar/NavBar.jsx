import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';


export const NavBar = () => {

    const handleUsuario = () => {
        setUsuarios('')
        setPermisos('')

    }

    const { usuarios, setUsuarios, permisos, setPermisos } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {/* Menú de opciones definido por permisos de usuario */}

                {/* ADMIN */}
                {permisos === 'Admin' && <NavLink className='text-white' to='/inicio'>DIGESTIÓN | </NavLink>}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    {permisos === 'Admin' && <Nav className="me-auto">
                        <NavLink to='/proveedores' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitos' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                    </Nav>}

                    {/* READ AND WRITE */}
                    {permisos === 'ReadAndWrite' && <NavLink className='text-white' to='/inicioRaW'>DIGESTIÓN | </NavLink>}
                    {permisos === 'ReadAndWrite' && <Nav className="me-auto">
                        <NavLink to='/proveedoresRaW' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitosRaW' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                    </Nav>}

                    {/* READ */}
                    {permisos === 'Read' && <NavLink className='text-white' to='/inicioR'>DIGESTIÓN |  </NavLink>}
                    {permisos === 'Read' && <Nav className="me-auto">
                        <NavLink to='/proveedoresR' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>PROVEEDORES</NavLink>
                        <NavLink to='/remitosR' className={({ isActive }) => isActive ? 'nav-link btn text-white' : 'nav-link btn text-primary'}>REMITOS</NavLink>
                    </Nav>}

                    {/* Botón de cerrar sesión definido por permisos de usuario */}
                    {permisos === 'Admin' && <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/' replace><button onClick={handleUsuario} >Cerrar sesión</button></NavLink>
                        </NavDropdown>
                    </Nav>
                    }
                    {permisos === 'ReadAndWrite' && <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/' replace><button onClick={handleUsuario} >Cerrar sesión</button></NavLink>

                        </NavDropdown>
                    </Nav>
                    }
                    {permisos === 'Read' && <Nav>
                        <NavDropdown title={usuarios} id="basic-nav-dropdown">
                            <NavLink to='/' replace><button onClick={handleUsuario} >Cerrar sesión</button></NavLink>

                        </NavDropdown>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
