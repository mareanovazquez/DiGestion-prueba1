import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ItemCount } from "../ItemCountPeriferico/ItemCountPeriferico";

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

    const [perifericoSeleccionado, setPerifericoSeleccionado] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');

    // Función para manejar el cambio en la selección del periférico
    const handlePerifericoChange = (e) => {
        setPerifericoSeleccionado(e.target.value);
        setMarcaSeleccionada('');
        setModeloSeleccionado('');

        // Almacenamiento del periférico en un estado
        setDataPerifericos((prevData) => ({
            ...prevData,
            periferico: e.target.value
        }))

    };

    // Función para manejar el cambio en la selección de la marca
    const handleMarcaChange = (e) => {
        setMarcaSeleccionada(e.target.value);
        setModeloSeleccionado('');

        setDataPerifericos((prevData) => ({
            ...prevData,
            marca: e.target.value
        }))
    };

    // Función para manejar el cambio en la selección del modelo
    const handleModeloChange = (e) => {
        setModeloSeleccionado(e.target.value);

        setDataPerifericos((prevData) => ({
            ...prevData,
            modelo: e.target.value
        }));
    };
    const [garantiaSeleccionada, setGarantiaSeleccionada] = useState('')
    // Función para manejar el cambio en la garantía
    const handleGarantiaChange = (e) => {
        setGarantiaSeleccionada(e.target.value);

        // Actualizar dataPerifericos
        setDataPerifericos((prevData) => ({
            ...prevData,
            garantia: e.target.value
        }));
    };

    //Estado para almacenar y añadir el comentario al remito
    const [comentarioPeriferico, setComentarioPeriferico] = useState('')

    // Función para manejar el cambio en los comentarios
    const handleComentarioChange = (e) => {
        setComentarioPeriferico(e.target.value);

        // Actualizar dataPerifericos
        setDataPerifericos((prevData) => ({
            ...prevData,
            comentarios: e.target.value
        }));
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
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0)
    const AddCantPeriferico = () => {

        if (counter >= 0) {
            setCantidadSeleccionada(counter)
        }
    }


    // Estado para almanecenar todos los datos del remito:
    const [dataPerifericos, setDataPerifericos] = useState({

        periferico: '',
        marca: '',
        modelo: '',
        garantia: '',
        cantidad: '',
        comentarios: ''
    })

    console.log(dataPerifericos)



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

                        {marcaSeleccionada && (
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
                                <label>Garatía</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Garantía"
                                    aria-label="Departamento"
                                    value={garantiaSeleccionada}
                                    onChange={handleGarantiaChange}

                                />
                            </div>
                            <br></br>

                            <button onClick={sumarCount}>Añadir</button>
                            <button className="btn btn-primary">{counter}</button>
                            <button onClick={restarCount}>Quitar</button>
                            <button onClick={AddCantPeriferico}>Agregar al remito</button>

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
                        </>



                        {modeloSeleccionado && (
                            <div>
                                <hr></hr>
                                <h6 className="card-subtitle text-muted">PERIFÉRICOS</h6>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Periférico</th>
                                            <th scope="col">Marca</th>
                                            <th scope="col">Modelo</th>
                                            <th scope="col">Garantía</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Disponible</th>
                                            <th scope="col">Comentarios</th>
                                            <th scope="col">Eliminar</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{perifericoSeleccionado}</th>
                                            <td>{marcaSeleccionada}</td>
                                            <td>{modeloSeleccionado}</td>
                                            <td>{garantiaSeleccionada}</td>
                                            <td>{cantidadSeleccionada}</td>
                                            <td>8</td>
                                            <td>{comentarioPeriferico}</td>
                                            <td> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg></td>

                                        </tr>

                                    </tbody>
                                </table>
                                <p>Total de periféricos seleccionados :</p>
                                <button className="btn btn primary">Enviar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}