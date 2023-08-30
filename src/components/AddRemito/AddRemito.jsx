import { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext/UserContext";
import { Link } from "react-router-dom";
import { ModalAddPerifericos } from "../ModalAddPerifericos/ModalAddPerifericos";
import { SelectProveedores } from "../Select/SelectProveedores";
import { SelectDepartamentos } from "../Select/SelectDepartamentos";

import { Formik } from "formik";

export const AddRemito = () => {

    const [show, setShow] = useState(false);


    const [dataAddRemito, setDataAddRemito] = useState({
        departamento: "",
        proveedor: "",
        fechaRecepcionSTI: "",
        remito: "",
        expediente: "",
        fechaRecepcionDTI: "",
        ordenCompra: "",
        legajoCompra: "",
        ordenProvision: "",
        ordenEntrega: "",
        comentarios: "",
        usuarioAlta: ""
    });

    const { name } = useContext(UserContext);

    // useState para controlar el estado de los Select2 después de seleccionar y borrar
    const [selectedValueProv, setSelectedValueProv] = useState({ label: 'Proveedores', value: '' });
    const [selectedValueDep, setSelectedValueDep] = useState({ label: 'Departamentos', value: '' });


    const handleDepartamentoChange = (selectedDepartamento) => {
        setDataAddRemito({ ...dataAddRemito, departamento: selectedDepartamento })
    }

    const handleProveedorChange = (selectedProveedor) => {
        setDataAddRemito({ ...dataAddRemito, proveedor: selectedProveedor })
    }

    const deleteCamposRemito = () => {
        setDataAddRemito({

            departamento: "",
            departamento_id: "",
            proveedor: "",
            fechaRecepcionSTI: "",
            remito: "",
            expediente: "",
            fechaRecepcionDTI: "",
            ordenCompra: "",
            legajoCompra: "",
            ordenProvision: "",
            ordenEntrega: "",
            comentarios: "",
        })

        setSelectedValueProv({ label: 'Proveedores', value: '' });
        setSelectedValueDep({ label: 'Departamentos', value: '' });
    }


    return (
        <>
            <div className="contenedorAltaRemito">
                <Formik
                    initialValues={{
                        fechaRecepcionSTI: '',
                        remito: '',
                        expediente: '',
                        fechaRecepcionDTI: '',
                        ordenCompra: '',
                        legajoCompra: '',
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

                        if (!valores.expediente) {
                            errores.expediente = 'Ingresá un número de expediente'
                        }

                        if (!valores.expediente) {
                            errores.expediente = 'Ingresá un número de expediente'
                        }

                        if (!valores.fechaRecepcionDTI) {
                            errores.fechaRecepcionDTI = 'Ingresá una fecha de recepción a la DTI'
                        }

                        if (!valores.ordenCompra) {
                            errores.ordenCompra = 'Ingresá la orden de compra'
                        }

                        if (!valores.legajoCompra) {
                            errores.legajoCompra = 'Ingresá el legajo de compra'
                        }

                        if (!valores.ordenProvision) {
                            errores.ordenProvision = 'Ingresá la orden de provisión'
                        }

                        if (!valores.ordenEntrega) {
                            errores.ordenEntrega = 'Ingresá la orden de entrega'
                        }

                        return errores;
                    }}
                    onSubmit={(valores, { resetForm }) => {
                        resetForm();
                        console.log('formlario enviado')
                        console.log(valores)
                        setShow(true)
                        
                    }}
                >
                    {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (

                        <form onSubmit={handleSubmit}>
                            <div className="row altaRemito">
                                <h2 className="text-left"> Alta de Remito</h2>

                                <div className="col">
                                    <label>Usuario Alta</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Usuario"
                                        aria-label="Usuario Ata"
                                        value={name}
                                        disabled
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor='departamentos' >Departamentos</label>
                                    <SelectDepartamentos
                                        onChange={handleDepartamentoChange}
                                        selectedValueDep={selectedValueDep}
                                        setSelectedValueDep={setSelectedValueDep} />
                                </div>

                                <div className="col">
                                    <label htmlFor='proveedores' >Proveedores</label>
                                    <SelectProveedores
                                        onChange={handleProveedorChange}
                                        selectedValueProv={selectedValueProv}
                                        setSelectedValueProv={setSelectedValueProv} />
                                </div>

                                <div className="col">
                                    <label htmlFor='fechaRecepcionSTI' >Fecha recepción STI</label>
                                    <input className="form-control"
                                        type="date" id="fechaRecepcionSTI"
                                        name="fechaRecepcionSTI" pattern="\d{1,2}/\d{1,2}/\d{2}"
                                        placeholder="dd/mm/aa"
                                        required aria-label="Fecha recepción STI"
                                        value={values.fechaRecepcionSTI}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.fechaRecepcionSTI && errors.fechaRecepcionSTI && <span><small className="text-danger p-2">{errors.fechaRecepcionSTI}</small></span>}
                                </div>
                            </div>

                            <div className="row altaRemito">
                                <div className="col">
                                    <label>Remito</label>
                                    <input type="number"
                                        className="form-control"
                                        name="remito"
                                        id="remito"
                                        placeholder="Número remito"
                                        aria-label="Remito"
                                        value={values.remito}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.remito && errors.remito && <span><small className="text-danger p-2">{errors.remito}</small></span>}
                                </div>

                                <div className="col">
                                    <label>Expediente</label>
                                    <input type="text"
                                        className="form-control"
                                        name="expediente"
                                        id="expediente"
                                        placeholder="Expediente"
                                        aria-label="Expediente"
                                        value={values.expediente}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.expediente && errors.expediente && <span><small className="text-danger p-2">{errors.expediente}</small></span>}

                                </div>
                                <div className="col">
                                    <label htmlFor='fechaRecepcionDTI' >Fecha recepción DTI</label>
                                    <input className="form-control"
                                        type="date"
                                        id="fechaRecepcionDTI"
                                        name="fechaRecepcionDTI"
                                        pattern="\d{1,2}/\d{1,2}/\d{2}"
                                        placeholder="dd/mm/aa"
                                        required aria-label="Fecha recepción DTI"
                                        value={values.fechaRecepcionDTI}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.fechaRecepcionDTI && errors.fechaRecepcionDTI && <span><small className="text-danger p-2">{errors.fechaRecepcionDTI}</small></span>}

                                </div>

                            </div>
                            <div className="row altaRemito">
                                <div className="col">
                                    <label>Orden compra</label>
                                    <input type="text"
                                        className="form-control"
                                        name="ordenCompra"
                                        id="ordenCompra"
                                        placeholder="Orden compra"
                                        aria-label="orden compra"
                                        value={values.ordenCompra}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.ordenCompra && errors.ordenCompra && <span><small className="text-danger p-2">{errors.ordenCompra}</small></span>}
                                </div>

                                <div className="col">
                                    <label>Legajo compra</label>
                                    <input type="text"
                                        className="form-control"
                                        name="legajoCompra"
                                        id="legajoCompra"
                                        placeholder="Legajo compra"
                                        aria-label="Legajo compra"
                                        value={values.legajoCompra}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.legajoCompra && errors.legajoCompra && <span><small className="text-danger p-2">{errors.legajoCompra}</small></span>}
                                </div>

                                <div className="col">
                                    <label>Orden provisión</label>
                                    <input type="text"
                                        className="form-control"
                                        name="ordenProvision"
                                        id="ordenProvision"
                                        placeholder="Orden provisión"
                                        aria-label="orden provisión"
                                        value={values.ordenProvision}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.ordenProvision && errors.ordenProvision && <span><small className="text-danger p-2">{errors.ordenProvision}</small></span>}
                                </div>

                                <div className="col">
                                    <label>Orden entrega</label>
                                    <input type="text"
                                        className="form-control"
                                        name="ordenEntrega"
                                        id="ordenEntrega"
                                        placeholder="Orden entrega"
                                        aria-label="Orden entrega"
                                        value={values.ordenEntrega}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.ordenEntrega && errors.ordenEntrega && <span><small className="text-danger p-2">{errors.ordenEntrega}</small></span>}
                                </div>

                            </div>
                            <div className="row altaRemito">
                                <div className="col">
                                    <label htmlFor="comentarios">COMENTARIOS</label>
                                    <textarea id="comentarios"
                                        className="form-control"
                                        name="comentarios"
                                        rows="3"
                                        cols="100"
                                        value={values.comentarios}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></textarea>

                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to='/remitos'><button className="btn btn-primary" type="button">Volver</button> </Link>
                                <button className='btn btn-primary' type="submit">Enviar</button>
                                <button onClick={deleteCamposRemito} className="btn btn-primary" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash trashIcon" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>
                <div className="row altaRemito">



                    <ModalAddPerifericos data={{ ...dataAddRemito, usuarioAlta: name }} deleteCamposRemito={deleteCamposRemito} setShow={setShow} show={show}/* deshabilitado={!isFormValid} */ />


                </div>
            </div >
        </>
    )
}