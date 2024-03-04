import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../services/HttpService";

export const UserContext = createContext([]);


export const UserContextProvider = ({ children }) => {

    const navigate = useNavigate();
    //estados y funciones globales para INYECTAR
    //funciones arriba
    //estados 

    const [username, setUsername] = useState(localStorage.getItem('username') ||'');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const [permisos, setPermisos] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [token, setToken] = useState( localStorage.getItem('token') || '');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');


        const handleLogin = (e) => {
        e.preventDefault();

        const http = new HttpService();
        http.postData('/login', { email, password })
            .then(response => {
                if (response.data.success) {
                    setToken(response.data.token)
                    setUsername(response.data.data.username)
                    setName(response.data.data.name)
                    setLoggedIn(true)
                    navigate('/inicio')

                }
            })
            .catch(error => {
                setError(error.response.data.error || error.message)
                console.log(error)
            })
            .finally()
    }

    const handleButtonLogIn = () => {
        setEmail(email)
        setPassword(password)
        setName(name)
    };

    useEffect(() => {
        localStorage.setItem('username', username)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email);
        localStorage.setItem('token', token)
        localStorage.setItem('loggedIn', loggedIn)
    }, [username, name, email, token, loggedIn])




    return (
        <>
            <UserContext.Provider
                value={{

                    handleLogin,
                    handleButtonLogIn,

                    username,
                    setUsername,
                    name,
                    setName,
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
                    token,
                    setToken,
                    loggedIn,
                    setLoggedIn
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
}