import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"


export const SelectProveedores = ({onChange}) => {
    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        axios.get('http://10.10.49.124/api/proveedores')
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