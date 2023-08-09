import { useContext } from "react"
import { UserContext } from "../../UserContext/UserContext"
import Card from 'react-bootstrap/Card';

import { Link, NavLink } from "react-router-dom";




export const Inicio = () => {

    const { loggedIn, setLoggedIn } = useContext(UserContext)

    return (
        <>
            {loggedIn ?
                <div className="contenedorInicio">
                    <h2 className="text-center"> DIGESTIÓN </h2>
                    <div className="contenedorInicioCards">

                        <Link to='/proveedores'>
                            <Card className="p-1" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title><h2 className="text-center">PROVEEDORES</h2></Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                        <Link to='/remitos'><Card className='p-1' style={{ width: '18rem' }}>

                            <Card.Body>
                                <Card.Title><h2 className="text-center">REMITOS</h2></Card.Title>
                            </Card.Body>
                        </Card>
                        </Link>

                        <Link to='/perifericos'><Card className='p-1' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title><h2 className="text-center">PERIFÉRICOS</h2></Card.Title>
                            </Card.Body>
                        </Card>
                        </Link>
                    </div>
                </div>
                :

                <NavLink to='/'>
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <h2 >Debés iniciar sesión para acceder a DiGestión</h2>
                    </div>
                </NavLink>}
        </>
    )
}



