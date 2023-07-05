import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";


export const ListadoPerifericos = () => {


    //recuperar token para validar el HTTP request
    const { token } = useContext(UserContext)

    // Request para traer el listado de periféricos
    const http = new HttpService();
    const [perifericos, setPerifericos] = useState([]);
    const [perifId, setPerifId] = useState('');

    useEffect(() => {
        http.getData('/perifericos', token)
            .then(response => {
                const ListPerifericos = response.data.data
                setPerifericos(ListPerifericos)
                

            })
    }, [])

    const [marcas, setMarcas] = useState([]);



    //Estados para mostrar Periférico, Marca y Modelo como string vacío
    const [perifericoSeleccionado, setPerifericoSeleccionado] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');

    // Función para manejar el cambio en la selección del periférico
    const handlePerifericoChange = (e) => {
        setPerifericoSeleccionado(e.target.value);
        setPerifId(e.target.options[e.target.selectedIndex].getAttribute('data-key'))
        console.log (perifId)
        
        http.getData(`/remitos/get-marcas/${perifId}`, token)
        .then(response => {
            const ListMarcas = response.data;
            setMarcas(ListMarcas);
            console.log(marcas)
        })
        .catch(error => {
            console.log(error)
        });
    };

    


    // Función para manejar el cambio en la selección de la marca
    const handleMarcaChange = (e) => {
        setMarcaSeleccionada(e.target.value);

    };

    // Función para manejar el cambio en la selección del modelo
    const handleModeloChange = (e) => {
        setModeloSeleccionado(e.target.value);
    };

    //Estado para almancenar la garantía seleccionada
    const [garantiaSeleccionada, setGarantiaSeleccionada] = useState('')
    // Función para manejar el cambio en la garantía
    const handleGarantiaChange = (e) => {
        setGarantiaSeleccionada(e.target.value);
    };

    //Estado para almacenar la cantidad seleccionada
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState('');
    // Función para manejar el cambio en la cantidad seleccionada
    const handleCantidad = (e) => {
        setCantidadSeleccionada(e.target.value)
    }

    //Estado para almacenar y añadir el comentario al remito
    const [comentarioPeriferico, setComentarioPeriferico] = useState('')

    // Función para manejar el cambio en los comentarios
    const handleComentarioChange = (e) => {
        setComentarioPeriferico(e.target.value);
    };

    //Estado para mostrar la tabla renderizando la lista de periféricos
    const [showTable, setShowTable] = useState(false)

    //Función para añadir el valor del contador a la planilla del remito
    const DesplegarListPerifericos = () => {
        setShowTable(true)
    }

    const [itemsPerifericos, setItemsPerifericos] = useState([])
    const [id, setId] = useState(1)

    // Función para añadir items a la lista de periféricos
    const AñadirItem = () => {
        const nuevoId = id + 1
        setId(nuevoId)

        setItemsPerifericos((itemsPerifericos) => [
            ...itemsPerifericos,
            {
                id: id,
                periferico: perifericoSeleccionado,
                marca: marcaSeleccionada,
                modelo: modeloSeleccionado,
                garantia: garantiaSeleccionada,
                cantidad: cantidadSeleccionada,
                comentarios: comentarioPeriferico
            }
        ]);


        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCantidadSeleccionada('')
    }

    console.log(itemsPerifericos)

    //Función para eliminar un solo item de la lista de perifericos 
    const DeleteItem = (id) => {
        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCantidadSeleccionada('');


        setItemsPerifericos(itemsPerifericos.filter(item => item.id !== id))
        console.log(itemsPerifericos)

    }

    // Función para eliminar todos los items de la lista de periféricos
    const EliminarTodo = () => {

        setItemsPerifericos([])
        setId(1)
        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCantidadSeleccionada('');

        setShowTable(false)
    }


    //Función para mostrar la cantidad total de periféricos cargados
    let totalCantidad = 0;

    for (let i = 0; i < itemsPerifericos.length; i++) {
        totalCantidad += parseInt(itemsPerifericos[i].cantidad);
    }


    return (

        <>
            <div >
                <div className="row justify-content-start ">
                    <h3>Seleccione los periféricos</h3>
                    <div className="col-4">
                        <label > Periférico</label>
                        <br></br>
                        <Form.Select
                            value={perifericoSeleccionado}
                            onChange={handlePerifericoChange}>
                            <option value="">Periférico</option>
                            {perifericos.map((periferico) => (
                                <option key={periferico.id} value={periferico.nombre} data-key={periferico.id}>
                                    {periferico.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    {perifericoSeleccionado && (
                        <div className="col-4">
                            <label>Marca</label>
                            <br></br>
                            <Form.Select
                                value={marcaSeleccionada}
                                onChange={handleMarcaChange}>
                                <option value="">Marca</option>
                                {perifericos.find((periferico) => periferico.nombre === perifericoSeleccionado) && 
                                Array.isArray(marcas)&& marcas.map((marca) => (
                                        <option key={marca.id} value={marca.nombre}>
                                            {marca.nombre}
                                        </option>
                                    ))}
                            </Form.Select>
                        </div>
                    )}

                    {marcaSeleccionada && (
                        <div className="col-4">
                            <label>Modelo</label>
                            <br></br>
                            <Form.Select
                                value={modeloSeleccionado}
                                onChange={handleModeloChange}>
                                <option value="">Modelo</option>
                                {perifericos
                                    .find((periferico) => periferico.nombre === perifericoSeleccionado)
                                    .marcas.find((marca) => marca.nombre === marcaSeleccionada)
                                    .modelo.map((modelo) => (
                                        <option key={modelo.id} value={modelo.nombre}>
                                            {modelo.nombre}
                                        </option>
                                    ))}
                            </Form.Select>
                        </div>
                    )}
                </div>

                <div>
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <label>Garantía</label>
                            <input
                                placeholder="Garantía en meses"
                                className="form-control"
                                value={garantiaSeleccionada}
                                type="number"
                                onChange={handleGarantiaChange}

                            />
                        </div>

                        <div className="col-2">
                            <label>Cantidad</label>
                            <input
                                placeholder="Unidades seleccionadas"
                                type="number"
                                className="form-control"
                                value={cantidadSeleccionada}
                                onChange={handleCantidad}
                            />
                        </div>
                        <div className="col-8">
                            <label htmlFor="comentarios">COMENTARIOS</label>
                            <textarea id="comentarios"
                                className="form-control"
                                placeholder="El comentario no debe superar los 50 caracteres"
                                name="comentarios"
                                rows="1"
                                cols="50"
                                maxLength='50'
                                value={comentarioPeriferico}
                                onChange={handleComentarioChange}
                            ></textarea>
                        </div>

                        <br></br>
                        <div className="row altaRemito">

                        </div>
                        <div>
                            <button
                                onClick={DesplegarListPerifericos}
                                type="button"
                                className="btn btn-secondary">
                                Agregar
                            </button>
                        </div>

                        {showTable &&

                            (
                                <div>
                                    <hr></hr>
                                    <h6 className="card-subtitle text-muted">PERIFÉRICOS</h6>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">ID</th> {/* Eliminar */}
                                                <th className="text-center" scope="col">Periférico</th>
                                                <th className="text-center" scope="col">Marca</th>
                                                <th className="text-center" scope="col">Modelo</th>
                                                <th className="text-center" scope="col">Garantía</th>
                                                <th className="text-center" scope="col">Cantidad</th>
                                                <th scope="col">Comentarios</th>
                                                <th className="text-center" scope="col">Añadir</th>
                                                <th className="text-center" scope="col">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {itemsPerifericos.length > 0 &&


                                                itemsPerifericos.map((item) => (
                                                    <tr key={item.id}>
                                                        <th className="text-center" scope="row">{item.id}</th> {/* Eliminar */}
                                                        <th className="text-center">{item.periferico}</th>
                                                        <td className="text-center">{item.marca}</td>
                                                        <td className="text-center">{item.modelo}</td>
                                                        <td className="text-center">{item.garantia} meses</td>
                                                        <td className="text-center">{item.cantidad}</td>
                                                        <td className="text-center">{item.comentarios}</td>
                                                        <td className="text-center">
                                                            <button className="btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                                                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                        <td className="text-center">
                                                            <button className="btn" onClick={() => DeleteItem(item.id)} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            <tr className="table-info" >
                                                <th className="text-center" scope="row">{id}</th> {/* Eliminar */}
                                                <th className="text-center" >{perifericoSeleccionado}</th>
                                                <td className="text-center" >{marcaSeleccionada}</td>
                                                <td className="text-center" >{modeloSeleccionado}</td>
                                                <td className="text-center" >{garantiaSeleccionada}</td>
                                                <td className="text-center" >{cantidadSeleccionada}</td>
                                                <td className="text-center" >{comentarioPeriferico}</td>
                                                <td className="text-center"> <button className="btn" onClick={AñadirItem}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                                </svg></button></td>
                                                <td className="text-center"> <button className="btn" onClick={() => DeleteItem(id)} > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg></button></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div>
                                        <p>Total de periféricos cargados: <b>{totalCantidad}</b></p>
                                        <div className="d-inline"><Button variant="primary" >Enviar</Button></div>
                                        <div className="d-inline ps-3"><Button variant="secondary" onClick={EliminarTodo}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                        </Button></div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div >
            </div >
        </>
    )
}