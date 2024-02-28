import { useEffect, useRef } from "react";
import HttpService from "../../services/HttpService";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";


export const ListProveedores = () => {

    const [proveedores, setProveedores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterProveedor, setFilterProveedor] = useState('')
    const { token } = useContext(UserContext)
    const inputRef = useRef()

    const http = new HttpService();


    useEffect(() => {
        http.getData('/proveedores', token)
            .then(response => {
                const proveedores = response.data.data
                setProveedores(proveedores);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    /*     const inputRef = useRef()
        useEffect(()=> {
            if (inputRef.current) {
                
            }
            inputRef.current.focus();
        },[]) */

    const BuscarProveedor = () => {
        setFilterProveedor(inputRef.current.value);
        setGuiaPaginate(false)
    }

    const BorrarBusquedas = () => {
        setFilterProveedor('');
        setGuiaPaginate(true)
    }

    /* Filtro para listar cantidad de proveedores mostrados  */
    const [itemsPorPagina, setItemsPorPagina] = useState(15)

    const handleChangeItems = (event) => {
        const nuevoValorItems = parseInt(event.target.value);
        setItemsPorPagina(nuevoValorItems);
    };

    /* Estado para mostrar la cantidad de resultados mostrados */
    const [guiaPaginate, setGuiaPaginate] = useState(true)


    //Prueba PAGINATE
    const Items = ({ proveedores }) => {

        return (
            <>
                <div>
                    <h2 className="h2 text-center p-2">Lista de proveedores</h2>
                    <div className="selectVistaProveedores">
                        <div className="formSelectVistaProveedores">
                            <div className="form-group">
                                <label htmlFor="itemsPorPagina" className="text-center">Listar proveedores</label>
                                <select
                                    id="itemsPorPagina"
                                    className="form-control"
                                    value={itemsPorPagina}
                                    onChange={handleChangeItems}
                                >
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table className="table tablaRemitos">
                        <thead>
                            <tr>
                                <th colSpan="7"><input className="form-control" type="text" defaultValue={filterProveedor} placeholder="Escribí al menos 5 caracteres para iniciar la búsqueda y después hacé clic en la lupa." ref={inputRef} /></th>
                                <th colSpan="1"> <button className="btn btn-primary" onClick={BuscarProveedor}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button></th>
                                <th colSpan="1"> <button className="btn btn-secondary" onClick={BorrarBusquedas}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg></button></th>
                            </tr>
                            <tr className="border-bottom">
                                <th className="text-center col-2" scope='col'> ID</th>
                                <th className="text-left col-8" scope='col '> Nombre</th>
                                <th scope="col" className="text-center col-2">Datos proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                proveedores.map((proveedor) => (
                                    <tr className="border-bottom my-2" key={proveedor.id} scope="row">
                                        <td className="border-bottom text-center">{proveedor.id}</td>
                                        <td className="border-bottom text-left">{proveedor.nombre}</td>
                                        <td className="border-bottom text-center pr-4">
                                            <Link to={`/proveedor/${proveedor.id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-building-add text-black" viewBox="0 0 16 16">
                                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z" />
                                                    <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }



    function PaginatedItems({ itemsPorPagina }) {
        const [itemOffset, setItemOffset] = useState(0);
        const [pageSelect, setPageSelect] = useState(1)
        const endOffset = itemOffset + itemsPorPagina;
        const filteredProveedores = filterProveedor ? proveedores.filter(proveedor => proveedor.nombre.toLowerCase().includes(filterProveedor.toLowerCase())) : proveedores;
        const items = filteredProveedores.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(proveedores.length / itemsPorPagina);
       
        const handlePageClick = (event) => {
            setItemOffset(0)
            const newOffset = (event.selected * itemsPorPagina) % proveedores.length;
            const pageSelected = event.selected + 1;
            setItemOffset(newOffset);
            setPageSelect(pageSelected);
        }

        const handlePageClickFilter = (event)=> {
            setItemOffset(0)
            const newOffset = (event.select * itemsPorPagina) % filteredProveedores;
            const pageSelected = event.selected + 1;
            setItemOffset(newOffset);
            setPageSelect(pageSelected);
        }

        return (
            <>
                {isLoading ?
                    <Loading />
                    :
                    <div>
                        <Items proveedores={items} />
                        {guiaPaginate ?
                            <ReactPaginate
                                className="react-paginate"
                                breakLabel="..."
                                nextLabel=" Siguiente>"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<Anterior"
                                renderOnZeroPageCount={null}
                            /> :
                           <></>
                        }
                        <>
                            {guiaPaginate ?
                                <div className="text-center p-2">
                                    <p> {`Página ${pageSelect} | ${endOffset} de ${proveedores.length} proveedores`} </p>
                                </div>
                                : <div className="text-center p-2">
                                    <p>Mostrando resultados para {filterProveedor}</p>
                                </div>} </>
                    </div>

                }
            </>
        )
    }

    return (
        <>
            {
                <PaginatedItems itemsPorPagina={itemsPorPagina} />
            }
        </>
    )
}