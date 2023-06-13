import { useEffect, useState } from "react";
import { Filter } from "../Filter/Filters";
import { Link } from "react-router-dom";
import descargaProveedor from '../../assets/download.svg'
import { NavBarR } from "../NavBar/NavBarR";




export const ListProveedoresR = () => {

    const [proveedores, setProveedores] = useState([]);


    useEffect(() => {
        const FetchProveedores = async () => {
            const response = await fetch('http://10.10.49.124/api/proveedores');
            const result = await response.json();
            const proveedores = result.data

            setProveedores(proveedores);

        }

        FetchProveedores()

    }, []);

    const handleProductFiltered = ({ filterState, handleFilterChange }) => {


        return (
            <>
                <div className="contenedorRemitos">
                    <hr></hr>
                    <h2 className="text-center"> Lista de Proveedores</h2>



                    <br></br>
                    <input type='text' value={filterState} placeholder="Filtrar" onChange={handleFilterChange} />
                    <table className="table tablaRemitos">
                        <thead>
                            <tr>
                                <th className="text-center" scope='col'> ID</th>
                                <th scope='col'> Nombre</th>
                                <th scope='col'> Estado</th>
                                <th scope='col'> Creado por</th>
                                <th scope='col'> Actualización</th>
                                <th scope='col'> Fecha creación</th>
                                <th scope="col">Fecha actualización</th>
                                <th scope="col">Descarga</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterState === ''

                                ? proveedores.map((proveedor) => (


                                    <tr className="border-bottom my-2" key={proveedor.id} scope="row">
                                        <td className="border-bottom">{proveedor.id}</td>
                                        <td className="border-bottom">{proveedor.nombre}</td>
                                        <td className="border-bottom">{proveedor.estado}</td>
                                        <td className="border-bottom">{proveedor.created_by}</td>
                                        <td className="border-bottom">{proveedor.updated_by}</td>
                                        <td className="border-bottom">{proveedor.created_at}</td>
                                        <td className="border-bottom">{proveedor.updated_at}</td>
                                        <td className="border-bottom"><Link to={`/proveedor/${proveedor.id}`}><img src={descargaProveedor} alt="" /></Link></td>
                                    </tr>



                                )

                                )
                                : proveedores.filter(proveedor => proveedor.nombre.toString().toLowerCase().includes(filterState.toLowerCase()) ||
                                    proveedor.estado.toString().toLowerCase().includes(filterState.toLowerCase()))
                                    .map((proveedor) => (


                                        <tr className="border-bottom my-2" key={proveedor.id} scope="row">
                                            <td className="border-bottom">{proveedor.id}</td>
                                            <td className="border-bottom">{proveedor.nombre}</td>
                                            <td className="border-bottom">{proveedor.estado}</td>
                                            <td className="border-bottom">{proveedor.created_by}</td>
                                            <td className="border-bottom">{proveedor.updated_by}</td>
                                            <td className="border-bottom">{proveedor.created_at}</td>
                                            <td className="border-bottom">{proveedor.updated_at}</td>
                                            <td className="border-bottom"><Link to={`/proveedor/${proveedor.id}`}><img src={descargaProveedor} alt="" /></Link></td>
                                        </tr>


                                    )



                                    )}
                        </tbody>
                    </table>

                </div>
            </>
        )
    }



    return (

        <>
            <NavBarR />
            {
                proveedores.length !== 0 ?

                    <Filter>
                        {handleProductFiltered}
                    </Filter>

                    :
                    <div className="loader loader--style1" title="0">
                        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml: space="preserve">
                            <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                            <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 20 20"
                                    to="360 20 20"
                                    dur="1.2s"
                                    repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
            }

        </>
    )
}