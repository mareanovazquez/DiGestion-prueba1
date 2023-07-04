import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"


export const SelectProveedores = ({onChange}) => {
    const [proveedores, setProveedores] = useState([])
    const {token} = useContext(UserContext)
    const http = new HttpService ();

    useEffect(() => {
        http.getData('/proveedores', token)
            .then(response => {
                
                const proveedores = response.data.data.map(proveedor => ({
                    value: proveedor.nombre,
                    label: proveedor.nombre
                }
                ))
                setProveedores(proveedores)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    const handleSelected = (proveedorSeleccionado) => {        
        onChange(proveedorSeleccionado.value)
    }
    return (
        <>
            <Select
                defaultValue={ {label: 'Proveedores', value: ' '}}
                options={proveedores}
                onChange={handleSelected}
            />
        </>
    )
}