import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { SelectDepartamentos } from "../Select/SelectDepartamentos";
import { Link, useNavigate } from "react-router-dom";




export const InitAsistente = ({ showTableEntrega, setShowTableEntrega }) => {

    const navigate = useNavigate();

    const [dataEntregaPerif, setDataEntregaPerif] = useState({});
    // useState para controlar el estado de los Select2 después de seleccionar y borrar
    const [selectedValueDep, setSelectedValueDep] = useState({ label: 'Departamentos', value: '' });

    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
        <>

            <div>
            </div>
            <div className="contenedorInitAsistente">
                <div>
                    <h2>Inicio asistente de entrega de equipos</h2>
                </div>

                <Formik
                    initialValues={{
                        departamento: '',
                        organismo: '',
                        fechaEntrega: '',
                        comentarios: ''
                    }}
                    validate={(valores) => {
                        let errores = {};

                        if (!valores.departamento) {
                            errores.departamento = "Seleccioná un departamento"
                        }

                        if (!valores.organismo) {
                            errores.organismo = "Seleccioná un organismo"
                        }

                        if (!valores.fechaEntrega) {
                            errores.fechaEntrega = "Definí una fecha de entrega"
                        }

                        return errores;
                    }}
                    onSubmit={(valores, { resetForm }) => {
                        setDataEntregaPerif(valores)
                        setShowTableEntrega(true)
                        setFormSubmitted(true); // Marcar el formulario como enviado
                    }}
                    enableReinitialize={true}
                    
                    initialErrors={{ // Nuevo: initialErrors en lugar de isInitialValid
                        departamento: 'Seleccioná un departamento',
                        organismo: 'Seleccioná un organismo',
                        fechaEntrega: 'Definí una fecha de entrega',
                    }}
                    validateOnMount
                >
                    {({ errors, setFieldValue, values, resetForm }) => (
                        <Form>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="departamentos"> Departamentos</label>
                                    <SelectDepartamentos
                                        selectedValueDep={values.departamento}
                                        onChange={(selectedDepartamento) => {
                                            setFieldValue('departamento', selectedDepartamento)
                                            setSelectedValueDep(selectedDepartamento)
                                        }}
                                        isDisabled={formSubmitted} // Deshabilitar el SelectDepartamentos después del envío
                                    />
                                    <ErrorMessage
                                        name="departamento"
                                        component={() => (<span><small className="text-danger p-2">{errors.departamento}</small></span>)}
                                    />
                                </div>
                                <div className="col">
                                    <label>Organismo</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="organismo"
                                        id="organismo"
                                        placeholder="Organismo"
                                        aria-label="Organismo"
                                        disabled={formSubmitted} // Deshabilitar el campo después del envío
                                    />
                                    <ErrorMessage
                                        name="organismo"
                                        component={() => (<span><small className="text-danger p-2">{errors.organismo}</small></span>)}
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor='fechaEntrega' >Fecha entrega</label>
                                    <Field className="form-control"
                                        type="date" id="fechaEntrega"
                                        name="fechaEntrega" pattern="\d{1,2}/\d{1,2}/\d{2}"
                                        placeholder="dd/mm/aa"
                                        aria-label="Fecha Entrega"
                                        disabled={formSubmitted} // Deshabilitar el campo después del envío
                                    />
                                    <ErrorMessage
                                        name="fechaEntrega"
                                        component={() => (<span><small className="text-danger p-2">{errors.fechaEntrega}</small></span>)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="comentarios">COMENTARIOS</label>
                                    <Field
                                        id="comentarios"
                                        className="form-control"
                                        placeholder="El comentario no puede superar los  200 caracteres"
                                        name="comentarios"
                                        as="textarea"
                                        rows="3"
                                        cols="100"
                                        maxLength="200"
                                        disabled={formSubmitted} // Deshabilitar el campo después del envío
                                    />
                                </div>
                            </div>

                            <div className="d-grid gap-2 p-2 d-md-flex justify-content-md-end">
                                <Link to='/remitos'><button className="btn btn-primary" type="button" disabled={formSubmitted}>Volver</button></Link>
                                <button className="btn btn-success" type="submit" disabled={formSubmitted}>Siguiente</button>
                                <button onClick={() => {
                                    resetForm();
                                    setSelectedValueDep({ label: 'Departamentos', value: '' });
                                    setDataEntregaPerif({})
                                }} className="btn btn-secondary" type="button" disabled={formSubmitted}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    )
}

