import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { UserContext } from '../../UserContext/UserContext';
import HttpService from '../../services/HttpService';
import { NavLink } from 'react-router-dom';
import { ItemRemitoPDF } from './ItemRemitoPDF';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import {ModalEntrega} from '../EntregaEquipos/ModalEntrega'

export const ItemRemito = () => {
    const [remitos, setRemitos] = useState([])
    const [remitosPerifericos, setRemitosPerifericos] = useState([])
    const [verPDF, setVerPDF] = useState(false)
    const { rid } = useParams();
    const { token, name } = useContext(UserContext);
    const tableRef = useRef(null);

    const [show, setShow] = useState(false);

    const http = new HttpService();

    useEffect(() => {
        http.getData(`/remito/${rid}`, token)
            .then(response => {
                const listRemitos = response.data.data;
                const lisRemitosPerifericos = response.data.data.remitoModelos
                setRemitos(listRemitos);
                setRemitosPerifericos(lisRemitosPerifericos)
                
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleClicEntrega = ()=>{
        setShow(true)
    }
    return (

        <>
            <div className="card cardRemito" >
                <div className="card-body">
                    <Nav className=" menuDescargasRemito" activeKey="/home">
                        <Nav.Item>
                            <NavLink to='/remitos' >
                                <button className="btn btn-dark m-2">Volver</button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <DownloadTableExcel
                                filename='Remito_Perifericos_Tabla'
                                sheet='Página 1'
                                currentTableRef={tableRef.current}>
                                <button className='btn btn-success m-2'>XLS</button>
                            </DownloadTableExcel>
                        </Nav.Item>
                        {/* El preview de PDF está comentado porque me parece redundate previsualizar el PDF cuando se ve en pantalla
                        y que haya otro botón para descargar cuando solo necesitamos un botón para descargar */}
                        {/* <Nav.Item>
                            <button onClick={() => {
                                setVerPDF(!verPDF)
                            }} className="btn btn-danger m-2">{!verPDF ? "PDF" : "cerrar PDF"}</button>
                        </Nav.Item> */}
                        <Nav.Item>
                            <PDFDownloadLink document={<ItemRemitoPDF data={remitos} dataPerifericos={remitosPerifericos} name={name} />} fileName='Remito_Perifericos_PDF'>
                                <button className='btn btn-danger m-2'> PDF {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg> */}</button>
                            </PDFDownloadLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink>
                                <button className='btn btn-primary m-2' onClick={handleClicEntrega}>
                                    Entregar
                                </button>
                            </NavLink>
                        </Nav.Item>
                    </Nav>

                    <h5 className="card-title">Remito N° {remitos.remito}</h5>
                    <>
                        {!verPDF ?
                            <div className="container">
                                <div className="row align-items-start">
                                    <div className="col">
                                        <ul>
                                            <li><b>Departamento:</b>{remitos.departamento}</li>
                                            <li><b>Remito:</b> {remitos.remito}</li>
                                            <li><b>Usuario alta: </b> {name}</li>
                                            <li><b>Orden provisión:</b> {remitos.orden_provision}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Proveedor:</b> {remitos.proveedor}</li>
                                            <li><b>Expediente:</b>{remitos.expediente}</li>
                                            <li><b>Orden compra:</b> {remitos.orden_compra}</li>
                                            <li><b>Orden entrega:</b>{remitos.orden_entrega}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Fecha recepción:</b> {remitos.fecha_recepcion}</li>
                                            <li><b>Legajo compra:</b>{remitos.legajo_compra}</li>
                                        </ul>
                                    </div>
                                    <hr></hr>
                                    <p><b>COMENTARIOS:</b> {remitos.comentarios}</p>
                                </div>
                            </div> :
                            null}
                    </>
                    <>

                        <>
                            <hr></hr>
                            <h6 className="card-subtitle text-muted">PERIFÉRICOS</h6>
                            <table className="table table-striped" id='tablaPerifericos' ref={tableRef}>
                                <thead>
                                    <tr className='d-none'>
                                        <th>Remito</th>
                                        <th>Departamento</th>
                                        <th>Usuario</th>
                                        <th>Proveedor</th>
                                        <th>Comentarios</th>
                                        <th>Fecha Recepción</th>
                                    </tr>
                                    <tr className='d-none'>
                                        <td>{remitos.remito}</td>
                                        <td>{remitos.departamento}</td>
                                        <td>{name}</td>
                                        <td>{remitos.proveedor}</td>
                                        <td>{remitos.comentarios}</td>
                                        <td>{remitos.fecha_recepcion}</td>
                                    </tr>
                                    <tr className='d-none'>
                                        <th>Expediente</th>
                                        <th>Orden de compra</th>
                                        <th>Orden de entrega</th>
                                        <th>Legajo</th>
                                        <th>Orden provisión</th>
                                        <th>Comentarios</th>
                                    </tr>
                                    <tr className='d-none'>
                                        <td>{remitos.expediente}</td>
                                        <td>{remitos.orden_compra}</td>
                                        <td>{remitos.orden_entrega}</td>
                                        <td>{remitos.legajo_compra}</td>
                                        <td>{remitos.orden_provision}</td>
                                        <td>{remitos.comentarios}</td>
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
                                    {remitosPerifericos.length > 0 &&
                                        remitosPerifericos.map((remitoPeriferico) =>
                                            <tr key={remitoPeriferico.id} scope="row">
                                                <th>{remitoPeriferico.nombrePeriferico}</th>
                                                <td>{remitoPeriferico.nombreMarca}</td>
                                                <td>{remitoPeriferico.nombreModelo}</td>
                                                <td>{remitoPeriferico.garantia}</td>
                                                <td>{remitoPeriferico.cantidad}</td>
                                                <td>{remitoPeriferico.disponible}</td>
                                                <td>{remitoPeriferico.comentarios}</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </>
                    </>
                </div>
            </div>
            <div>
                <ModalEntrega data={remitos} dataPerifericos={remitosPerifericos} setShow={setShow} show={show}/>
            </div>
        </>

    )
}