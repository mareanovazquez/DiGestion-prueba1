import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { InitAsistente } from "./initAsistente";
import {AsignacionStock} from "./AsignacionStock"
import { useState } from "react";

export const ModalEntrega = ({ data, dataPerifericos, setShow, show }) => {

    const [showTableEntrega, setShowTableEntrega] = useState(false)
    const handleClose = () => {
        setShow(false);
        setShowTableEntrega(false);
    }
    const { name } = useContext(UserContext);


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
                    showTableEntrga={showTableEntrega}/>
                </ModalBody>
                <ModalBody>
                    <AsignacionStock 
                    dataPerifericos={dataPerifericos} 
                    handleClose={handleClose}
                    setShowTableEntrega={setShowTableEntrega}
                    showTableEntrega={showTableEntrega}  />
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