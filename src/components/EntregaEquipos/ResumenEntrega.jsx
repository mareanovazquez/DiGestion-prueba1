
import { useEffect, useState } from "react"

export const ResumenEntrega = ({ showResumenEntrega, setShowResumenEntrega, comprobanteEquipos, setComprobanteEquipos, handleClose, equiposAsignados, setEquiposAsignados, remitoEntrega, setRemitoEntrega, equiposDataGroup, setEquiposDataGroup, perifericosEntregados, setPerifericosEntregados, showConfirmacionEntrega, setShowConfirmacionEntrega }) => {

    /* ACA DEBERÍA HACERSE EL POST PARA ENVIAR LOS DATOS ACTUALIZADOS A MATÍAS */
   

    useEffect(() => {
        if (comprobanteEquipos && comprobanteEquipos.stockEquipos) {
            // Agrupar equipos por remito_modelo_id y modelo_id
            const groupedEquipos = comprobanteEquipos.stockEquipos.reduce((accumulator, equipo) => {
                const key = `${equipo.remitoid}-${equipo.modeloid}`;
                if (!accumulator[key]) {
                    accumulator[key] = {
                        remito_modelo_id: equipo.remitoid,
                        modelo_id: equipo.modeloid,
                        cantidad: 1, // Inicializar la cantidad en 1, ya que estamos contando este equipo
                        data: [{
                            numeroSerie: equipo.numeroSerie,
                            comentarioEquipo: equipo.comentarioEquipo
                        }]
                    };
                } else {
                    accumulator[key].cantidad++; // Incrementar la cantidad de este modelo
                    accumulator[key].data.push({ // Agregar este equipo al array de datos
                        numeroSerie: equipo.numeroSerie,
                        comentarioEquipo: equipo.comentarioEquipo
                    });
                }
                return accumulator;
            }, {});

            const equiposArray = Object.values(groupedEquipos);

            setEquiposDataGroup(equiposArray);
        }
    }, [comprobanteEquipos]);


    const handleEntregaPerifericos = () => {
        setPerifericosEntregados({
            entrega: {
                juzgado_id: comprobanteEquipos.organismoid,
                fecha_entrega: comprobanteEquipos.fechaEntrega,
                comentario: comprobanteEquipos.comentario
            },
            equipos: equiposDataGroup

        })

        setShowConfirmacionEntrega(true)
       setShowResumenEntrega(false)
    }

    console.log(perifericosEntregados)

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
                        <button className="btn btn-primary" onClick={handleEntregaPerifericos}>Confirmar entrega</button>
                    </div>
                </div>
            }</>
    )
}