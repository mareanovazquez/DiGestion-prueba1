export const AddRemito = () => {

    return (

        <>
            <div className="contenedorAltaRemito">

                <div className="row altaRemito">
                    <h2 className="text-left"> Alta de Remito</h2>
                    <div className="col">
                        <label>Departamento</label>
                        <input type="text" className="form-control" placeholder="Departamento" aria-label="Departamento" />
                    </div>
                    <div className="col">
                        <label htmlfor='proveedores' >Proveedor</label>
                        <div>
                            <select className="form-control" name="opciones">
                                    <option value="" disabled className="text-muted">Proveedores</option>
                                <option value="opcion1">Proveedor 1</option>
                                <option value="opcion2">Proveedor 2</option>
                                <option value="opcion3">Proveedor 3</option>
                                <option value="opcion4">Proveedor 4</option>
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
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        {/* <button class="btn btn-primary me-md-2" type="button">Button</button> */}
                        <button class="btn btn-primary" type="button">Guardar</button>
                    </div>


                </div>
            </div>
        </>
    )
}