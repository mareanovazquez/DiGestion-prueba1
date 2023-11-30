import { useState } from "react"
import { Link } from "react-router-dom";

export const AsignacionStock = ({ data, dataPerifericos, setShowTableEntrega, showTableEntrega, handleClose }) => {

    // Estado local para los campos "Asignar" y "Comentarios"
    const [asignaciones, setAsignaciones] = useState({});
    const [comentarios, setComentarios] = useState({});

    // Manejar cambios en el campo "Asignar"
    const handleAsignarChange = (perifericoId, value) => {
        setAsignaciones(prevState => ({ ...prevState, [perifericoId]: value }));
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
                                {dataPerifericos.map((periferico) => (
                                    <tr key={periferico.id}>
                                        <td className="text-left">{periferico.nombrePeriferico}</td>
                                        <td className="text-left">{periferico.nombreMarca}</td>
                                        <td className="text-left">{periferico.nombreModelo}</td>
                                        <td className="text-left">{data.fecha_recepcion}</td>
                                        <td className="text-left">{periferico.garantia} meses</td>
                                        <td className="text-left">{periferico.cantidad - (asignaciones[periferico.id] || 0)}</td>
                                        <td className="text-left">{periferico.cantidad}</td>
                                        <td className="text-left">
                                            <td className="text-left">
                                                <input
                                                className="form-control"
                                                    type="number"
                                                    value={asignaciones[periferico.id] || ''}
                                                    onChange={(e) => handleAsignarChange(periferico.id, e.target.value)}
                                                    style={{ width: '50px' }} // Establece el ancho según tus necesidades
                                                />
                                            </td>
                                        </td>
                                        <td className="text-left">
                                            <textarea
                                            className="form-control"
                                                value={comentarios[periferico.id] || ''}
                                                onChange={(e) => handleComentariosChange(periferico.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
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