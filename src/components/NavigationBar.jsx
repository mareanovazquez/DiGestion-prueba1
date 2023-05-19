import { Nav, Navbar, Dropdown, DropdownButton, Button, Container } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from '../authConfig';
import { NavLink } from 'react-router-dom';


export const NavigationBar = () => {
    const { instance, inProgress } = useMsal();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginPopup = () => {
        instance
            .loginPopup({
                ...loginRequest,
                redirectUri: '',
            })
            .catch((error) => console.log(error));
    };

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect();
    };

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
        });
    };

    const handleProfileEdit = () => {
        if (inProgress === InteractionStatus.None) {
            instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>

                    <NavLink className='navbar-brand' to='/'>DIGESTIÓN | </NavLink>
                    <AuthenticatedTemplate>
                        <Nav className="me-auto">
                            <NavLink to='/proveedores' className='nav-link btn text-white' >PROVEEDORES</NavLink>
                            <NavLink to='/remitos' className='nav-link btn text-white' >REMITOS</NavLink>

                        </Nav>
                        {/* <div className="collapse navbar-collapse justify-content-end"> */}
                        {/* <Button variant="info" onClick={handleProfileEdit} className="profileButton">
                           Proveedores
                        </Button> */}

                        <DropdownButton
                            variant="outline-primary"
                            title={activeAccount && activeAccount.name ? activeAccount.name : 'Unknown'}
                        >
                            <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                Cerrar Sesion
                            </Dropdown.Item>
                            {/* <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                Sign out using Redirect
                            </Dropdown.Item> */}
                        </DropdownButton>
                        {/* </div> */}
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        {/* <Nav> */}
                        <div className="collapse navbar-collapse justify-content-end">
                        <Button variant="outline-primary" as="button" onClick={handleLoginPopup}>Iniciar Sesión</Button>
                            
                        </div>
                        {/* </Nav> */}
                    </UnauthenticatedTemplate>
                </Container>
            </Navbar>
        </>
    );
};