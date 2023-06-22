

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
    const [departamento, setDepartamento] = useState('')
    

    
        const dataUsuarios = [
        {
            id: 1,
            nombre: 'mariano',
            contraseña: '1234',
            permiso: 'Admin',
            departamento: 'Todos los departamentos'
        },
        {
            id: 2,
            nombre: 'matias',
            contraseña: '1234',
            permiso: 'Admin'
        },
        {
            id: 3,
            nombre: 'ayelen',
            contraseña: '1234',
            permiso: 'ReadAndWrite',
            departamento: '23'
        },
        {
            id: 4,
            nombre: 'pingo',
            contraseña: '1234',
            permiso: 'Read',
            departamento: '31'
        },
        {
            id: 5,
            nombre: 'pongo',
            contraseña: '1234',
            permiso: 'Read',
            departamento: '2'
        }
    ];

    
    const handleLogin = (e) => {
        e.preventDefault();

        // Verificar las credenciales del usuario
        const usuario = dataUsuarios.find(user => user.nombre === username && user.contraseña === password);

        if (usuario) {
            // Iniciar sesión exitosamente
            //ELIMINAR ESTE CONSOLE.LOG CUANDO TODO FUNCIONE
            console.log('Inicio de sesión exitoso | ' + usuario.nombre + ' ' + usuario.permiso +' '+ usuario.departamento);
            navigate('/inicio')
            setPermisos(usuario.permiso)
            setDepartamento(usuario.departamento)
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

    const handleButtonLogIn = () => {
        setUsuarios(username);
        setPermisos(permisos)
        setDepartamento(departamento)
    };

  

    return (
        <>
            <UserContext.Provider
                value={{

                    handleLogin,
                    handleButtonLogIn,
                  
                    
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
                    departamento,
                    setDepartamento, 
                          
                    

                }}
            >

                {children}
            </UserContext.Provider>


        </>
    )
}