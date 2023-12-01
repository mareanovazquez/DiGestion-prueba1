import { useState } from "react"
import { Link } from "react-router-dom";

export const AsignacionStock = ({ data, dataPerifericos, setShowTableEntrega, showTableEntrega, handleClose, remitoEntrega }) => {

    // Estado local para los campos "Asignar" y "Comentarios"
    const [asignaciones, setAsignaciones] = useState({});
    const [comentarios, setComentarios] = useState({});

    const handleAsignarChange = (perifericoId, value, cantidadDisponible) => {
        const asignacionValida = value >= 0 && value <= cantidadDisponible;

        if (asignacionValida) {
            setAsignaciones(prevState => ({ ...prevState, [perifericoId]: value }));
        } else {
            alert("Asignación de stock no válida");
        }
    };

    // Manejar cambios en el campo "Comentarios"
    const handleComentariosChange = (perifericoId, value) => {
        setComentarios(prevState => ({ ...prevState, [perifericoId]: value }));
    };

    return (
        <>
            {showTableEntrega &&
                (
                    <div className="contenedorAsignacionStock">
                        <h2 className="text-center">Asignación cantidad de stock por equipo</h2>
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
                                    <th className="text-left bg-secondary text-white">Periférico</th>
                                    <th className="text-left bg-secondary text-white">Marca</th>
                                    <th className="text-left bg-secondary text-white">Modelo</th>
                                    <th className="text-left bg-secondary text-white">Fecha recepción</th>
                                    <th className="text-left bg-secondary text-white">Garantía</th>
                                    <th className="text-left bg-secondary text-white">Cantidad</th>
                                    <th className="text-left bg-secondary text-white">Disponible</th>
                                    <th className="text-left bg-secondary text-white">Asignar</th>
                                    <th className="text-left bg-secondary text-white">Comentarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPerifericos.map((periferico) => {
                                    const cantidadDisponible = periferico.cantidad;

                                    return (
                                    <tr key={periferico.id}>
                                        <td className="text-left">{periferico.nombrePeriferico}</td>
                                        <td className="text-left">{periferico.nombreMarca}</td>
                                        <td className="text-left">{periferico.nombreModelo}</td>
                                        <td className="text-left">{data.fecha_recepcion}</td>
                                        <td className="text-left">{periferico.garantia} meses</td>
                                        <td className="text-left">{periferico.cantidad}</td>
                                        <td className="text-left">{periferico.cantidad - (asignaciones[periferico.id] || 0)}</td>
                                        <td className="text-left">
                                            <input
                                                className="form-control"
                                                type="number"
                                                value={asignaciones[periferico.id] || 0}
                                                onChange={(e) => handleAsignarChange(periferico.id, e.target.value, cantidadDisponible)}
                                                style={{ width: '70px' }}
                                            />
                                        </td>
                                        <td className="text-left">
                                            <textarea
                                                className="form-control"
                                                value={comentarios[periferico.id] || ''}
                                                onChange={(e) => handleComentariosChange(periferico.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        <div className="d-grid gap-2 p-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-primary" type="button" onClick={handleClose}>Volver</button>
                            <Link><button className="btn btn-success" type="button"> Siguiente</button></Link>
                        </div>
                    </div>
                )}
        </>
    )
}