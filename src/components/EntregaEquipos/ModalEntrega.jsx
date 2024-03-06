import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { InitAsistente } from "./InitAsistente";
import { AsignacionStock } from "./AsignacionStock";
import { CargaDatosEquipos } from "./CargaDatosEquipos";
import { ResumenEntrega } from "./ResumenEntrega"
import {ConfirmacionEntrega} from "./ConfirmacionEntrega"
import { useState } from "react";

export const ModalEntrega = ({ data, dataPerifericos, setShow, show }) => {

    const { name } = useContext(UserContext);

     /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL COMPONENTE initAsistente */
    const [showInitAsistente, setShowInitAsistente] = useState(true)

    /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL MODULO ASIGNACIÓN STOCK */
    const [showAsignacionStock, setShowAsignacionStock] = useState(false)

    /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL MODULO CARGA DATOS EQUIPOS */
    const [showCargaDatos, setShowCargaDatos] = useState(false)

    /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL MODULO DE RESUMEN ENTREGA EQUIPOS */
    const [showResumenEntrega, setShowResumenEntrega] = useState(false)

    /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL MODULO DE CONFIRMACIÓN DE ENTREGA */
    const [showConfirmacionEntrega, setShowConfirmacionEntrega] = useState(false)

    /* ESTADO PARA CONTROLAR LOS DATOS DEL ENCABEZADO DEL REMITO DE ENTREGA */
    const [remitoEntrega, setRemitoEntrega] = useState({});

    /* ESTADO PARA CONTROLAR LOS DATOS NUEVOS DEL REMITO CON EL VALOR ACTUALIZAZO DEL STOCK DE PERIFERICOS */
    const [newDataRemito, setNewDataRemito] = useState({});

    /* ESTADO PARA GENERAR EL COMPROBANTE PDF DE ENTREGA DE EQUIPOS */
    const [comprobanteEquipos, setComprobanteEquipos] = useState({});

    /* ESTADO PARA MANEJAR LAS CANTIDADES DE STOCK ASIGNADO POR REMITO */
    const [asignaciones, setAsignaciones] = useState({});

    /* ESTADO PARA CONTROLAR LOS NUEVOS DATOS DEL REMITO CON EL STOCK ASIGNADO */
    const [equiposAsignados, setEquiposAsignados] = useState({})
    
    /* ESTADO PARA CONTROLAR EL SELECT2 DE ORGANISMO */
    const [deptoId, setDeptoId] = useState('');

    /* ESTADO PARA CONTROLAR EL RESUMEN DE LOS EQUIPOS ENTREGADOS AL BACKEND */
    const [equiposDataGroup, setEquiposDataGroup] = useState({})

    /* ESTADO PARA ARMAR EL ARCHIVO FINAL PARA ENVIAR POR POST */
    const [perifericosEntregados, setPerifericosEntregados] = useState({});

    /* Handler para cerrar el modal y reinicializar todo el asistente */
    const handleClose = () => {
        setShow(false);
        setShowAsignacionStock(false);
        setShowCargaDatos(false)
        setAsignaciones({})
        setShowResumenEntrega(false)
        setComprobanteEquipos({})
        setShowInitAsistente(true)
        setNewDataRemito({})
        setShowConfirmacionEntrega(false)
        setPerifericosEntregados({})
    }

    /* Handler de renderización de volver atrás desde
    asignación Stock a initAsistente */
    const handleVolverInit = ()=> {
        setShowAsignacionStock(false)
        setShowInitAsistente(true)
    }

/* Handler de renderización de volver atrás desde
    carga de datos a asignacionStock */
    const handleVolverAsig = ()=> {
        setShowAsignacionStock(true)
        setShowCargaDatos(false)
    }

    /* Handler para la renderización de volver atrás desde
    Resumen entrega a Carga de datos */
    const handleVolverCargaDatos = ()=> {
        setShowCargaDatos(true)
        setShowResumenEntrega(false)
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
                    <Modal.Title>
                        <h2>
                            Remito N° {data.remito}
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <ModalBody>

                    <InitAsistente
                        showInitAsistente={showInitAsistente}
                        setShowInitAsistente={setShowInitAsistente}
                        showAsignacionStock={showAsignacionStock}
                        setShowAsignacionStock={setShowAsignacionStock}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        deptoId={deptoId}
                        setDeptoId={setDeptoId}
                        handleClose={handleClose}
                    />
                </ModalBody>
                <ModalBody>
                    <AsignacionStock
                        data={data}
                        dataPerifericos={dataPerifericos}
                        handleClose={handleClose}
                        showAsignacionStock={showAsignacionStock}
                        setShowAsignacionStock={setShowAsignacionStock}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        newDataRemito={newDataRemito}
                        setNewDataRemito={setNewDataRemito}
                        showCargaDatos={showCargaDatos}
                        setShowCargaDatos={setShowCargaDatos}
                        comprobanteEquipos={comprobanteEquipos}
                        setComprobanteEquipos={setComprobanteEquipos}
                        asignaciones={asignaciones}
                        setAsignaciones={setAsignaciones}
                        equiposAsignados={equiposAsignados}
                        setEquiposAsignados={setEquiposAsignados}
                        handleVolverInit={handleVolverInit}
                    />
                </ModalBody>
                <ModalBody>
                    <CargaDatosEquipos
                        setShowCargaDatos={setShowCargaDatos}
                        showCargaDatos={showCargaDatos}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        newDataRemito={newDataRemito}
                        setNewDataRemito={setNewDataRemito}
                        comprobanteEquipos={comprobanteEquipos}
                        setComprobanteEquipos={setComprobanteEquipos}
                        asignaciones={asignaciones}
                        setAsignaciones={setAsignaciones}
                        equiposAsignados={equiposAsignados}
                        setEquiposAsignados={setEquiposAsignados}
                        handleClose={handleClose}
                        showResumenEntrega={showResumenEntrega}
                        setShowResumenEntrega={setShowResumenEntrega}
                        handleVolverAsig={handleVolverAsig}
                        equiposDataGroup={equiposDataGroup}
                        setEquiposDataGroup={setEquiposDataGroup}
                    />
                </ModalBody>
                <ModalBody>
                    <ResumenEntrega
                        showResumenEntrega={showResumenEntrega}
                        setShowResumenEntrega={setShowResumenEntrega}
                        comprobanteEquipos={comprobanteEquipos}
                        setComprobanteEquipos={setComprobanteEquipos}
                        handleClose={handleClose}
                        equiposAsignados={equiposAsignados}
                        setEquiposAsignados={setEquiposAsignados}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        equiposDataGroup={equiposDataGroup}
                        setEquiposDataGroup={setEquiposDataGroup}
                        perifericosEntregados ={perifericosEntregados}
                        setPerifericosEntregados ={setPerifericosEntregados}
                        showConfirmacionEntrega={showConfirmacionEntrega}
                        setShowConfirmacionEntrega={setShowConfirmacionEntrega}
                        handleVolverCargaDatos={handleVolverCargaDatos}
                    />
                </ModalBody>
                <ModalBody>
                    <ConfirmacionEntrega
                    equiposAsignados={equiposAsignados}
                    setEquiposAsignados={setEquiposAsignados}
                    comprobanteEquipos = {comprobanteEquipos} 
                    setComprobanteEquipos = {setComprobanteEquipos} 
                    perifericosEntregados = {perifericosEntregados} 
                    setPerifericosEntregados = {setPerifericosEntregados}
                    showConfirmacionEntrega = {showConfirmacionEntrega}
                    setShowConfirmacionEntrega = {setShowConfirmacionEntrega}
                    handleClose={handleClose}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}