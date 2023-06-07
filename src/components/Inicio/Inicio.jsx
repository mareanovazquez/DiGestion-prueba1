import { useContext } from "react"
import { UserContext } from "../../UserContext/UserContext"

import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";



export const Inicio = () => {

const { usuario, setUsuario } = useContext(UserContext)

    return (
        <>
        <NavBar/>
        <div className="contenedorInicio">
        <h2 className="text-center"> Bienvenido </h2>
        
            <div className="contenedorInicioCards">
                
                <Link to='/proveedores'>
                    <Card className="p-1" style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src=''/> */}
                    <Card.Body>
                        <Card.Title><h2 className="text-center">PROVEEDORES</h2></Card.Title>
                                                
                    </Card.Body>
                </Card>
                </Link>
                <Link to='/remitos'><Card className='p-1' style={{ width: '18rem' }}>
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



