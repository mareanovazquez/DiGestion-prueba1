import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { InitAsistente } from "./InitAsistente";
import { AsignacionStock } from "./AsignacionStock";
import { CargaDatosEquipos } from "./CargaDatosEquipos";
import { useState } from "react";

export const ModalEntrega = ({ data, dataPerifericos, setShow, show }) => {

    const { name } = useContext(UserContext);

    /* ESTADO PARA CONTROLAR LA RENDERIZACIÓN DEL MODULO ASIGNACIÓN STOCK */
    const [showAsignacionStock, setShowAsignacionStock] = useState(false)

    const [showCargaDatos, setShowCargaDatos] = useState(false)

    /* ESTADO PARA CONTROLAR LOS DATOS DEL ENCABEZADO DEL REMITO DE ENTREGA */
    const [remitoEntrega, setRemitoEntrega] = useState({});

    /* ESTADO PARA CONTROLAR LOS DATOS NUEVOS DEL REMITO CON EL VALOR ACTUALIZAZO DEL STOCK DE PERIFERICOS */
    const [newDataRemito, setNewDataRemito] = useState({})

    /* ESTADO PARA CONTROLAR EL SELECT2 DE ORGANISMO */
    const [deptoId, setDeptoId] = useState('')

    const handleClose = () => {
        setShow(false);
        setShowAsignacionStock(false);
        setShowCargaDatos(false)
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
                    <Modal.Title>Remito N° {data.remito}</Modal.Title>
                </Modal.Header>
                <ModalBody>

                    <InitAsistente
                        setShowAsignacionStock={setShowAsignacionStock}
                        showAsignacionStock={showAsignacionStock}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        deptoId={deptoId}
                        setDeptoId={setDeptoId}
                    />
                </ModalBody>
                <ModalBody>
                    <AsignacionStock
                        data={data}
                        dataPerifericos={dataPerifericos}
                        handleClose={handleClose}
                        setShowAsignacionStock={setShowAsignacionStock}
                        showAsignacionStock={showAsignacionStock}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        setNewDataRemito={setNewDataRemito}
                        newDataRemito={newDataRemito}
                        setShowCargaDatos={setShowCargaDatos}
                        showCargaDatos={showCargaDatos} />
                </ModalBody>
                <ModalBody>
                    <CargaDatosEquipos
                    setShowCargaDatos ={setShowCargaDatos}
                    showCargaDatos={showCargaDatos}
                    remitoEntrega={remitoEntrega}
                    setRemitoEntrega={setRemitoEntrega}
                    newDataRemito={newDataRemito}
                    setNewDataRemito={setNewDataRemito} />
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </ModalFooter>

            </Modal>



        </>
    )
}