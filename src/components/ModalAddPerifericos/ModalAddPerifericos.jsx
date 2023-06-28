import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../UserContext/UserContext';
import { ListadoPerifericos } from '../ListadoPerifericos/ListadoPerifericos';

export function ModalAddPerifericos({data}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        console.log(data)
    };

    const { usuarios }= useContext(UserContext)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Iniciar remito
            </Button>

            <Modal
                size='xl'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remito N° {data.remito}</Modal.Title>
                </Modal.Header>
                {/* ENCABEZADO REMITO */}
                <Modal.Body>
                <div className="card" >
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="container">
                        <div className="row align-items-start">
                            <div className="col">
                                <ul>
                                    <li><b>Departamento:</b> {data.departamento}</li>
                                    <li><b>Remito:</b> {data.remito}</li>
                                    <li><b>Usuario alta:</b> {usuarios}</li>
                                    <li><b>Orden provisión:</b></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li><b>Proveedor:</b>{data.proveedor}</li>
                                    <li><b>Expediente:</b>{data.expediente}</li>
                                    <li><b>Orden compra:</b>{data.ordenCompra}</li>
                                    <li><b>Orden entrega:</b></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li><b>Fecha recepción:</b> {data.fechaRecepcionSTI}</li>
                                    <li><b>Fecha recepción DTI:</b> {data.fechaRecepcionDTI}</li>
                                    <li><b>Legajo compra:</b></li>

                                </ul>
                            </div>
                            <hr></hr>
                            <p><b>COMENTARIOS:</b> {data.comentarios}</p>
                        </div>
                    </div>
                </div>
            </div>
                </Modal.Body>
                {/* LISTADO DE PERIFÉRICOS  */}
                <Modal.Body>
                    <ListadoPerifericos/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}