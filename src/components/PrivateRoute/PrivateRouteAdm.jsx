import { useContext, useEffect } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';

export const PrivateRouteAdm = (props) => {
    // Aquí puedes obtener los datos de autenticación del UserContext
    const { permisos } = useContext(UserContext);
    const navigate = useNavigate();

    // Verificar si el usuario tiene permisos de Administrador

    useEffect(() => {

        if(permisos !== 'Admin') {
            navigate('/notAllowed')
        }
        
    }, [])
        

return (
    
    <>
    {props.children}  
    </>
)
};