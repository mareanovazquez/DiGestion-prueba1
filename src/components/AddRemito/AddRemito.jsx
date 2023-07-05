import { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext/UserContext";
import { Link } from "react-router-dom";
import { ModalAddPerifericos } from "../ModalAddPerifericos/ModalAddPerifericos";
import { SelectProveedores } from "../Select/SelectProveedores";
import { SelectDepartamentos } from "../Select/SelectDepartamentos";

export const AddRemito = () => {

    const [dataAddRemito, setDataAddRemito] = useState({
        departamento: "",
        proveedor: "",
        fechaRecepcionSTI: "",
        remito: "",
        expediente: "",
        fechaRecepcionDTI: "",
        ordenCompra: "",
        legajoCompra: "",
        ordenProvision: "",
        ordenEntrega: "",
        comentarios: "",
        usuarioAlta: ""
    });

    const { name } = useContext(UserContext);
    const handleDepartamentoChange = (selectedDepartamento) => {
        setDataAddRemito({ ...dataAddRemito, departamento: selectedDepartamento })
    }

    const handleProveedorChange = (selectedProveedor) => {
        setDataAddRemito({ ...dataAddRemito, proveedor: selectedProveedor })
    }

    useEffect(() => {
        setDataAddRemito({ ...dataAddRemito, usuarioAlta: name })
    }, [name])

    const handleCamposRemito = () => {
        setDataAddRemito({
            departamento: "",
            proveedor: "",
            fechaRecepcionSTI: "",
            remito: "",
            expediente: "",
            fechaRecepcionDTI: "",
            ordenCompra: "",
            legajoCompra: "",
            ordenProvision: "",
            ordenEntrega: "",
            comentarios: "",
            
        })
    }

    return (
        <>
            <div className="contenedorAltaRemito">
                <div className="row altaRemito">
                    <h2 className="text-left"> Alta de Remito</h2>
                    <div className="col">
                        <label>Usuario Alta</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Usuario"
                            disabled
                            aria-label="Usuario Ata"
                            value={name}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor='departamentos' >Departamentos</label>
                        <SelectDepartamentos onChange={handleDepartamentoChange} />
                    </div>

                    <div className="col">
                        <label htmlFor='proveedores' >Proveedores</label>
                        <SelectProveedores onChange={handleProveedorChange} />
                    </div>

                    <div className="col">
                        <label htmlFor='fechaRecepcionSTI' >Fecha recepción STI</label>
                        <input className="form-control"
                            type="date" id="fechaRecepcionSTI"
                            name="fecha" pattern="\d{1,2}/\d{1,2}/\d{2}"
                            placeholder="dd/mm/aa"
                            required aria-label="Fecha recepción STI"
                            value={dataAddRemito.fechaRecepcionSTI}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, fechaRecepcionSTI: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="row altaRemito">
                    <div className="col">
                        <label>Remito</label>
                        <input type="number"
                            className="form-control"
                            placeholder="Número remito"
                            aria-label="Remito"
                            value={dataAddRemito.remito}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, remito: e.target.value })
                            }
                        />
                    </div>

                    <div className="col">
                        <label>Expediente</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Expediente"
                            aria-label="Expediente"
                            value={dataAddRemito.expediente}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, expediente: e.target.value })
                            }
                        />
                    </div>
                    <div className="col">
                        <label htmlFor='fechaRecepcionDTI' >Fecha recepción DTI</label>
                        <input className="form-control"
                            type="date"
                            id="fechaRecepcionDTI"
                            name="fecha"
                            pattern="\d{1,2}/\d{1,2}/\d{2}"
                            placeholder="dd/mm/aa"
                            required aria-label="Fecha recepción DTI"
                            value={dataAddRemito.fechaRecepcionDTI}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, fechaRecepcionDTI: e.target.value })
                            }
                        />
                    </div>

                </div>
                <div className="row altaRemito">
                    <div className="col">
                        <label>Orden compra</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Orden compra"
                            aria-label="orden compra"
                            value={dataAddRemito.ordenCompra}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, ordenCompra: e.target.value })
                            }
                        />
                    </div>

                    <div className="col">
                        <label>Legajo compra</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Legajo compra"
                            aria-label="Legajo compra"
                            value={dataAddRemito.legajoCompra}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, legajoCompra: e.target.value })
                            }
                        />
                    </div>

                    <div className="col">
                        <label>Orden provisión</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Orden provisión"
                            aria-label="orden provisión"
                            value={dataAddRemito.ordenProvision}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, ordenProvision: e.target.value })
                            }
                        />
                    </div>

                    <div className="col">
                        <label>Orden entrega</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Orden entrega"
                            aria-label="Orden entrega"
                            value={dataAddRemito.ordenEntrega}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, ordenEntrega: e.target.value })
                            }
                        />
                    </div>

            </div>
                <div className="row altaRemito">
                    <div className="col">
                        <label htmlFor="comentarios">COMENTARIOS</label>
                        <textarea id="comentarios"
                            className="form-control"
                            name="comentarios"
                            rows="3"
                            cols="100"
                            value={dataAddRemito.comentarios}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, comentarios: e.target.value })
                            }
                        ></textarea>

                    </div>
                </div>
                <div className="row altaRemito">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to='/remitos'><button className="btn btn-primary" type="button">Volver</button> </Link>
                        <ModalAddPerifericos data={dataAddRemito} />
                        <button onClick={handleCamposRemito} className="btn btn-primary" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}