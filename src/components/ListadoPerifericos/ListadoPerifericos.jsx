import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";
import { useNavigate } from "react-router-dom";
import { SelectPerifericos } from "../Select/SelectPerifericos";
import { SelectMarcas } from "../Select/SelectMarcas";
import { SelectModelos } from "../Select/SelectModelos";


export const ListadoPerifericos = ({ encabezadoRemito, handleClose, deleteCamposRemito }) => {


    //recuperar token para validar el HTTP request
    const { token } = useContext(UserContext)

    // Estado para manejar los ID de periférico, marca y modelo
    const [perifId, setPerifId] = useState('');
    const [marcaId, setMarcaId] = useState('');
    const [modeloId, setModeloId] = useState('')

    // Estado para manejar los label de los select2 de periférico, marca y modelo
    const [selectedValuePerif, setSelectedValuePerif] = useState({ label: 'Periférico', value: '' });
    const [selectedValueMarca, setSelectedValueMarca] = useState({ label: 'Marca', value: '' });
    const [selectedValueMod, setSelectedValueMod] = useState({ label: 'Modelo', value: '' });
    const navigate = useNavigate();


    /* useState que crea el almacenamiento de los datos del remito */
    /* Los datos del encabeza del remito se cargan en el momento en que se inicializa el useState porque ya vienen dados por props*/
    const [dataRemito, setDataRemito] = useState({

        "remito": {
/*             "departamento_id": encabezadoRemito.departamento.departamento_id,
            "proveedor_id": encabezadoRemito.proveedor.proveedor_id, */
            "fecha_recepcion": encabezadoRemito.fechaRecepcionSTI,
            "remito": encabezadoRemito.remito,
            "expediente": encabezadoRemito.expediente,
            "comentarios": encabezadoRemito.comentarios,
            "fecha_recepcion_dti": encabezadoRemito.fechaRecepcionDTI,
            "orden_compra": encabezadoRemito.ordenCompra,
            "legajo_compra": encabezadoRemito.legajoCompra,
            "orden_provision": encabezadoRemito.ordenProvision,
            "orden_entrega": encabezadoRemito.ordenEntrega,
        },
        "perifericos": [],
    }
    )

    // Request para traer el listado de periféricos
    const http = new HttpService();

    //Estados para mostrar Periférico, Marca y Modelo como string vacío
    const [perifericoSeleccionado, setPerifericoSeleccionado] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');

    // Función para manejar el cambio en la selección del periférico
    const handlePerifericoChange = (selectedPeriferico) => {
        setPerifericoSeleccionado(selectedPeriferico.value);
        setPerifId(selectedPeriferico.perifId)
    };

    useEffect(() => {
        if (perifId) {
            setPerifId(perifId)
            setPerifericoSeleccionado(perifericoSeleccionado)
        }
    }, [perifId]);

    // Función para manejar el cambio en la selección de la marca
    const handleMarcaChange = (selectedMarca) => {
        setMarcaSeleccionada(selectedMarca.value);
        setMarcaId(selectedMarca.marcaId)
    };

    // Función para manejar el cambio en la selección del modelo
    const handleModeloChange = (selectedModelo) => {
        setModeloSeleccionado(selectedModelo.value);
        setModeloId(selectedModelo.modeloId);
    }
    // useEffect para actualizar el valor de modeloId cada vez que cambia
    useEffect(() => {
        if (modeloId) {
            setModeloId(modeloId)
        }
    }, [modeloId])

    // función onClick para enviar el remito
    const HandleSendRemito = () => {

        // Crea una copia de dataRemito sin el id en cada periferico
        const dataToSend = {
            ...dataRemito,
            perifericos: dataRemito.perifericos.map(periferico => {
                const { id, ...rest } = periferico;
                return rest;
            })
        };

        const dataBody = JSON.stringify(dataToSend)

        http.postData2('/remitos-create', dataBody, token)
            .then(response => {
                const respuesta = response.data
                console.log(respuesta)
                /*Función que cierra el Modal de periféricos después de enviar el POST */
                handleClose()
                /*Función que borra los campos del remito anterior */
                deleteCamposRemito()
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Estado para almancenar la garantía seleccionada
    const [garantiaSeleccionada, setGarantiaSeleccionada] = useState('')
    // Función para manejar el cambio en la garantía
    const handleGarantiaChange = (e) => {
        setGarantiaSeleccionada(e.target.value);
    };

    //Estado para almacenar la cantidad seleccionada
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState('1');
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
    const [itemsPerifericos, setItemsPerifericos] = useState([])
    const [id, setId] = useState(1)

    //Función para añadir el valor del contador a la planilla del remito
    const AgregarPerifericos = () => {
        /*Renderiza la tabla de perifericos*/
        setShowTable(true)
        /* crea un nuevo ID para cada fila */
        const nuevoId = id + 1
        setId(nuevoId)

        /*Carga un nuevo periferico sin borrar el anterior*/
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

        /* Añade cada uno de los perifericos al objeto dataRemito que se va a enviar a través del POST */
        const addPerifericoRemito = {
            ...dataRemito,  // Copia superficial del objeto dataRemito
            perifericos: [  // Actualizamos la propiedad perifericos con un nuevo array
                ...dataRemito.perifericos, // Copiamos los elementos actuales de perifericos
                {  // Agregamos el nuevo periferico al final
                    id: id,
                    modelo_id: modeloId,
                    garantia: garantiaSeleccionada,
                    cantidad: cantidadSeleccionada,
                    comentarios: comentarioPeriferico,
                }
            ]
        };
        setDataRemito(addPerifericoRemito)

        /*Vacía los inputs para que se pueda seleccionar un periferico nuevo */
        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCantidadSeleccionada('1')

        setSelectedValuePerif({ label: 'Periférico', value: '' });
        setSelectedValueMarca({ label: 'Marca', value: '' });
        setSelectedValueMod({ label: 'Modelo', value: '' });

    }

    //Función para eliminar un solo item de la lista de perifericos 
    const DeleteItem = (id) => {
        // 1. Resetear los valores de los inputs.
        setPerifericoSeleccionado('');
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
        setGarantiaSeleccionada('');
        setComentarioPeriferico('');
        setCantidadSeleccionada('1');

        // 2. Eliminar el periférico de itemsPerifericos.
        setItemsPerifericos(itemsPerifericos.filter(item => item.id !== id))

        // 3. Eliminar el periférico de dataRemito.
        const updatedDataRemito = {
            ...dataRemito,
            perifericos: dataRemito.perifericos.filter(periferico => periferico.id !== id)
        };
        setDataRemito(updatedDataRemito);
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
        setShowTable(false);

        /* Función para eliminar todos los perifericos cargados */
        const updatedDataRemito = {
            ...dataRemito,
            perifericos: []  // Borra todos los periféricos
        };
        setDataRemito(updatedDataRemito);
        setSelectedValuePerif({ label: 'Periférico', value: '' });
        setSelectedValueMarca({ label: 'Marca', value: '' });
        setSelectedValueMod({ label: 'Modelo', value: '' });
    }

    //Función para mostrar la cantidad total de periféricos cargados
    let totalCantidad = 0;

    for (let i = 0; i < itemsPerifericos.length; i++) {
        totalCantidad += parseInt(itemsPerifericos[i].cantidad);
    }

    const [isFormPerifValid, setIsFormPerifValid] = useState(false);

    const verificarValidezFormulario = () => {
        if (
            perifericoSeleccionado &&
            marcaSeleccionada &&
            modeloSeleccionado &&
            garantiaSeleccionada &&
            cantidadSeleccionada &&
            comentarioPeriferico

        ) {
            setIsFormPerifValid(true);
        } else {
            setIsFormPerifValid(false);
        }
    };

    useEffect(() => {
        verificarValidezFormulario();
    }, [
        perifericoSeleccionado,
        marcaSeleccionada,
        modeloSeleccionado,
        garantiaSeleccionada,
        cantidadSeleccionada,
        comentarioPeriferico
    ]);

    return (
        <>
            <div >
                <div className="row justify-content-start ">
                    <h3>Seleccione los periféricos</h3>
                    <div className="col-4">
                        <label htmlFor='perifericos' >Periféricos</label>
                        <SelectPerifericos
                            onChange={handlePerifericoChange}
                            selectedValuePerif={selectedValuePerif}
                            setSelectedValuePerif={setSelectedValuePerif} />
                    </div>

                    <div className="col-4">
                        <label htmlFor='perifericos' >Marcas</label>
                        <SelectMarcas
                            onChange={handleMarcaChange}
                            perifId={perifId}
                            selectedValueMarca={selectedValueMarca}
                            setSelectedValueMarca={setSelectedValueMarca} />
                    </div>

                    <div className="col-4">
                        <label htmlFor='perifericos' >Modeloss</label>
                        <SelectModelos
                            onChange={handleModeloChange}
                            perifId={perifId}
                            marcaId={marcaId}
                            selectedValueMod={selectedValueMod}
                            setSelectedValueMod={setSelectedValueMod} />
                    </div>

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
                                onClick={AgregarPerifericos}
                                type="button"
                                className={`btn ${isFormPerifValid ? 'btn btn-primary' : 'btn btn-secondary'}`}
                                disabled={!isFormPerifValid}>
                                Agregar
                            </button>
                        </div>
                        {showTable &&
                            (
                                <div>
                                    <hr></hr>
                                    <h6 className="card-subtitle text-muted pb-2">PERIFÉRICOS</h6>
                                    <table className="table table-primary table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-left bg-secondary text-white" scope="col">Periférico</th>
                                                <th className="text-left bg-secondary text-white" scope="col">Marca</th>
                                                <th className="text-left bg-secondary text-white" scope="col">Modelo</th>
                                                <th className="text-left bg-secondary text-white" scope="col">Garantía</th>
                                                <th className="text-left bg-secondary text-white" scope="col">Cantidad</th>
                                                <th className="text-left bg-secondary text-white" scope="col" >Comentarios</th>
                                                <th className="text-left bg-secondary text-white" scope="col">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsPerifericos.length > 0 &&
                                                itemsPerifericos.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="text-left">{item.periferico}</td>
                                                        <td className="text-left">{item.marca}</td>
                                                        <td className="text-left">{item.modelo}</td>
                                                        <td className="text-left">{item.garantia} meses</td>
                                                        <td className="text-left">{item.cantidad}</td>
                                                        <td className="text-left">{item.comentarios}</td>
                                                        <td className="text-left">
                                                            <button className="btn" onClick={() => DeleteItem(item.id)} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    <div>
                                        <p>Total de periféricos cargados: <b>{totalCantidad}</b></p>
                                        <div className="d-inline"><Button variant="primary" onClick={HandleSendRemito} >Enviar</Button></div>
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