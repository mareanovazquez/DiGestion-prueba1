
import { AuthenticatedTemplate } from "@azure/msal-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const UserContext = createContext([]);


export const UserContextProvider = ({ children }) => {

    

    const navigate = useNavigate();
    //estados y funciones globales para INYECTAR
    //funciones arriba
    //estados 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const [permisos, setPermisos] = useState('')
    
    

    const dataUsuarios = [
        {
            id: 1,
            nombre: 'Mariano',
            contraseña: 'contraseña1',
            permiso: 'Admin'
        },
        {
            id: 2,
            nombre: 'Matías',
            contraseña: 'contraseña2',
            permiso: 'Admin'
        },
        {
            id: 3,
            nombre: 'Ayelén',
            contraseña: 'contraseña3',
            permiso: 'ReadAndWrite'
        },
        {
            id: 4,
            nombre: 'Pingo',
            contraseña: 'contraseña4',
            permiso: 'ReadAndWrite'
        },
        {
            id: 5,
            nombre: 'Pongo',
            contraseña: 'contraseña5',
            permiso: 'Read'
        }
    ];

    
    const handleLogin = (e) => {
        e.preventDefault();

        // Verificar las credenciales del usuario
        const usuario = dataUsuarios.find(user => user.nombre === username && user.contraseña === password);

        if (usuario) {
            // Iniciar sesión exitosamente
            //ELIMINAR ESTE CONSOLE.LOG CUANDO TODO FUNCIONE
            console.log('Inicio de sesión exitoso | ' + usuario.nombre + ' ' + usuario.permiso);
            navigate('/inicio')
            setPermisos(usuario.permiso)
            setUsername('')
            setPassword('')
            // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones necesarias
        
        } else {
            // Credenciales inválidas
            setError('Usuario o contraseña incorrectos');
            setPassword('')
            setUsername('')

        }

    };

    const handleButtonClick = () => {
        setUsuarios(username);
        setPermisos(permisos)
    };

    return (
        <>
            <UserContext.Provider
                value={{

                    handleLogin,
                    handleButtonClick,
                    
                    username,
                    setUsername,
                    password,
                    setPassword,
                    error,
                    setError,
                    usuarios,
                    setUsuarios,   
                    permisos,
                    setPermisos,        
                    

                }}
            >

                {children}
            </UserContext.Provider>


        </>
    )
}