import { useEffect, useState } from "react";

export const CargaDatosEquipos = ({ showCargaDatos, setShowCargaDatos, remitoEntrega, setRemitoEntrega, newDataRemito, setNewDataRemito, asignaciones, setAsignaciones, comprobanteEquipos, setComprobanteEquipos, equiposAsignados, setEquiposAsignados, handleClose, showResumenEntrega, setShowResumenEntrega, handleVolverAsig }) => {
    /* Estado que almacena dinámicamente la información que el usuario 
    ingresa para cada equipo en el formulario.  */
    const [equiposData, setEquiposData] = useState([]);

    useEffect(() => {
        if (equiposAsignados && equiposAsignados.remitoModelos) {
            const duplicatedEquipos = equiposAsignados.remitoModelos.flatMap((equipo) =>
                Array.from({ length: equipo.stockAsignado }, (_, index) => ({
                    id: `${equipo.id}-${index + 1}`, // Puedes utilizar un identificador único para cada equipo duplicado
                    nombrePeriferico: equipo.nombrePeriferico,
                    nombreMarca: equipo.nombreMarca,
                    nombreModelo: equipo.nombreModelo,
                    modeloid: equipo.modelo_id,
                    numeroSerie: "",
                    comentarioEquipo: "",
                    }))
            );

            setEquiposData(duplicatedEquipos);
        }
    }, [equiposAsignados]);

    console.log(equiposData)

    const handleNumeroSerieChange = (id, value) => {
        const updatedEquiposData = [...equiposData];
        const index = updatedEquiposData.findIndex((equipo) => equipo.id === id);
        if (index !== -1) {
            updatedEquiposData[index].numeroSerie = value;
            setEquiposData(updatedEquiposData);
        }
    };

    const handleComentarioChange = (id, value) => {
        const updatedEquiposData = [...equiposData];
        const index = updatedEquiposData.findIndex((equipo) => equipo.id === id);
        if (index !== -1) {
            updatedEquiposData[index].comentarioEquipo = value;
            setEquiposData(updatedEquiposData);
        }
    };

    const handleCreateResumen = () => {
        // Verificar que todos los equipos tengan un número de serie ingresado
        const todosConNumeroSerie = equiposData.every((equipo) => equipo.numeroSerie.trim() !== "");

        if (!todosConNumeroSerie) {
            // Mostrar un mensaje de error o tomar la acción que desees si falta el número de serie
            alert("Por favor, ingresa el número de serie para todos los equipos.");
            return;
        }

        setShowCargaDatos(false);
        setShowResumenEntrega(true);

        // Obtener los datos de stockEquipos
        const stockEquiposData = equiposData.map((equipo) => ({
            periferico: equipo.nombrePeriferico,
            marca: equipo.nombreMarca,
            modelo: equipo.nombreModelo,
            modeloid: equipo.modeloid,
            numeroSerie: equipo.numeroSerie,
            comentarioEquipo: equipo.comentarioEquipo,
            // ... otras propiedades
        }));

        // Actualizar el estado comprobanteEquipos
        const nuevosDatosComprobante = {
            departamento: remitoEntrega.departamento.label,
            organismo: remitoEntrega.organismo.label,
            organismoid: remitoEntrega.organismo.organismoId,
            fechaEntrega: remitoEntrega.fechaEntrega,
            comentario: remitoEntrega.comentarios,
            stockEquipos: stockEquiposData,
        };
        setComprobanteEquipos(nuevosDatosComprobante);
    };

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
                                    {remitoEntrega.organismo.label}
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
                                <th className="text-left bg-secondary text-white">Número serie</th>
                                <th className="text-left bg-secondary text-white">Comentario equipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equiposData.map((equipo, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left">{newDataRemito.remito}</td>
                                        <td className="text-left">{equipo.nombrePeriferico}</td>
                                        <td className="text-left">{equipo.nombreMarca}</td>
                                        <td className="text-left">{equipo.nombreModelo}</td>
                                        <td className="text-left">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={equipo.numeroSerie}
                                                onChange={(e) => handleNumeroSerieChange(equipo.id, e.target.value)}
                                            />
                                        </td>
                                        <td className="text-left">
                                            <textarea
                                                className="form-control"
                                                value={equipo.comentarioEquipo}
                                                onChange={(e) => handleComentarioChange(equipo.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className="d-grid gap-2 p-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-dark" type="button" onClick={handleClose}>Cerrar</button>
                        <button className="btn btn-primary" type="button" onClick={handleVolverAsig}>Atrás</button>
                        <button className="btn btn-success" type="button" onClick={handleCreateResumen} > Siguiente</button>
                    </div>
                </div>
            }
        </>
    )
}