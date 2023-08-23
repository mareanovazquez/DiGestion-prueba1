import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../UserContext/UserContext';
import { ListadoPerifericos } from '../ListadoPerifericos/ListadoPerifericos';

export function ModalAddPerifericos({ data, deleteCamposRemito, deshabilitado }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const { name } = useContext(UserContext)

    console.log('ID departamento: ' + data.departamento.departamento_id)
    console.log('ID proveedor: ' + data.proveedor.proveedor_id)

    return (
        <>
            <Button variant={deshabilitado ? 'secondary' : 'primary'} onClick={handleShow} disabled={deshabilitado}>
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
                                            <li><b>Departamento:</b> {data.departamento.value}</li>
                                            <li><b>Remito:</b> {data.remito}</li>
                                            <li><b>Usuario alta:</b> {name}</li>
                                            <li><b>Orden provisión:</b> {data.ordenProvision}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Proveedor:</b>{data.proveedor.value}</li>
                                            <li><b>Expediente:</b>{data.expediente}</li>
                                            <li><b>Orden compra:</b>{data.ordenCompra}</li>
                                            <li><b>Orden entrega:</b> {data.ordenEntrega}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Fecha recepción:</b> {data.fechaRecepcionSTI}</li>
                                            <li><b>Fecha recepción DTI:</b> {data.fechaRecepcionDTI}</li>
                                            <li><b>Legajo compra:</b> {data.legajoCompra}</li>
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
                    <ListadoPerifericos encabezadoRemito={data} handleClose={handleClose} deleteCamposRemito={deleteCamposRemito} />
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