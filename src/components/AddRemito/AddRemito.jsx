export const AddRemito = () => {

    return (

        <>
            <div className="contenedorAltaRemito">
                <h2 className="text-center"> Altas remitos</h2>
                <div className="row altaRemito">
                    <div className="col">
                        <label>Departamento</label>
                        <input type="text" className="form-control" placeholder="Departamento" aria-label="Departamento" />
                    </div>
                    <div className="col">
                        <label for='proveedores' >Proveedor</label>
                        <div>
                                <select className="form-control" name="opciones">
                                    <option value="" disabled selected className="text-muted">Proveedores</option>
                                    <option value="opcion1">Proveedor 1</option>
                                    <option value="opcion2">Proveedor 2</option>
                                    <option value="opcion3">Proveedor 3</option>
                                    <option value="opcion4">Proveedor 4</option>
                                </select>
                        </div>
                        
                    </div>
                    <div className="col">
                        <label for='fechaRecepcionSTI' >Fecha recepción STI</label>
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
                        <label for='fechaRecepcionDTI' >Fecha recepción DTI</label>
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
                        <label>COMENTARIOS</label>
                        <textarea id="comentarios" name="comentarios" rows="3" cols="100"></textarea>

                    </div>
                </div>
                <div class="container contenedorBtnGuardarRemito">
                    <button class="btn btn-danger btnGuardarRemito" >Guardar</button>
                </div>
            </div>
        </>
    )
}