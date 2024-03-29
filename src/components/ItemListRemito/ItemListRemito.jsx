import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ver } from "../Iconos/Ver";
import HttpService from "../../services/HttpService";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Loading } from "../Loading/Loading";

export const ItemListRemito = () => {
    const [remitos, setRemitos] = useState([]);
    const [filterDepartamento, setFilterDepartamento] = useState('');
    const [filterProveedor, setFilterProveedor] = useState('');
    const [filterFechaRecepcion, setFilterFechaRecepcion] = useState('');
    const [filterRemito, setFilterRemito] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    const { error, setError, token, setToken } = useContext(UserContext)


    const http = new HttpService();

    useEffect(() => {
        http.getData('/remitos', token)
            .then(response => {
                if (response.data.data) {
                    setRemitos(response.data.data)
                    setIsLoading(false)
                }
            })
            .catch(error => {
                setError(error.statusText)
            })
            .finally()
    }, [])

    const handleRemitosFiltered = () => {
        const filteredRemitos = remitos.filter((remito) =>
            remito.departamento.toString().toLowerCase().includes(filterDepartamento.toLowerCase())
            && remito.proveedor.toString().toLowerCase().includes(filterProveedor.toLowerCase())
            && remito.fecha_recepcion.includes(filterFechaRecepcion)
            && remito.remito.toLowerCase().includes(filterRemito.toLowerCase())
        )


        return (

            <div className="contenedorRemitos">
                <hr></hr>
                <h2 className="text-center"> Lista de Remitos</h2>
                <br></br>
                <table className="table tablaRemitos">
                    <thead>
                        <tr>
                            <th scope='col'> Remito</th>
                            <th scope='col'> Departamento</th>
                            <th scope='col'> Proveedor</th>
                            <th scope='col'> Fecha recepción</th>
                            <th scope="col" className="text-center">Ver</th>
                        </tr>
                        <tr>
                            <th scope='col'> <input type='text' value={filterRemito} placeholder="Filtrar" onChange={(e) => setFilterRemito(e.target.value)} /></th>
                            <th scope='col'> <input type='text' value={filterDepartamento} placeholder="Filtrar" onChange={(e) => setFilterDepartamento(e.target.value)} /></th>
                            <th scope='col'> <input type='text' value={filterProveedor} placeholder="Filtrar" onChange={(e) => setFilterProveedor(e.target.value)} /></th>
                            <th scope='col'> <input type="date" value={filterFechaRecepcion} placeholder="filtrar" onChange={(e) => setFilterFechaRecepcion(e.target.value)} /></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRemitos.map((remito) =>
                            <tr className="border-bottom my-2" key={remito.id} scope="row">
                                <td className="border-bottom">{remito.remito}</td>
                                <td className="border-bottom">{remito.departamento}</td>
                                <td className="border-bottom">{remito.proveedor}</td>
                                <td className="border-bottom">{remito.fecha_recepcion}</td>
                                <td className="border-bottom text-center"><Link to={`/remito/${remito.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-ruled-fill text-primary" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1H6v2h7v1H6v2H5v-2H3v-1h2v-2H3V9z" />
                                </svg></Link> </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        )
    }

    return (
        <>
            {isLoading ?
                <Loading />
                : <>
                    <div>
                        {handleRemitosFiltered()}
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end addRemito">
                        <Link to='/remito/addRemito' >
                            <button className="btn btn-primary" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </>}
        </>
    )
}
