
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import ReactHMTLTableToExcel from 'react-html-table-to-excel'
import { UserContext } from '../../UserContext/UserContext';
import HttpService from '../../services/HttpService';
import { NavLink } from 'react-router-dom';

export const ItemRemito = () => {


    const [remitos, setRemitos] = useState({});
    const { rid } = useParams();
    const { token } = useContext(UserContext);
    const {showEncabezado, setShowEncabezado} = useState (true)

    const http = new HttpService();

    useEffect(() => {
        http.getData(`/remito/${rid}`, token)
            .then(response => {
                const remitos = response.data.data;
                setRemitos(remitos);
            })
            .catch(error => {
                console.log(error)
            })
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
                                    <li><b>Departamento:</b>{remitos.departamento}</li>
                                    <li><b>Remito:</b> {remitos.remito}</li>
                                    <li><b>Usuario alta:</b></li>
                                    <li><b>Orden provisión:</b></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li><b>Proveedor:</b> {remitos.proveedor}</li>
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
                    <table className="table table-striped" id='tablaPerifericos'>
                        <thead>
                        <tr>
                                <th>Remito</th>
                                <th>Departamento</th>
                                <th>Usuario</th>
                                <th>Proveedor</th>
                                <th>Comentarios</th>
                                <th>Fecha Recepción</th>
                                <th>Fecha Recepción DTI</th>
                            </tr>
                            <tr>
                                <td>{remitos.remito}</td>
                                <td>{remitos.departamento}</td>
                                <td>{remitos.usuario}</td>
                                <td>{remitos.proveedor}</td>
                                <td>{remitos.comentarios}</td>
                                <td>{remitos.fecha_recepcion}</td>
                                <td>{remitos.fecha_recepcion_dti}</td>
                            </tr>
                            <tr>
                                <th scope="col">Periférico</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Garantía</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Disponible</th>
                                <th scope="col">Comentarios</th>
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

                            </tr>
                            <tr>
                                <th scope="row">CPU Mini</th>
                                <td>HP</td>
                                <td>Elite desk 800</td>
                                <td>12 meses</td>
                                <td>8</td>
                                <td>8</td>
                                <td>esto es un comentario</td>

                            </tr>
                            <tr>
                                <th scope="row">CPU Mini</th>
                                <td>HP</td>
                                <td>Elite desk 800</td>
                                <td>12 meses</td>
                                <td>8</td>
                                <td>8</td>
                                <td>esto es un comentario</td>

                            </tr>
                        </tbody>
                    </table>


                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                        <NavLink to='/remitos' >
                            <button className="btn btn-primary m-2">Volver</button>
                        </NavLink>
                        </Nav.Item>
                        <Nav.Item >
                            <div> <ReactHMTLTableToExcel
                                id="button-exp-excel"
                                className="btn btn-success m-2"
                                table="tablaPerifericos"
                                filename="tablexls"
                                sheet="pagina1"
                                buttonText="XLS" /></div>
                        </Nav.Item>
                        <Nav.Item>
                            <button className="btn btn-danger m-2">PDF</button>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            <div>

            </div>
        </>

    )
}