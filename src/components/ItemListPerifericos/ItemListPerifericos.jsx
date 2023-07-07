import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext/UserContext"
import { Loading } from "../Loading/Loading";
import HttpService from "../../services/HttpService";

export const ItemListPerifericos = () => {

    const { permisos, departamento, token } = useContext(UserContext)

    const [perifericos, setPerifericos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterNombre, setFilterNombre] = useState('')
    const [filterFechaCreacion, setFilterFechaCreacion] = useState('')
    const [filterFechaModificacion, setfilterFechaModificacion] = useState('')
    const [filterSubcuenta, setFilterSubcuenta] = useState('')


    const http = new HttpService();
    useEffect(() => {
        http.getData('/perifericos', token)
            .then(response => {
                const perifericos = response.data.data
                setPerifericos(perifericos)
                setIsLoading(false)
            })
    }, [])

    const handlePerifericosFiltered = () => {
        const filteredPerifericos = perifericos.filter((periferico) =>
            periferico.nombre.toString().toLowerCase().includes(filterNombre.toLowerCase())
            && periferico.created_at.includes(filterFechaCreacion)
            && periferico.subcuenta.toLowerCase().includes(filterSubcuenta.toLowerCase()
                && periferico.updated_at.includes(filterFechaModificacion)
            ))
        return (
            <>
                <div className="contenedorRemitos">
                    <hr></hr>
                    <h2 className="text-center"> Lista de Periféricos</h2>
                    <br></br>
                    <table className="table tablaRemitos">
                        <thead>
                            <tr>
                                <th className="text-center" scope='col'> ID</th>
                                <th scope='col'> Nombre</th>
                                <th scope='col'> Fecha creación</th>
                                <th scope='col'> Subcuenta</th>
                                <th scope='col'> Fecha modificación</th>
                            </tr>
                            <tr>
                                <th className="text-center" scope='col'></th>
                                <th scope='col'> <input type='text' value={filterNombre} placeholder="Filtrar" onChange={(e) => setFilterNombre(e.target.value)} /></th>
                                <th scope='col'> <input type="date" value={filterFechaCreacion} placeholder="filtrar" onChange={(e) => setFilterFechaCreacion(e.target.value)} /></th>
                                <th scope='col'> <input type='text' value={filterSubcuenta} placeholder="Filtrar" onChange={(e) => setFilterSubcuenta(e.target.value)} /></th>
                                <th scope='col'> <input type="date" value={filterFechaModificacion} placeholder="filtrar" onChange={(e) => setfilterFechaModificacion(e.target.value)} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPerifericos.map((periferico) =>
                            (
                                <tr className="border-bottom my-2" key={periferico.id} scope="row">
                                    <td className="border-bottom">{periferico.id}</td>
                                    <td className="border-bottom">{periferico.nombre}</td>
                                    <td className="border-bottom">{periferico.created_at}</td>
                                    <td className="border-bottom">{periferico.subcuenta}</td>
                                    <td className="border-bottom">{periferico.updated_at}</td>
                                </tr>
                            )
                            )
                            }
                        </tbody>
                    </table>
                </div >
            </>
        )
    }

    return (
        <>
            {isLoading ?
                <Loading />
                :
                <div>
                    {handlePerifericosFiltered()}
                </div>
            }
        </>
    )
}