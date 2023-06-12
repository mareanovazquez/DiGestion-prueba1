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
        <NavBarR/>
            <Filter>
                {handleProductFiltered}
            </Filter>
        </>
    )
}