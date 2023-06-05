import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export const FooterNav = () => {
    return (
        <>
            <Nav className="justify-content-center bg-dark" activeKey="/home">
                <Nav.Item>
                    <NavLink className='text-white' to='/'> | DIGESTIÓN | </NavLink>
                </Nav.Item>
            </Nav>

            <Nav className="justify-content-center bg-dark" >
                <Nav.Item>
                    <NavLink to='/proveedores' className='nav-link btn text-white' >PROVEEDORES</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to='/remitos' className='nav-link btn text-white' >REMITOS</NavLink>
                </Nav.Item>

            </Nav>

        </>
    );
}
