export const CargaDatosEquipos = ({ showCargaDatos, setShowCargaDatos, remitoEntrega, setRemitoEntrega, newDataRemito, setNewDataRemito }) => {

    const stockEquipos = newDataRemito.remitoModelos.filter(equipo => equipo.cantidad !== equipo.disponible);

    console.log(stockEquipos)

    return (
        <>
            {showCargaDatos &&
                <div className="contenedorCargaDatos">
                    <h2>Carga de datos de garantía de los equipos asignados
                    </h2>
                    <div className="p-2">
                        <ul className="row">
                            <li className="col" >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">DEPARTAMENTO</div>
                                    {remitoEntrega.departamento.label}
                                </div>
                            </li>
                            <li className="col" >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ORGANISMO</div>
                                    {remitoEntrega.organismo}
                                </div>
                            </li>
                            <li className="col">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">FECHA DE ENTREGA</div>
                                    {remitoEntrega.fechaEntrega}
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">COMENTARIOS</div>
                                    {remitoEntrega.comentarios}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <table className="table table-secondary table-striped">
                        <thead>
                            <tr>
                                <th className="text-left bg-secondary text-white">Remito</th>
                                <th className="text-left bg-secondary text-white">Periférico</th>
                                <th className="text-left bg-secondary text-white">Marca</th>
                                <th className="text-left bg-secondary text-white">Modelo</th>
                                <th className="text-left bg-secondary text-white">N° serie</th>
                                <th className="text-left bg-secondary text-white">Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockEquipos.map((equipo) => {
                                return (
                                    <tr key={equipo.id}>
                                        <td className="text-left">{newDataRemito.remito}</td>
                                        <td className="text-left">{equipo.nombrePeriferico}</td>
                                        <td className="text-left">{equipo.nombreMarca}</td>
                                        <td className="text-left">{equipo.nombreModelo}</td>
                                        <td className="text-left"> <input type="text" className="form-control" /></td>
                                        <td className="text-left"><textarea className="form-control" name="" id=""></textarea></td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>

            }
        </>

    )

}