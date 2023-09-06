import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../UserContext/UserContext';
import { ListadoPerifericos } from '../ListadoPerifericos/ListadoPerifericos';

export function ModalAddPerifericos({setDataAddRemito, dataAddRemito, setShow, show }) {

    const handleClose = () => {
    setShow(false);
    setDataAddRemito({});
    }    

    const { name } = useContext(UserContext)

    if (!dataAddRemito) {
        return <p>No hay datos disponibles para mostrar.</p>;
    }


    return (
        <>
            <Modal
                size='xl'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remito N° {dataAddRemito.remito}</Modal.Title>
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
                                            <li><b>Usuario alta:</b> {name}</li>
                                            <li><b>Orden provisión:</b> {dataAddRemito.ordenProvision}</li>
                                            <li><b>Expediente:</b>{dataAddRemito.expediente}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Departamento:</b> {dataAddRemito?.departamento?.value}</li>
                                            <li><b>Orden compra:</b>{dataAddRemito.ordenCompra}</li>
                                            <li><b>Orden entrega:</b> {dataAddRemito.ordenEntrega}</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li><b>Proveedor:</b>{dataAddRemito?.proveedor?.value}</li> 
                                            <li><b>Fecha recepción:</b> {dataAddRemito.fechaRecepcionSTI}</li>
                                            <li><b>Legajo compra:</b> {dataAddRemito.legajoCompra}</li>
                                        </ul>
                                    </div>
                                    <hr></hr>
                                    <p><b>COMENTARIOS:</b> {dataAddRemito.comentarios}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* LISTADO DE PERIFÉRICOS  */}
                <Modal.Body>
                    <ListadoPerifericos encabezadoRemito={dataAddRemito} handleClose={handleClose} />
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