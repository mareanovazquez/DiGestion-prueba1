import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"


export const SelectProveedores = (props) => {
    const [proveedores, setProveedores] = useState([])
    const {token} = useContext(UserContext)
    const http = new HttpService ();

    useEffect(() => {
        http.getData('/proveedores', token)
            .then(response => {
                
                const proveedores = response.data.data.map(proveedor => ({
                    value: proveedor.nombre,
                    label: proveedor.nombre,
                    proveedor_id: proveedor.id,
                }
                ))
                setProveedores(proveedores)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
  
    const handleSelected = (proveedorSeleccionado) => {        
        props.onChange({
            value: proveedorSeleccionado.value,
            proveedor_id: proveedorSeleccionado.proveedor_id
        });
        props.setSelectedValueProv(proveedorSeleccionado);
    }

    return (
        <>
            <Select
                value={props.selectedValueProv}
                options={proveedores}
                onChange={handleSelected}

            />
        </>
    )
}