import { Nav, Navbar, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser"; 
import { loginRequest, b2cPolicies } from '../authConfig';
import { NavLink } from 'react-router-dom';


export const NavigationBar = () => {
    const { instance, inProgress } = useMsal();
     let activeAccount;

     if (instance) {
         activeAccount = instance.getActiveAccount();
         debugger;
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
        if(inProgress === InteractionStatus.None){
           instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
        }
    };
    
    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                
                <NavLink className='navbar-brand' to='/'>DIGESTIÓN | </NavLink>
                <AuthenticatedTemplate>
                <Nav className="me-auto">
                        <NavLink to='/proveedores' className= 'nav-link btn text-white' >PROVEEDORES</NavLink>
                        <NavLink to='/remitos' className= 'nav-link btn text-white' >REMITOS</NavLink>

                    </Nav>
                    <div className="collapse navbar-collapse justify-content-end">
                        {/* <Button variant="info" onClick={handleProfileEdit} className="profileButton">
                           Proveedores
                        </Button> */}

                        <DropdownButton
                            variant="warning"
                            drop="start"
                            title={activeAccount && activeAccount.username ? activeAccount.username : 'Unknown'}
                        >
                            <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                Sign out using Popup
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                Sign out using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
                            <Dropdown.Item as="button" onClick={handleLoginPopup}>
                                Sign in using Popup
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                Sign in using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};