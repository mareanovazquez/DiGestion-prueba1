import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { InitAsistente } from "./InitAsistente";
import { AsignacionStock } from "./AsignacionStock";
import { CargaDatosEquipos } from "./CargaDatosEquipos";
import { useState } from "react";

export const ModalEntrega = ({ data, dataPerifericos, setShow, show }) => {

    const { name } = useContext(UserContext);
    const [showTableEntrega, setShowTableEntrega] = useState(false)

    /* ESTADO PARA CONTROLAR LOS DATOS DEL ENCABEZADO DEL REMITO DE ENTREGA */
    const [remitoEntrega, setRemitoEntrega] = useState({});

    /* ESTADO PARA CONTROLAR LOS DATOS NUEVOS DEL REMITO CON EL VALOR ACTUALIZAZO DEL STOCK DE PERIFERICOS */
    const [newDataRemito, setNewDataRemito] = useState({})

    const handleClose = () => {
        setShow(false);
        setShowTableEntrega(false);
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
                        setShowTableEntrega={setShowTableEntrega}
                        showTableEntrga={showTableEntrega}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                    />
                </ModalBody>
                <ModalBody>
                    <AsignacionStock
                        data={data}
                        dataPerifericos={dataPerifericos}
                        handleClose={handleClose}
                        setShowTableEntrega={setShowTableEntrega}
                        showTableEntrega={showTableEntrega}
                        remitoEntrega={remitoEntrega}
                        setRemitoEntrega={setRemitoEntrega}
                        setNewDataRemito={setNewDataRemito}
                        newDataRemito={newDataRemito} />
                </ModalBody>
                <ModalBody>
                    <CargaDatosEquipos />
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