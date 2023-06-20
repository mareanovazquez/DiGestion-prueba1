import { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext/UserContext";
import { Link } from "react-router-dom";
import { ModalAddPerifericos } from "../ModalAddPerifericos/ModalAddPerifericos";

import { SelectProveedores } from "../SelectProveedores/SelectProveedores";
import { EncabezadoRemito } from "./EncabezadoRemito";




export const AddRemito = () => {

    const [dataAddRemito, setDataAddRemito] = useState({
        departamento: "",
        proveedor: '',
        fechaRecepcionSTI: "",
        remito: "",
        expediente: "",
        fechaRecepcionDTI: "",
        ordenCompra: "",
        legajoCompra: "",
        ordenProvision: "",
        ordenEntrega: "",
        comentarios: ""
    });

    const { nombreProveedor } = useContext(UserContext)




    const handleAddRemito = (e) => {

        console.log(dataAddRemito);

    
             
    }

    const handleProveedorChange = (selectedProveedor) => {
        setDataAddRemito({ ...dataAddRemito, proveedor: selectedProveedor })
    
    }

    const handleCamposRemito = () => {

        setDataAddRemito({
            departamento: "",
            proveedor: '',
            fechaRecepcionSTI: "",
            remito: "",
            expediente: "",
            fechaRecepcionDTI: "",
            ordenCompra: "",
            legajoCompra: "",
            ordenProvision: "",
            ordenEntrega: "",
            comentarios: ""

        })

        
    }



    return (

        <>

            <div className="contenedorAltaRemito">

                <div className="row altaRemito">
                    <h2 className="text-left"> Alta de Remito</h2>
                    <div className="col">
                        <label>Departamento</label>

                        <input type="text"
                            className="form-control"
                            placeholder="Aca debería haber una lista precargada de departamentos"
                            aria-label="Departamento"
                            value={dataAddRemito.departamento}
                            onChange={(e) =>
                                setDataAddRemito({ ...dataAddRemito, departamento: e.target.value })
                            } />
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
                        <button onClick={handleAddRemito} className="btn btn-primary" type="button">Crear remito</button>
                        <button onClick={handleCamposRemito} className="btn btn-primary" type="button">Borrar campos</button>
                        
                    </div>
                </div>
            </div>

            <EncabezadoRemito data={dataAddRemito}/>


        </>
    )
}