import { useContext, useEffect } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';

export const PrivateRoute = (props) => {
    // Aquí puedes obtener los datos de autenticación del UserContext
    const { permisos } = useContext(UserContext);
    const navigate = useNavigate();

    // Verificar si el usuario está autenticado


    useEffect(() => {

        if (!permisos) {
            navigate('/')
        
        } else if (permisos === 'Admin') {
            navigate('/inicio')

        } else if (permisos === 'ReadAndWrite') {
            navigate('/inicioRaW')

        } else if (permisos === 'Read') {
            navigate('/inicioR')

        } else {
            navigate('/notAllowed')
        }
    }, [])


    return (

        <>
            {props.children}
        </>
    )
};