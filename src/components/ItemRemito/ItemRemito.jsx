import eliminar from '../../assets/eliminar.svg'
import agregar from '../../assets/agregar.svg'
import volver from '../../assets/volver.svg'

export const ItemRemito = () => {

    return (

        <>

            <div className="card cardRemito" >
                <div className="card-body">
                    <h5 className="card-title">Remito N°</h5>
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">
                                <ul>
                                    <li><b>Departamento:</b></li>
                                    <li><b>Remito:</b></li>
                                    <li><b>Usuario alta:</b></li>
                                    <li><b>Orden provisión:</b></li>
                                </ul>
                            </div>
                            <div class="col">
                                <ul>
                                    <li><b>Proveedor:</b></li>
                                    <li><b>Expediente:</b></li>
                                    <li><b>Orden compra:</b></li>
                                    <li><b>Orden entrega:</b></li>
                                </ul>
                            </div>
                            <div class="col">
                                <ul>
                                    <li><b>Fecha recepción:</b></li>
                                    <li><b>Fecha recepción DTI:</b></li>
                                    <li><b>Legajo compra:</b></li>
                                    
                                </ul>
                            </div>
                            <hr></hr>
                            <p><b>COMENTARIOS:</b></p>
                        </div>
                    </div>

                    <hr></hr>
                    <h6 className="card-subtitle text-muted">PERIFÉRICOS</h6>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Periférico</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Garantía</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Disponible</th>
                                <th scope="col">Comentarios</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">CPU Mini</th>
                                <td>HP</td>
                                <td>Elite desk 800</td>
                                <td>12 meses</td>
                                <td>8</td>
                                <td>8</td>
                                <td>esto es un comentario</td>
                                <td><img src={eliminar} alt="" /></td>
                            </tr>
                            <tr>
                                <th scope="row">CPU Mini</th>
                                <td>HP</td>
                                <td>Elite desk 800</td>
                                <td>12 meses</td>
                                <td>8</td>
                                <td>8</td>
                                <td>esto es un comentario</td>
                                <td><img src={eliminar} alt="" /></td>
                            </tr>
                            <tr>
                                <th scope="row">CPU Mini</th>
                                <td>HP</td>
                                <td>Elite desk 800</td>
                                <td>12 meses</td>
                                <td>8</td>
                                <td>8</td>
                                <td>esto es un comentario</td>
                                <td><img src={eliminar} alt="" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="card-footer ">
                        <a href="#" className="card-link "><img src={agregar} alt="agregar periféricos" /></a>
                        <a href="#" className="card-link "><img src={volver} alt="volver a la lista de remitos" /></a>
                    </div>
                </div>
            </div>

        </>

    )
}