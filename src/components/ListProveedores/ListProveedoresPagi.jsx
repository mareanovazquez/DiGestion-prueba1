import { useEffect } from "react";
import HttpService from "../../services/HttpService";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";
export const ListProveedoresPagi = () => {

    const [proveedores, setProveedores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterProveedor, setFilterProveedor] = useState()
    const { token } = useContext(UserContext)
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


    /* const filteredProveedores = proveedores.length > 0 ? proveedores.filter((proveedor) =>
    proveedor.nombre.toString().toLowerCase().includes(filterProveedor.toLowerCase())) : [];
 */


    //Prueba PAGINATE
    const Items = ({ proveedores }) => {
        return (
            <>
                <div>
                    <table className="table tablaRemitos">
                        <thead>
                            <tr>
                                <th className="text-center" scope='col'> ID</th>
                                <th scope='col'> Nombre</th>
                                <th scope='col'> Estado</th>
                                <th scope='col'> Creado por</th>
                                <th scope='col'> Actualización</th>
                                <th scope='col'> Fecha creación</th>
                                <th scope="col">Datos proveedor</th>
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"><input type="text" value={filterProveedor} placeholder="buscar" onChange={(e) => setFilterProveedor(e.target.value)} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores &&
                                proveedores.map((proveedor) => (
                                    <tr className="border-bottom my-2" key={proveedor.id} scope="row">
                                        <td className="border-bottom">{proveedor.id}</td>
                                        <td className="border-bottom">{proveedor.nombre}</td>
                                        <td className="border-bottom">{proveedor.estado}</td>
                                        <td className="border-bottom">{proveedor.created_by}</td>
                                        <td className="border-bottom">{proveedor.updated_by}</td>
                                        <td className="border-bottom">{proveedor.created_at}</td>
                                        <td className="border-bottom text-center">
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

    function PaginatedItems({ itemsPerPage }) {

        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const items =  proveedores.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(proveedores.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % proveedores.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        }

        return (
            <>
                {isLoading ?
                    <Loading />
                    :
                    <div>
                        <Items proveedores={items} />
                        <ReactPaginate
                            className="react-paginate"
                            breakLabel="..."
                            nextLabel=" Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< Prev "
                            renderOnZeroPageCount={null}
                        />
                    </div>
                }
                               
            </>
        )

    }

    return (
        <>
            <PaginatedItems itemsPerPage={15} />
        </>
    )
}