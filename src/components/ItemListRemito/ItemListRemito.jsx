import { useEffect, useState } from "react";
import { Filter } from "../Filter/Filters";
import { Link } from "react-router-dom";
import descargaRemito from '../../assets/download.svg'

export const ItemListRemito = () => {
    const [remitos, setRemitos] = useState([])

    const FetchRemitos = async () => {
        const response = await fetch('http://10.10.49.124/api/remitos');
        const results = await response.json()
        const remitos = results.data

        setRemitos(remitos)
    }

    useEffect(() => {
        FetchRemitos();
    }, [])

    const handleProductFiltered = ({ filterState, handleFilterChange }) => {


        return (
            <div className="contenedorRemitos">
                <hr></hr>
                <h2 className="text-center"> Lista de Remitos</h2>



                <br></br>
                <input type='text' value={filterState} placeholder="Filtrar" onChange={handleFilterChange} />
                <table className="table tablaRemitos">
                    <thead>
                        <tr>
                            <th className="text-center" scope='col'> ID</th>
                            <th scope='col'> Departamento</th>
                            <th scope='col'> Fecha recepción</th>
                            <th scope='col'> Remito</th>
                            <th scope='col'> Fecha recepción DTI</th>
                            <th scope="col">Descarga</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filterState === ''

                            ? remitos.map((remito) =>
                            (


                                <tr className="border-bottom my-2" key={remito.id} scope="row">
                                    <td className="border-bottom">{remito.id}</td>
                                    <td className="border-bottom">{remito.departamento_id}</td>
                                    <td className="border-bottom">{remito.fecha_recepcion}</td>
                                    <td className="border-bottom">{remito.remito}</td>
                                    <td className="border-bottom">{remito.fecha_recepcion_dti}</td>
                                    <td className="border-bottom"><Link to={`/remitos/${remito.id}`}><img src={descargaRemito} alt="" /></Link></td>
                                </tr>



                            )

                            )
                            : remitos.filter(remito => remito.departamento_id.toString().toLowerCase().includes(filterState.toLowerCase()) ||
                                remito.proveedor_id.toString().toLowerCase().includes(filterState.toLowerCase()))
                                .map((remito) => (


                                    <tr className="border-bottom my-2" key={remito.id} scope="row">
                                        <td className="border-bottom">{remito.id}</td>
                                        <td className="border-bottom" >{remito.departamento_id}</td>
                                        <td className="border-bottom" >{remito.fecha_recepcion}</td>
                                        <td className="border-bottom" >{remito.remito}</td>
                                        <td className="border-bottom" >{remito.fecha_recepcion_dti}</td>
                                        <td className="border-bottom" ><img src={descargaRemito} alt="" /> </td>
                                    </tr>


                                )



                                )
                        }
                    </tbody>
                </table>

            </div >
        )
    }

    return (
        <>
            {/*  <h3 className="text-center"> Lista de remitos</h3>

            {<ul className="card-group">
                {remitos.map((remito) => (
                    <li className="card" key={remito.id}>{remito.proveedor_id}</li>
                ))}

            </ul>} */}

            <Filter>
                {handleProductFiltered}
            </Filter>
        </>
    )
}