import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { ModalAddPerifericos } from "../ModalAddPerifericos/ModalAddPerifericos";
import { SelectProveedores } from "../Select/SelectProveedores";
import { SelectDepartamentos } from "../Select/SelectDepartamentos";

export const AddRemito = () => {

    const [show, setShow] = useState(false);

    const [dataAddRemito, setDataAddRemito] = useState({});

    /* ESTADO PARA CONTROLAR EL SELECT2 DE ORGANISMO */
    const [deptoId, setDeptoId] = useState('')

    // useState para controlar el estado de los Select2 después de seleccionar y borrar
    const [selectedValueProv, setSelectedValueProv] = useState({ label: 'Proveedores', value: '' });
    const [selectedValueDep, setSelectedValueDep] = useState({ label: 'Departamentos', value: '' });


    return (
        <>
            <div className="contenedorAltaRemito">
                <Formik
                    initialValues={{
                        remito: '',
                        departamento: '',
                        proveedor: '',
                        fechaRecepcionSTI: '',
                        expediente: '',
                        legajoCompra: '',
                        ordenCompra: '',
                        ordenProvision: '',
                        ordenEntrega: '',
                        comentarios: ''
                    }}
                    validate={(valores) => {
                        let errores = {};

                        if (!valores.fechaRecepcionSTI) {
                            errores.fechaRecepcionSTI = 'Ingresá fecha de recepción'
                        }

                        if (!valores.remito) {
                            errores.remito = 'Ingresá número de remito'
                        }

                        if (!valores.departamento) {
                            errores.departamento = "Seleccioná un departamento";
                        }
                        if (!valores.proveedor) {
                            errores.proveedor = "Seleccioná un proveedor";
                        }

                        return errores;
                    }}
                    onSubmit={(valores, { resetForm }) => {
                        setDataAddRemito(valores)
                        resetForm();
                        setShow(true)
                    }}

                >
                    {({ errors, setFieldValue, values, resetForm }) => (

                        <Form>
                            <div className="row altaRemito">
                                <h2 className="text-left"> Alta de Remito</h2>

                                <div className="col">
                                    <label>Remito</label>
                                    <Field type="number"
                                        className="form-control"
                                        name="remito"
                                        id="remito"
                                        placeholder="Número remito"
                                        aria-label="Remito"
                                    />
                                    <ErrorMessage
                                        name="remito"
                                        component={() => (<span><small className="text-danger p-2">{errors.remito}</small></span>)}
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor='departamentos' >Departamentos</label>
                                    <SelectDepartamentos
                                        selectedValueDep={values.departamento}
                                        onChange={(selectedDepartamento) => {
                                            setFieldValue('departamento', selectedDepartamento);
                                            setSelectedValueDep(selectedDepartamento);
                                        }}
                                        deptoId={deptoId}
                                        setDeptoId={setDeptoId} />
                                    <ErrorMessage
                                        name="departamento"
                                        component={() => (<span><small className="text-danger p-2">{errors.departamento}</small></span>)}
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor='proveedores' >Proveedores</label>
                                    <SelectProveedores
                                        selectedValueProv={values.proveedor}
                                        onChange={(selectedProveedor) => {
                                            setFieldValue('proveedor', selectedProveedor);
                                            setSelectedValueProv(selectedProveedor);
                                        }} />
                                    <ErrorMessage
                                        name="proveedor"
                                        component={() => (<span><small className="text-danger p-2">{errors.proveedor}</small></span>)}
                                    />
                                </div>
                            </div>

                            <div className="row altaRemito">
                                <div className="col">
                                    <label htmlFor='fechaRecepcionSTI' >Fecha recepción STI</label>
                                    <Field className="form-control"
                                        type="date" id="fechaRecepcionSTI"
                                        name="fechaRecepcionSTI" pattern="\d{1,2}/\d{1,2}/\d{2}"
                                        placeholder="dd/mm/aa"
                                        aria-label="Fecha recepción STI"
                                    />
                                    <ErrorMessage
                                        name="fechaRecepcionSTI"
                                        component={() => (<span><small className="text-danger p-2">{errors.fechaRecepcionSTI}</small></span>)}
                                    />
                                </div>

                                <div className="col">
                                    <label>Expediente</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="expediente"
                                        id="expediente"
                                        placeholder="Expediente"
                                        aria-label="Expediente"
                                    />
                                </div>

                                <div className="col">
                                    <label>Legajo compra</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="legajoCompra"
                                        id="legajoCompra"
                                        placeholder="Legajo compra"
                                        aria-label="Legajo compra"
                                    />
                                </div>

                            </div>
                            <div className="row altaRemito">
                                <div className="col">
                                    <label>Orden compra</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="ordenCompra"
                                        id="ordenCompra"
                                        placeholder="Orden compra"
                                        aria-label="orden compra"
                                    />
                                </div>

                                <div className="col">
                                    <label>Orden provisión</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="ordenProvision"
                                        id="ordenProvision"
                                        placeholder="Orden provisión"
                                        aria-label="orden provisión"
                                    />
                                </div>

                                <div className="col">
                                    <label>Orden entrega</label>
                                    <Field type="text"
                                        className="form-control"
                                        name="ordenEntrega"
                                        id="ordenEntrega"
                                        placeholder="Orden entrega"
                                        aria-label="Orden entrega"
                                    />
                                </div>

                            </div>
                            <div className="row altaRemito">
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
                                    />

                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to='/remitos'><button className="btn btn-primary" type="button">Volver</button> </Link>
                                <button className='btn btn-primary' type="submit">Enviar</button>
                                <button onClick={() => {
                                    resetForm();
                                    setSelectedValueProv({ label: 'Proveedores', value: '' });
                                    setSelectedValueDep({ label: 'Departamentos', value: '' });
                                    setDataAddRemito({})
                                }} className="btn btn-primary" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button>
                            </div>
                            <ModalAddPerifericos setDataAddRemito={setDataAddRemito} dataAddRemito={dataAddRemito} setShow={setShow} show={show} />
                        </Form>
                    )}
                </Formik>
                <div className="row altaRemito">
                </div>
            </div >
        </>
    )
}