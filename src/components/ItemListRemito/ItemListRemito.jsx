import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import descargaRemito from '../../assets/download.svg'
import agregar from '../../assets/agregar.svg'
import { NavBar } from "../NavBar/NavBar";

export const ItemListRemito = () => {
    const [remitos, setRemitos] = useState([]);
    const [filterDepartamento, setFilterDepartamento] = useState('');
    const [filterFechaRecepcion, setFilterFechaRecepcion] = useState('');
    const [filterRemito, setFilterRemito] = useState('');
    const [filterFechaRecepcionDTI, setFilterFechaRecepcionDTI] = useState('');


    const FetchRemitos = async () => {
        const response = await fetch('http://10.10.49.124/api/remitos');
        const results = await response.json()
        const remitos = results.data

        setRemitos(remitos)

    }


    useEffect(() => {
        FetchRemitos();
    }, [])

    const handleRemitosFiltered = () => {

        const filteredRemitos = remitos.filter((remito) =>
            remito.departamento_id.toString().toLowerCase().includes(filterDepartamento.toLowerCase())
            && remito.fecha_recepcion.includes(filterFechaRecepcion)
            && remito.remito.toLowerCase().includes(filterRemito.toLowerCase())
            && remito.fecha_recepcion_dti.includes(filterFechaRecepcionDTI))

        return (
            <div className="contenedorRemitos">
                <hr></hr>
                <h2 className="text-center"> Lista de Remitos</h2>


{/* Los filtros de fecha no funcionan porque en la API los filtros están definidos como String y el 
input que los llama es type=date, Si ya está definido que van a tener ese formato, después los paso a string para 
para que ese filtro también funcione */}

                <br></br>
                
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
                        <tr>
                            <th className="text-center" scope='col'></th>
                            <th scope='col'> <input type='text' value={filterDepartamento} placeholder="Filtrar" onChange={(e) => setFilterDepartamento(e.target.value)} /></th>
                            <th scope='col'> <input type="date" value={filterFechaRecepcion} placeholder="filtrar" onChange={(e) => setFilterFechaRecepcion(e.target.value)} /></th>
                            <th scope='col'> <input type='text' value={filterRemito} placeholder="Filtrar" onChange={(e) => setFilterRemito(e.target.value)} /></th>
                            <th scope='col'> <input type="date" value={filterFechaRecepcionDTI} placeholder="filtrar" onChange={(e) => setFilterFechaRecepcionDTI(e.target.value)} /></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRemitos.map((remito) =>
                        (
                            <tr className="border-bottom my-2" key={remito.id} scope="row">
                                <td className="border-bottom">{remito.id}</td>
                                <td className="border-bottom">{remito.departamento_id}</td>
                                <td className="border-bottom">{remito.fecha_recepcion}</td>
                                <td className="border-bottom">{remito.remito}</td>
                                <td className="border-bottom">{remito.fecha_recepcion_dti}</td>
                                <td className="border-bottom"><Link to={`/remito/${remito.id}`}><img src={descargaRemito} alt="" /></Link></td>
                            </tr>

                        )

                        )

                        }


                    </tbody>
                </table>

            </div >
        )
    }

    return( 
        <>
        
        <div>
            {handleRemitosFiltered()}
            
        </div>
        <div>
            
        <Link /* onClick={handleAddRemito} */ to='/remito/addRemito' className='card-link addRemito'><img src={agregar} alt="agregar remito" /></Link>
        </div>
        </>
        )

}