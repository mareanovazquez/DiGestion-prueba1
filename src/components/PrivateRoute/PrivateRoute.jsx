import { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';

export const PrivateRoute = ({ path, Inicio }) => {
    // Aquí puedes obtener los datos de autenticación del UserContext
    const { permisos } = useContext(UserContext);
    const location = useLocation();

    // Verificar si el usuario está autenticado
    const isAuthenticated = permisos;

    return isAuthenticated ? (
        <Route path='/inicio' element={<Inicio />} />
    ) : (
        <Navigate to={`/login?redirect=${location.pathname}`} />
    );
};