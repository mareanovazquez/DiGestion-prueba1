import { PDFDownloadLink } from "@react-pdf/renderer"
import { ResumenEntregaPDF } from "./ResumenEntregaPDF"

export const ResumenEntrega = ({ showResumenEntrega, setShowResumenEntrega, comprobanteEquipos, setComprobanteEquipos, handleClose, equiposAsignados, setEquiposAsignados }) => {

    return (
        <>
            {showResumenEntrega &&
                <div>
                    <h2>Comprobante de la entrega de equipos
                    </h2>
                    <div className="p-2">
                        <ul className="row">
                            <li className="col" >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">DEPARTAMENTO</div>
                                    {comprobanteEquipos.departamento}
                                </div>
                            </li>
                            <li className="col" >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ORGANISMO</div>
                                    {comprobanteEquipos.organismo}
                                </div>
                            </li>
                            <li className="col">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">FECHA DE ENTREGA</div>
                                    {comprobanteEquipos.fechaEntrega}
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">COMENTARIOS</div>
                                    {comprobanteEquipos.comentario}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <table className="table table-secondary table-striped">
                        <thead>
                            <tr>
                            <th className="text-left bg-secondary text-white">Remito N°</th>
                                <th className="text-left bg-secondary text-white">Periférico</th>
                                <th className="text-left bg-secondary text-white">Marca</th>
                                <th className="text-left bg-secondary text-white">Modelo</th>
                                <th className="text-left bg-secondary text-white">Número serie</th>
                                <th className="text-left bg-secondary text-white">Comentario equipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comprobanteEquipos.stockEquipos.map((equipo, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left">{equiposAsignados.remito}</td>
                                        <td className="text-left">{equipo.periferico}</td>
                                        <td className="text-left">{equipo.marca}</td>
                                        <td className="text-left">{equipo.modelo}</td>
                                        <td className="text-left">{equipo.numeroSerie}</td>
                                        <td className="text-left">{equipo.comentarioEquipo}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="d-grid gap-2 p-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-dark" type="button" onClick={handleClose}>Volver</button>
                        <PDFDownloadLink document={<ResumenEntregaPDF comprobanteEquipos={comprobanteEquipos} equiposAsignados={equiposAsignados} />} fileName='Comprobante_Entrega_Equipos'>
                            <button className="btn btn-danger" type="button"> PDF </button>
                        </PDFDownloadLink>
                    </div>
                </div>
            }</>
    )
}