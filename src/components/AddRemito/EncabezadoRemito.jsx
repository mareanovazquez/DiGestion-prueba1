d

export const EncabezadoRemito = ({ data }) => {
    
    return (        
            <div className="card cardRemito" >
                <div className="card-body">
                    <h5 className="card-title">Remito N° {data.remito}</h5>
                    <div className="container">
                        <div className="row align-items-start">
                            <div className="col">
                                <ul>
                                    <li><b>Departamento:</b>{data.departamento}</li>
                                    <li><b>Remito:</b> {data.remito}</li>
                                    <li><b>Usuario alta:</b>{data.usuarioAlta}</li>
                                    <li><b>Orden provisión:</b>{data.ordenProvision}</li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li><b>Proveedor:</b>{data.proveedor}</li>
                                    <li><b>Expediente:</b>{data.expediente}</li>
                                    <li><b>Orden compra:</b>{data.ordenCompra}</li>
                                    <li><b>Orden entrega:</b> {data.ordenEntrega}</li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li><b>Fecha recepción STI :</b> {data.fechaRecepcionSTI}</li>
                                    <li><b>Fecha recepción DTI:</b>{data.fechaRecepcionDTI}</li>
                                    <li><b>Legajo compra:</b>{data.legajoCompra}</li>

                                </ul>
                            </div>
                            <hr></hr>                            
                            <p><b>COMENTARIOS:</b> {data.comentarios}</p>
                        </div>
                    </div>
                </div>
            </div>

    )
}