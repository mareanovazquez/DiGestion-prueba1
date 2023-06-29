import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";


export const ListadoPerifericos = () => {

    const perifericos = [
        {
            id: 1,
            nombre: 'Impresora',
            marca: [
                {
                    id: 1,
                    nombre: 'HP',
                    modelo: [
                        {
                            id: 1,
                            nombre: 'HP DeskJet 2130'
                        },
                        {
                            id: 2,
                            nombre: 'HP LaserJet Pro M15w'
                        },
                    ]
                },
                {
                    id: 2,
                    nombre: 'Samsung',
                    modelo: [
                        { id: 1, nombre: 'Samsung XYZ Printer' },
                        { id: 2, nombre: 'Samsung ABC Printer' },
                    ]
                }
            ]
        },
        {
            id: 2,
            nombre: 'Monitor',
            marca: [
                {
                    id: 1,
                    nombre: 'HP',
                    modelo: [
                        { id: 1, nombre: 'HP Ultrasharp U2719D' },
                        { id: 2, nombre: 'HP XYZ Monitor' }
                    ]
                },
                {
                    id: 2,
                    nombre: 'Samsung',
                    modelo: [
                        { id: 1, nombre: 'Samsung S34J550WQ' },
                        { id: 2, nombre: 'Samsung S40000WQ' },
                    ]
                },
                {
                    id: 3,
                    nombre: 'Lenovo',
                    modelo: [
                        { id: 1, nombre: 'Lenovo L24q-30' },
                        { id: 2, nombre: 'Lenovo zw543' }

                    ]
                }

            ]
        },
        {
            id: 3,
            nombre: 'Teclado',
            marca: [
                {
                    id: 1,
                    nombre: 'Dell',
                    modelo: [
                        { id: 1, nombre: 'Dell Pro Mechanical Keyboard' },
                        { id: 2, nombre: 'Dell Huntsman Elite' },
                        { id: 3, nombre: 'Dell K70 RGB MK.2' }
                    ]
                },
                {
                    id: 2,
                    nombre: 'Logitech',
                    modelo: [
                        { id: 1, nombre: 'Logigech Super Gaming Teclado 200' },
                        { id: 2, nombre: 'Logitech MX Master 3' },
                        { id: 3, nombre: 'SteelSeries Rival 650 Wireless' },
                        { id: 4, nombre: 'LogitechABC Teclado' },

                    ]
                }
            ]

        },


    ];

    //Estado para mostrar la tabla renderizando la lista de periféricos
    const [showTable, setShowTable] = useState(false)


    const [perifericoSeleccionado, setPerifericoSeleccionado] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');



    // Función para manejar el cambio en la selección del periférico
    const handlePerifericoChange = (e) => {
        setPerifericoSeleccionado(e.target.value);
        setMarcaSeleccionada('');
        setModeloSeleccionado('');



    };

    // Función para manejar el cambio en la selección de la marca
    const handleMarcaChange = (e) => {
        setMarcaSeleccionada(e.target.value);
        setModeloSeleccionado('');


    };

    // Función para manejar el cambio en la selección del modelo
    const handleModeloChange = (e) => {
        setModeloSeleccionado(e.target.value);


    };
    const [garantiaSeleccionada, setGarantiaSeleccionada] = useState('')
    // Función para manejar el cambio en la garantía
    const handleGarantiaChange = (e) => {
        setGarantiaSeleccionada(e.target.value);


    };

    //Estado para almacenar y añadir el comentario al remito
    const [comentarioPeriferico, setComentarioPeriferico] = useState('')

    // Función para manejar el cambio en los comentarios
    const handleComentarioChange = (e) => {
        setComentarioPeriferico(e.target.value);


    };

    // Función para manejar el contador  (AÑADIR & QUITAR)

    const [counter, setCounter] = useState(0)
    const sumarCount = () => {
        if (counter < 5) {
            setCounter(counter + 1)
        }
    }

    const restarCount = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

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
                cantidad: counter,
                comentarios: comentarioPeriferico
            }

        ]);


        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCounter(0)


    }

    console.log(itemsPerifericos)

    //Función para eliminar un solo item de la lista de perifericos 
    const DeleteItem = (id)=> {

        
        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCounter(0)

        setItemsPerifericos(itemsPerifericos.filter ( item => item.id !==id))
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
        setCounter(0)

        setShowTable(false)


    }


    //Función para mostrar la cantidad total de periféricos cargados
    let totalCantidad = 0;

    for (let i = 0; i < itemsPerifericos.length; i++) {
        totalCantidad += itemsPerifericos[i].cantidad;
    }


    return (

        <>
            <div >
                <div className="row ">
                    <h3>Seleccione los periféricos</h3>
                    <div className="col">
                        <label>Periférico</label>
                        <br></br>
                        <Form.Select
                            value={perifericoSeleccionado}
                            onChange={handlePerifericoChange}>
                            <option value="">Periférico</option>
                            {perifericos.map((periferico) => (
                                <option key={periferico.id} value={periferico.nombre}>
                                    {periferico.nombre}
                                </option>
                            ))}
                        </Form.Select>

                        {perifericoSeleccionado && (
                            <div className="col">
                                <label>Marca:</label>
                                <br></br>
                                <Form.Select value={marcaSeleccionada} onChange={handleMarcaChange}>
                                    <option value="">Marca</option>
                                    {perifericos
                                        .find((periferico) => periferico.nombre === perifericoSeleccionado)
                                        .marca.map((marca) => (
                                            <option key={marca.id} value={marca.nombre}>
                                                {marca.nombre}
                                            </option>
                                        ))}
                                </Form.Select>
                            </div>
                        )}

                        {marcaSeleccionada &&


                            (
                                <div className="col">
                                    <label>Modelo:</label>
                                    <br></br>
                                    <Form.Select value={modeloSeleccionado} onChange={handleModeloChange}>
                                        <option value="">Modelo</option>
                                        {perifericos
                                            .find((periferico) => periferico.nombre === perifericoSeleccionado)
                                            .marca.find((marca) => marca.nombre === marcaSeleccionada)
                                            .modelo.map((modelo) => (
                                                <option key={modelo.id} value={modelo.nombre}>
                                                    {modelo.nombre}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </div>
                            )}

                        <>
                            <div className="col">
                                <label>Garantía</label>
                                <Form.Select name="meses"
                                    value={garantiaSeleccionada}
                                    onChange={handleGarantiaChange}>
                                    <option value="" disabled defaultValue>Garantía</option>
                                    <option value="1 mes">1 mes</option>
                                    <option value="2 meses">2 meses</option>
                                    <option value="3 meses">3 meses</option>
                                    <option value="4 meses">4 meses</option>
                                    <option value="5 meses">5 meses</option>
                                    <option value="6 meses">6 meses</option>
                                    <option value="7 meses">7 meses</option>
                                    <option value="8 meses">8 meses</option>
                                    <option value="9 meses">9 meses</option>
                                    <option value="10 meses">10 meses</option>
                                    <option value="11 meses">11 meses</option>
                                    <option value="12 meses">12 meses</option>
                                    <option value="13 meses">13 meses</option>
                                    <option value="14 meses">14 meses</option>
                                    <option value="15 meses">15 meses</option>
                                    <option value="16 meses">16 meses</option>
                                    <option value="17 meses">17 meses</option>
                                    <option value="18 meses">18 meses</option>
                                </Form.Select>

                            </div>
                            <br></br>
                            <div>
                                <button className="btn" onClick={sumarCount}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg></button>
                                <button className="btn btn-primary">{counter}</button>
                                <button className="btn" onClick={restarCount}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                </svg></button>
                            </div>
                            <br></br>
                            <div className="row altaRemito">
                                <div className="col">
                                    <label htmlFor="comentarios">COMENTARIOS</label>
                                    <textarea id="comentarios"
                                        className="form-control"
                                        placeholder="El comentario no debe superar los 50 caracteres"
                                        name="comentarios"
                                        rows="2"
                                        cols="50"
                                        maxLength='50'
                                        value={comentarioPeriferico}
                                        onChange={handleComentarioChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={DesplegarListPerifericos}
                                    type="button"
                                    className="btn btn-secondary">
                                    Agregar
                                </button>
                            </div>
                        </>




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
                                                        <td className="text-center">{item.garantia}</td>
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
                                                            <button className="btn" onClick={()=> DeleteItem(item.id)} >
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
                                                <td className="text-center" >{counter}</td>
                                                
                                                <td className="text-center" >{comentarioPeriferico}</td>
                                                <td className="text-center"> <button className="btn" onClick={AñadirItem}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                                </svg></button></td>
                                                <td className="text-center"> <button className="btn" onClick={()=> DeleteItem(id)} > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg></button></td>

                                            </tr>

                                        </tbody>
                                    </table>
                                    <div>
                                        <p>Total de periféricos cargados: <b>{totalCantidad}</b></p>
                                        <Button variant="primary" >Enviar</Button>
                                        <Button variant="secondary" onClick={EliminarTodo}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg></Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}