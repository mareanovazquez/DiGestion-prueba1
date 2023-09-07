import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";
import { useNavigate } from "react-router-dom";
import { SelectPerifericos } from "../Select/SelectPerifericos";
import { SelectMarcas } from "../Select/SelectMarcas";
import { SelectModelos } from "../Select/SelectModelos";
import { useRef } from "react";


export const ListadoPerifericos = ({ encabezadoRemito, handleClose }) => {

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

    //Estado para mostrar la tabla renderizando la lista de periféricos
    const [showTable, setShowTable] = useState(false)

    /* useState que crea el almacenamiento de los datos del remito con los perifericos vacíos */
    /* Los datos del encabeza del remito se cargan en el momento en que se
    inicializa el useState porque ya vienen dados por props*/
    const [dataRemito, setDataRemito] = useState({
        "remito": {
            "departamento_id": encabezadoRemito?.departamento?.departamento_id || "",
            "proveedor_id": encabezadoRemito?.proveedor?.proveedor_id || "",
            "fecha_recepcion": encabezadoRemito?.fechaRecepcionSTI || "",
            "remito": encabezadoRemito?.remito || "",
            "expediente": encabezadoRemito?.expediente || "",
            "comentarios": encabezadoRemito?.comentarios || "",
            "orden_compra": encabezadoRemito?.ordenCompra || "",
            "legajo_compra": encabezadoRemito?.legajoCompra || "",
            "orden_provision": encabezadoRemito?.ordenProvision || "",
            "orden_entrega": encabezadoRemito?.ordenEntrega || "",
        },
        "perifericos": [],
    }
    )
    console.log(dataRemito)


    /* Cuando se cierra el modal y se vacían las props que vienen dadas por dataAddRemito(encabezadoRemito)
    este useEffect está escuchando esos cambios para volver a cargarse cuando se vuelva a cargar
    el encabezado del remito */
    useEffect(() => {
        setDataRemito(prevDataRemito => ({
            ...prevDataRemito,
            "remito": {
                "departamento_id": encabezadoRemito?.departamento?.departamento_id || "",
                "proveedor_id": encabezadoRemito?.proveedor?.proveedor_id || "",
                "fecha_recepcion": encabezadoRemito?.fechaRecepcionSTI || "",
                "remito": encabezadoRemito?.remito || "",
                "expediente": encabezadoRemito?.expediente || "",
                "comentarios": encabezadoRemito?.comentarios || "",
                "orden_compra": encabezadoRemito?.ordenCompra || "",
                "legajo_compra": encabezadoRemito?.legajoCompra || "",
                "orden_provision": encabezadoRemito?.ordenProvision || "",
                "orden_entrega": encabezadoRemito?.ordenEntrega || "",
            },
            "perifericos": [],
        }))
    }, [encabezadoRemito])

    // Servicio para hacer el http request
    const http = new HttpService();

    //Estado para almacenar y mostrar la lista de perifericos seleccionados
    const [itemsPerifericos, setItemsPerifericos] = useState([])

    //Estado para inicializar el ID que permite identificar cada uno de los periféricos en una fila
    const [id, setId] = useState(1)

    //Función para mostrar la cantidad total de periféricos cargados
    let totalCantidad = 0;

    for (let i = 0; i < itemsPerifericos.length; i++) {
        totalCantidad += parseInt(itemsPerifericos[i].cantidad);
    }

    //Función para eliminar un solo item de la lista de perifericos 
    const DeleteItem = (id) => {
        // 1. Eliminar el periférico de itemsPerifericos.
        setItemsPerifericos(itemsPerifericos.filter(item => item.id !== id))

        // 2. Eliminar el periférico de dataRemito.
        const updatedDataRemito = {
            ...dataRemito,
            perifericos: dataRemito.perifericos.filter(periferico => periferico.id !== id)
        };
        //3. Actualiza el valor de dataRemito
        setDataRemito(updatedDataRemito);
    }

    // Función para eliminar todos los items de la lista de periféricos
    const EliminarTodo = () => {
        setItemsPerifericos([])
        setId(1)
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
                navigate('/remitos')
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
            <div>
                <Formik

                    initialValues={{
                        perifericoSeleccionado: '',
                        marcaSeleccionada: '',
                        modeloSeleccionado: '',
                        garantiaSeleccionada: '',
                        cantidadSeleccionada: '',
                        comentarioPeriferico: ''
                    }}

                    validate={(valores) => {
                        let errores = {};

                        if (!valores.perifericoSeleccionado) {
                            errores.perifericoSeleccionado = "Seleccioná un periférico"
                        }
                        if (!valores.marcaSeleccionada) {
                            errores.marcaSeleccionada = "Seleccioná una marca de periférico"
                        }
                        if (!valores.modeloSeleccionado) {
                            errores.modeloSeleccionado = "Seleccioná un modelo"
                        }
                        if (!valores.garantiaSeleccionada) {
                            errores.garantiaSeleccionada = "Falta definir una garantía"
                        }
                        if (!valores.cantidadSeleccionada) {
                            errores.cantidadSeleccionada = "Falta cargar cantidad"
                        }
                        return errores;
                    }}

                    onSubmit={(valores, { resetForm }) => {
                        setItemsPerifericos(prevItems => [...prevItems, {
                            periferico: valores.perifericoSeleccionado.label,
                            marca: valores.marcaSeleccionada.label,
                            modelo: valores.modeloSeleccionado.label,
                            garantia: valores.garantiaSeleccionada,
                            cantidad: valores.cantidadSeleccionada,
                            comentarios: valores.comentarioPeriferico,
                            id: id
                        }]);
                        const addPerifericoRemito = {
                            ...dataRemito,  // Copia superficial del objeto dataRemito
                            perifericos: [  // Actualizamos la propiedad perifericos con un nuevo array
                                ...dataRemito.perifericos, // Copiamos los elementos actuales de perifericos
                                {  // Agregamos el nuevo periferico al final
                                    id: id,
                                    modelo_id: modeloId,
                                    garantia: valores.garantiaSeleccionada,
                                    cantidad: valores.cantidadSeleccionada,
                                    comentarios: valores.comentarioPeriferico,
                                }
                            ]
                        };
                        setId(id + 1);
                        setDataRemito(addPerifericoRemito)
                        setShowTable(true);
                        resetForm();
                    }}
                >

                    {({ errors, setFieldValue, values, resetForm }) => (

                        <Form>
                            <div className="row justify-content-start ">
                                <h3>Seleccione los periféricos</h3>
                                <div className="col-4">
                                    <label htmlFor='perifericos' >Periféricos</label>
                                    <SelectPerifericos
                                        selectedValuePerif={values.perifericoSeleccionado}
                                        onChange={(selectedPeriferico) => {
                                            setFieldValue('perifericoSeleccionado', selectedPeriferico)
                                            setSelectedValuePerif(selectedPeriferico)
                                            setPerifId(selectedPeriferico.perifId)
                                        }}
                                    />
                                    <ErrorMessage
                                        name="perifericoSeleccionado"
                                        component={() => (<span><small className="text-danger p-2">{errors.perifericoSeleccionado}</small></span>)} />
                                </div>

                                <div className="col-4">
                                    <label htmlFor='perifericos' >Marcas</label>
                                    <SelectMarcas
                                        selectedValueMarca={values.marcaSeleccionada}
                                        onChange={(selectedMarca) => {
                                            setFieldValue('marcaSeleccionada', selectedMarca)
                                            setSelectedValueMarca(selectedMarca)
                                            if (selectedMarca) {
                                                setMarcaId(selectedMarca.marcaId)
                                            } else {
                                                setMarcaId(null); // o cualquier valor predeterminado que desees usar cuando no se haya seleccionado una marca
                                            }

                                        }}
                                        perifId={perifId}
                                    />
                                    <ErrorMessage
                                        name="marcaSeleccionada"
                                        component={() => (<span><small className="text-danger p-2">{errors.marcaSeleccionada}</small></span>)}
                                    />
                                </div>

                                <div className="col-4">
                                    <label htmlFor='perifericos' >Modeloss</label>
                                    <SelectModelos
                                        selectedValueMod={values.modeloSeleccionado}
                                        onChange={(selectedModelo) => {
                                            setFieldValue('modeloSeleccionado', selectedModelo)
                                            setSelectedValueMod(selectedModelo)
                                            if (selectedModelo) {
                                                setModeloId(selectedModelo.modeloId)
                                            } else {
                                                setModeloId(null)
                                            }
                                        }}
                                        perifId={perifId}
                                        marcaId={marcaId}
                                    />
                                    <ErrorMessage
                                        name="modeloSeleccionado"
                                        component={() => (<span><small className="text-danger p-2">{errors.modeloSeleccionado}</small></span>)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="row justify-content-center">
                                    <div className="col-2">
                                        <label>Garantía</label>
                                        <Field
                                            placeholder="Garantía en meses"
                                            className="form-control"
                                            id="garantiaSeleccionada"
                                            name="garantiaSeleccionada"
                                            type="number"
                                        />
                                        <ErrorMessage
                                            name="garantiaSeleccionada"
                                            component={() => (<span><small className="text-danger p-2">{errors.garantiaSeleccionada}</small></span>)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <label>Cantidad</label>
                                        <Field
                                            placeholder="Unidades seleccionadas"
                                            type="number"
                                            className="form-control"
                                            id="cantidadSeleccionada"
                                            name="cantidadSeleccionada"
                                        />
                                        <ErrorMessage
                                            name="cantidadSeleccionada"
                                            component={() => (<span><small className="text-danger p-2">{errors.cantidadSeleccionada}</small></span>)}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <label htmlFor="comentarios">COMENTARIOS</label>
                                        <Field
                                            id="comentarioPeriferico"
                                            className="form-control"
                                            placeholder="El comentario no debe superar los 50 caracteres"
                                            name="comentarioPeriferico"
                                            rows="1"
                                            cols="50"
                                            maxLength='80'
                                        />
                                    </div>
                                    <br></br>
                                    <div className="row altaRemito">
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' type="submit">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
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
        </>
    )
}