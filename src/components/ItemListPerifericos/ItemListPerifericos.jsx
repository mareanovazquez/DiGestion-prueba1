import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext/UserContext"
import { Link } from "react-router-dom"
import { Loading } from "../Loading/Loading";


import agregar from '../../assets/agregar.svg'

export const ItemListPerifericos = () => {

    const { permisos, departamento } = useContext(UserContext)

    const [perifericos, setPerifericos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterNombre, setFilterNombre] = useState('')
    const [filterFechaCreacion, setFilterFechaCreacion] = useState('')
    const [filterFechaModificacion, setfilterFechaModificacion] = useState('')
    const [filterSubcuenta, setFilterSubcuenta] = useState('')



    const FetchPerifericos = async () => {
        const response = await fetch('http://10.10.49.124/api/perifericos');
        const results = await response.json()
        const perifericos = results.data



        setPerifericos(perifericos)
        setIsLoading(false)

    }

    useEffect(() => {
        FetchPerifericos()



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