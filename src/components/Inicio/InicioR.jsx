import { useContext } from "react"
import { UserContext } from "../../UserContext/UserContext"

import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import { NavBarR } from "../NavBar/NavBarR";



export const InicioR = () => {

const { permisos, setPermisos } = useContext(UserContext)

    return (
        <>
        <NavBarR/>
        <div className="contenedorInicio">
        <h2 className="text-center"> DIGESTIÓN </h2>
        <h5 className='text-center'> Visible para <b>{permisos}</b></h5>
    
            <div className="contenedorInicioCards">
                
                <Link to='/proveedores' replace>
                    <Card className="p-1" style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src=''/> */}
                    <Card.Body>
                        <Card.Title><h2 className="text-center">PROVEEDORES</h2></Card.Title>
                                                
                    </Card.Body>
                </Card>
                </Link>
                <Link to='/remitosR' replace><Card className='p-1' style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title><h2 className="text-center">REMITOS</h2></Card.Title>
                        
                    </Card.Body>
                </Card>
                </Link>
            </div>
            </div>
        </>
    )
}