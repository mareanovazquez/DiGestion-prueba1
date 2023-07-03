import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CSV from '../../assets/CSV.svg'
import PDF from '../../assets/PDF.svg'
import imprimir from '../../assets/print.svg'
import verRemito from '../../assets/ver.svg'
import { Agregar } from "../Iconos/Agregar";
import { Ver } from "../Iconos/Ver";
import HttpService from "../../services/HttpService";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";


export const ItemListRemito = () => {
    const [remitos, setRemitos] = useState([]);
    const [filterDepartamento, setFilterDepartamento] = useState('');
    const [filterFechaRecepcion, setFilterFechaRecepcion] = useState('');
    const [filterRemito, setFilterRemito] = useState('');
    const [filterFechaRecepcionDTI, setFilterFechaRecepcionDTI] = useState('');

    const { error, setError, token, setToken } = useContext(UserContext)

    //Si pongo el valor token que traigo desde el context puedo validar el GET hecho con el Fetch
    /* const FetchRemitos = async () => {
       const response = await fetch('http://10.10.49.124/api/remitos', {
          headers: {
              'Authorization' : 'Bearer ' + token, 
          }
          })
       const results = await response.json()
       const remitos = results.data
 
       setRemitos(remitos)
 
   } 

   useEffect(() => {
      FetchRemitos();
  }, [])  */


    const http = new HttpService();

    useEffect(() => {
        http.getData('/remitos', token)
            .then(response => {
                if (response.data.data) {
                    setRemitos(response.data.data)

                }
            })
            .catch(error => {
                setError(error.statusText)

            })
            .finally()

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
                            <th scope="col" className="text-center">Ver remito</th>
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
                                <td className="border-bottom"><Link to={`/remito/${remito.id}`}><Ver /></Link> </td>
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

            <div>
                {handleRemitosFiltered()}

            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end addRemito">
                <Link /* onClick={handleAddRemito} */ to='/remito/addRemito' >
                    <button className="btn btn-primary" type="button">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>
                </Link>
                </div>
            
        </>
    )

}