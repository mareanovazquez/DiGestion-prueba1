import { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext/UserContext";
import { Link } from "react-router-dom";
import { ModalAddPerifericos } from "../ModalAddPerifericos/ModalAddPerifericos";




export const AddRemito = () => {


    const [proveedores, setProveedores] = useState([]);
    const { usuarios, setUsuarios, permisos, setPermisos } = useContext(UserContext)

    //este useEffect hace un fetch a la lista de proveedores
    useEffect(() => {
        const FetchProveedores = async () => {
            const response = await fetch('http://10.10.49.124/api/proveedores');
            const result = await response.json();
            const proveedores = result.data

            setProveedores(proveedores);

        }

        FetchProveedores()

    }, []);

    const handleAddRemito = (e) => {
        e.preventDefault();

    }



    


    return (

        <>

            <div className="contenedorAltaRemito">

                <div className="row altaRemito">
                    <h2 className="text-left"> Alta de Remito</h2>
                    <div className="col">
                        <label>Departamento</label>
                        <input type="text" className="form-control" placeholder="Aca debería haber una lista precargada de departamentos" aria-label="Departamento" />
                    </div>
                    <div className="col">
                        <label htmlFor='proveedores' >Proveedores</label>
                        <div>
                            <select className="form-control" name="opciones" defaultValue='1'>
                                <option value='1' disabled className="text-muted">Proveedores</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value="" >{proveedor.nombre}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="col">
                        <label htmlFor='fechaRecepcionSTI' >Fecha recepción STI</label>
                        <input className="form-control" type="date" id="fechaRecepcionSTI" name="fecha" pattern="\d{1,2}/\d{1,2}/\d{2}" placeholder="dd/mm/aa" required aria-label="Fecha recepción STI" />
                    </div>
                </div>
                <div className="row altaRemito">
                    <div className="col">
                        <label>Remito</label>
                        <input type="text" className="form-control" placeholder="Remito" aria-label="Remito" />
                    </div>
                    <div className="col">
                        <label>Expediente</label>
                        <input type="text" className="form-control" placeholder="Expediente" aria-label="Expediente" />
                    </div>
                    <div className="col">
                        <label htmlFor='fechaRecepcionDTI' >Fecha recepción DTI</label>
                        <input className="form-control" type="date" id="fechaRecepcionDTI" name="fecha" pattern="\d{1,2}/\d{1,2}/\d{2}" placeholder="dd/mm/aa" required aria-label="Fecha recepción DTI" />
                    </div>
                </div>
                <div className="row altaRemito">
                    <div className="col">
                        <label>Orden compra</label>
                        <input type="text" className="form-control" placeholder="Orden compra" aria-label="orden compra" />
                    </div>
                    <div className="col">
                        <label>Legajo compra</label>
                        <input type="text" className="form-control" placeholder="Legajo compra" aria-label="Legajo compra" />
                    </div>
                    <div className="col">
                        <label>Orden provisión</label>
                        <input type="text" className="form-control" placeholder="Orden provisión" aria-label="orden provisión" />
                    </div>
                    <div className="col">
                        <label>Orden entrega</label>
                        <input type="text" className="form-control" placeholder="Orden entrega" aria-label="Orden entrega" />
                    </div>

                </div>

                <div className="row altaRemito">
                    <div className="col">
                        <label htmlFor="comentarios">COMENTARIOS</label>
                        <textarea id="comentarios" className="form-control" name="comentarios" rows="3" cols="100"></textarea>

                    </div>
                </div>
                <div className="row altaRemito">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to='/remitos'><button className="btn btn-primary" type="button">Volver</button> </Link>
                        <button onSubmit={handleAddRemito} className="btn btn-primary" type="button">Crear remito</button>
                        <ModalAddPerifericos/>
                    </div>
                </div>
            </div>

            
        </>
    )
}