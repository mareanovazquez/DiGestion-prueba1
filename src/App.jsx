/* import { useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import { PageLayout } from './components/PageLayout';

import { Home } from './pages/Home';

import { b2cPolicies, protectedResources } from './authConfig';
import { compareIssuingPolicy } from './utils/claimUtils';

 import { ListProveedores } from './components/ListProveedores/ListProveedores'
 
 import { NavBar } from './components/NavBar/NavBar';
 import { FooterNav } from './components/FooterNav/FooterNav';
 import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import { ItemListRemito } from './components/ItemListRemito/ItemListRemito.jsx';
 import { ListaRemitos2 } from './components/ListaRemitos2/ListaRemitos2';
 import { ItemRemito } from './components/ItemRemito/ItemRemito';
 import { AddRemito } from './components/AddRemito/AddRemito';


import './App.css'; */

//const Pages = () => {
/**
 * useMsal is hook that returns the PublicClientApplication instance,
 * an array of all accounts currently signed in and an inProgress value
 * that tells you what msal is currently doing. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
 */
// const { instance } = useMsal();
// useEffect(() => {
//     const callbackId = instance.addEventCallback((event) => {
//         if (
//             (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
//             event.payload.account
//         ) {
//             /**
//              * For the purpose of setting an active account for UI update, we want to consider only the auth
//              * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
//              * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
//              * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
//              */
//             // if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.editProfile)) {
//                 // retrieve the account from initial sing-in to the app
//                 const originalSignInAccount = instance
//                     .getAllAccounts()
//                     .find(
//                         (account) =>
//                             account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
//                             account.idTokenClaims.sub === event.payload.idTokenClaims.sub && 
//                             compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)        
//                     );

//                 let signUpSignInFlowRequest = {
//                     authority: b2cPolicies.authorities.signUpSignIn.authority,
//                     account: originalSignInAccount,
//                 };

//                 // silently login again with the signUpSignIn policy
//                 instance.ssoSilent(signUpSignInFlowRequest);
//             // }

//             /**
//              * Below we are checking if the user is returning from the reset password flow.
//              * If so, we will ask the user to reauthenticate with their new password.
//              * If you do not want this behavior and prefer your users to stay signed in instead,
//              * you can replace the code below with the same pattern used for handling the return from
//              * profile edit flow
//              */
//             // if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
//             //     let signUpSignInFlowRequest = {
//             //         authority: b2cPolicies.authorities.signUpSignIn.authority,
//             //         scopes: [
//             //             ...protectedResources.apiTodoList.scopes.read,
//             //             ...protectedResources.apiTodoList.scopes.write,
//             //         ],
//             //     };
//             //     instance.loginRedirect(signUpSignInFlowRequest);
//             // }
//         }

//         // if (event.eventType === EventType.LOGIN_FAILURE) {
//         //     // Check for forgot password error
//         //     // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
//         //     debugger;
//         //     if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
//         //         const resetPasswordRequest = {
//         //             authority: b2cPolicies.authorities.forgotPassword.authority,
//         //             scopes: [],
//         //         };
//         //         instance.loginRedirect(resetPasswordRequest);
//         //     }
//         // }
//     });

//     return () => {
//         if (callbackId) {
//             instance.removeEventCallback(callbackId);
//         }
//     };
// eslint-disable-next-line
//    }, [instance]);

//     return (

//         <Routes>

//             <Route path="/" element={<Home />} />

//                  <Route path='/proveedores' element={<ListProveedores />}/>
//                  <Route path='/remitos' element={<ItemListRemito />} />
//                  {/* En la route de remito cambié el parámetro pid por rid para que sea más significativo a remitoID, creo que cuando este proyecto sea más grande estos detalles van a importar. */}
//                  <Route path='/remito/:rid' element={<ItemRemito />} />
//                  <Route path='/remito/addRemito' element={<AddRemito/>}/>


//               {/* <FooterNav /> */}


//         </Routes>

//     );
// }; 

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
/* const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <Pages />
            </PageLayout>
        </MsalProvider>
    );
};

export default App;
 */


import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import { ListProveedores } from './components/ListProveedores/ListProveedores'

import { NavBar } from './components/NavBar/NavBar';
import { FooterNav } from './components/FooterNav/FooterNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { ItemListRemito } from './components/ItemListRemito/ItemListRemito.jsx';
import { ListaRemitos2 } from './components/ListaRemitos2/ListaRemitos2';
import { ItemRemito } from './components/ItemRemito/ItemRemito';
import { AddRemito } from './components/AddRemito/AddRemito';
import { UserContextProvider } from './UserContext/UserContext';
import { Inicio } from './components/Inicio/Inicio';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PrivateRouteAdm } from './components/PrivateRoute/PrivateRouteAdm';
import { NotAllowedR } from './components/NotAllowed/NotAllowedR';
import { InicioRaW } from './components/Inicio/InicioRaW';
import { InicioR } from './components/Inicio/InicioR';
import { ItemListRemitoR } from './components/ItemListRemito/ItemListRemitoR';
import { ListProveedoresR } from './components/ListProveedores/ListProveedoresR';








function App() {


    return (
        <>

            <UserContextProvider>

                <Routes>
                    <Route path='/' element={<LogIn />} />

{/* INICIO ADMINISTRADOR */}
                    <Route path="/inicio" element={
                        <PrivateRoute>
                            <PrivateRouteAdm>
                                <Inicio />
                            </PrivateRouteAdm>
                        </PrivateRoute>} />

{/* INICIO Read and Write */}
                    <Route path="/inicioRaW" element={
                        <PrivateRoute>
                            <InicioRaW />
                        </PrivateRoute>} />

{/* INICIO solo Read */}
                    <Route path="/inicioR" element={
                        <PrivateRoute>
                            <InicioR />
                        </PrivateRoute>} />

                    <Route path='/proveedores' element={
                        <PrivateRoute>
                            <ListProveedores />
                        </PrivateRoute>} />

                        <Route path='/proveedoresR' element={
                        <PrivateRoute>
                            <ListProveedoresR />
                        </PrivateRoute>} />

                    <Route path='/remitos' element={
                        <PrivateRoute>
                            <ItemListRemito />
                        </PrivateRoute>} />

                        <Route path='/remitosR' element={
                        <PrivateRoute>
                            <ItemListRemitoR />
                        </PrivateRoute>} />


                    <Route path='/remito/:rid' element={
                        <PrivateRoute>
                            <ItemRemito />
                        </PrivateRoute>} />

                    <Route path='/remito/addRemito' element={
                        <PrivateRoute>
                            <PrivateRouteAdm>
                                <AddRemito />
                            </PrivateRouteAdm>
                        </PrivateRoute>} />

                    <Route path='/notAllowed' element={
                        <PrivateRoute>
                            <NotAllowedR />
                        </PrivateRoute>} />



                </Routes>
                {/* <FooterNav /> */}

            </UserContextProvider>
        </>
    )
}


export default App
