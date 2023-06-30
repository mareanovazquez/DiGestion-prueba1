

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const UserContext = createContext([]);


export const UserContextProvider = ({ children }) => {



    const navigate = useNavigate();
    //estados y funciones globales para INYECTAR
    //funciones arriba
    //estados 

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const [permisos, setPermisos] = useState('')
    const [departamento, setDepartamento] = useState('')


    //Usuarios creados para probar las rutas protegidas (ESTO DEBE ELIMINARSE)
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

    // handleLogin creado para manejar los usuarios de prueba (ESTO DEBE ELIMINARSE)
    /*  const handleLogin = (e) => {
         e.preventDefault();
 
         // Verifica las credenciales del usuario (ESTO DEBE ELIMINARSE)
         const usuario = dataUsuarios.find(user => user.nombre === username && user.contraseña === password);
 
         if (usuario) {
             // Iniciar sesión exitosamente
             //ELIMINAR ESTE CONSOLE.LOG CUANDO TODO FUNCIONE
             console.log('Inicio de sesión exitoso | ' + usuario.nombre + ' ' + usuario.permiso + ' ' + usuario.departamento);
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
 
     }; */

    //handleButtonLogin para manejar el botón del componente LogIn (ESTO DEBE ELIMINARSE Y CAMBIAR POR UNO NUEVO)
    /* const handleButtonLogIn = () => {
        setUsuarios(username);
        
        setPermisos(permisos)
        setDepartamento(departamento)
    }; */

    const handleLogin = (e) => {
        e.preventDefault();

        axios.get('http://10.10.49.124/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0e',
                
            }

        })

            .then(response => {

                navigate('/inicio')
                
                console.log(response),
                console.log(response.headers)
                

            })
            .catch(error => {
            console.log(error)
            })

            .finally ()

    }


    const handleButtonLogIn = () => {

        setEmail(email)
        setPassword(password)

    };


    useEffect(() => {
        localStorage.setItem ('username', username)
        localStorage.setItem('email', email);
        localStorage.setItem('password', password)

    }, [username,email, password])




    return (
        <>
            <UserContext.Provider
                value={{

                    handleLogin,
                    handleButtonLogIn,


                    username,
                    setUsername,
                    email,
                    setEmail,
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