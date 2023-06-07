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
    const [permisos, setPermisos]= useState('')
    

    const dataUsuarios = [
        {
            id: 1,
            nombre: 'Mariano',
            contraseña: 'contraseña1',
            permiso: 'Administrador'
        },
        {
            id: 2,
            nombre: 'Matías',
            contraseña: 'contraseña2',
            permiso: 'Administrador'
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
            
            console.log('Inicio de sesión exitoso | ' + usuario.nombre + permisos);
            navigate('/inicio')
            
            setPermisos(usuario.permiso)
            
            // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones necesarias
        } else {
            // Credenciales inválidas
            setError('Usuario o contraseña incorrectos');
            setPassword('')
            setUsername('')

        }



    };
    
//revisar como evaluar los casos y los permisos y ver de componentizar esta función
    const handlePermisos = () => {

    for (let i = 0; i < dataUsuarios.length; i++) {
        const usuario = dataUsuarios[i];
        
        switch (permisos) {
            case 'Administrador':
                // Código para usuarios con permiso de Administrador
                console.log(`El usuario ${usuario.nombre} tiene permisos de Administrador`);
                break;
            case 'ReadAndWrite':
                // Código para usuarios con permiso de ReadAndWrite
                console.log(`El usuario ${usuario.nombre} tiene permisos de Lectura y Escritura`);
                break;
            case 'Read':
                // Código para usuarios con permiso de Read
                console.log(`El usuario ${usuario.nombre} tiene permisos de Lectura`);
                break;
            default:
                // Código para otros casos
                console.log(`El usuario ${usuario.nombre} tiene un permiso desconocido`);
                break;
        }
    }

    return (
        <>

        </>
    )
}

useEffect(() => {
    handlePermisos();
}, [])

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
                    permisos,
                    setPermisos,           
                    

                }}
            >

                {children}
            </UserContext.Provider>

        </>
    )
}