import { createContext, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { Inicio } from "../components/Inicio/Inicio";
import { Link } from "react-router-dom";


export const UserContext = createContext([]);

export const UserContextProvider = ({children})=> {

    //estados y funciones globales para INYECTAR
    //funciones arriba
    //estados 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dataUsuarios = [
        {
            id: 1,
            nombre: 'Mariano',
            contraseña: 'contraseña1',
            permiso: 'full'
        },
        {
            id: 2,
            nombre: 'Matías',
            contraseña: 'contraseña2',
            permiso: 'full'
        },
        {
            id: 3,
            nombre: 'Ayelén',
            contraseña: 'contraseña3',
            permiso: 'medium'
        },
        {
            id: 4,
            nombre: 'Pingo',
            contraseña: 'contraseña4',
            permiso:'medium'
        },
        {
            id: 5,
            nombre: 'Pongo',
            contraseña: 'contraseña5',
            permiso: 'ver'
        }
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        // Verificar las credenciales del usuario
        const user = dataUsuarios.find(user => user.nombre === username && user.contraseña === password);

        if (user) {
            // Iniciar sesión exitosamente
            console.log('Inicio de sesión exitoso');
            setError('')
           
            // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones necesarias
        } else {
            // Credenciales inválidas
            setError('Usuario o contraseña incorrectos');

        }

        setPassword('')
        setUsername('')
        
    };

    return (
        <>
        <UserContext.Provider
        value={{
            
            handleLogin,

            username,
            setUsername,
            password,
            setPassword,
            error,
            setError,

        }}
        >

            {children}
        </UserContext.Provider>

        </>
    )
}