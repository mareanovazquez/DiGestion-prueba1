import eliminar from '../../assets/eliminar.svg'
import agregar from '../../assets/agregar.svg'
import volver from '../../assets/volver.svg'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const ItemRemito = () => {


    const [remitos, setRemitos] = useState({})
    const { rid } = useParams()

    const FetchRemitos = async () => {
        const response = await fetch(`http://10.10.49.124/api/remito/${rid}`);
        const results = await response.json()
        const remitos = results.data

        setRemitos(remitos)
    }

    useEffect(() => {
        FetchRemitos(rid);
    }, [])

    

    return (

            <>

            
                <div className="card cardRemito" >
                    <div className="card-body">
                        

                            <h5 className="card-title">Remito N° {remitos.id}</h5>
                            <div className="container">
                                <div className="row align-items-start">
                                    <div className="col">
                                        <ul>
                                            <li><b>Departamento:</b>{remitos.departamento_id}</li>
                                            <li><b>Remito:</b> {remitos.remito}</li>
                                            <li><b>Usuario alta:</b></li>
                                            <li><b>Orden provisión:</b></li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Proveedor:</b></li>
                                            <li><b>Expediente:</b></li>
                                            <li><b>Orden compra:</b></li>
                                            <li><b>Orden entrega:</b></li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Fecha recepción:</b> {remitos.fecha_recepcion}</li>
                                            <li><b>Fecha recepción DTI:</b>{remitos.fecha_recepcion_dti}</li>
                                            <li><b>Legajo compra:</b></li>

                                        </ul>
                                    </div>
                                    <hr></hr>
                                    <p><b>COMENTARIOS:</b> {remitos.comentarios}</p>
                                </div>
                            </div>

                        
                            <hr></hr>
                            <h6 className="card-subtitle text-muted">PERIFÉRICOS</h6>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Periférico</th>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Garantía</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Disponible</th>
                                        <th scope="col">Comentarios</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">CPU Mini</th>
                                        <td>HP</td>
                                        <td>Elite desk 800</td>
                                        <td>12 meses</td>
                                        <td>8</td>
                                        <td>8</td>
                                        <td>esto es un comentario</td>
                                        <td><img src={eliminar} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CPU Mini</th>
                                        <td>HP</td>
                                        <td>Elite desk 800</td>
                                        <td>12 meses</td>
                                        <td>8</td>
                                        <td>8</td>
                                        <td>esto es un comentario</td>
                                        <td><img src={eliminar} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CPU Mini</th>
                                        <td>HP</td>
                                        <td>Elite desk 800</td>
                                        <td>12 meses</td>
                                        <td>8</td>
                                        <td>8</td>
                                        <td>esto es un comentario</td>
                                        <td><img src={eliminar} alt="" /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="card-footer ">
                                <Link to='/remito/addRemito' className='card-link'><img src={agregar} alt="agregar periféricos" /></Link>
                                <Link to='/' className='card-link'><img src={volver} alt="volver a la lista de remitos" /></Link>
                                
                            </div>
                        </div>
                    </div>
                    
                </>

            )
}