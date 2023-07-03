import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"

export const SelectDepartamentos = ({onChange}) => {
    const [departamentos, setDepartamentos] = useState([])

    useEffect(() => {
        axios.get('http://10.10.49.124/api/departamentos')
            .then(response => {
                
                const departamentos = response.data.data.map(departamento => ({
                    value: departamento.nombre,
                    label: departamento.nombre
                }
                ))
                setDepartamentos(departamentos)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    const handleSelected = (departamentoSeleccionado) => {        
        onChange(departamentoSeleccionado.value)
    }

    return (
        <>
            <Select
                defaultValue={ {label: 'Departamentos', value: ' '}}
                options={departamentos}
                onChange={handleSelected}
            />
        </>
    )
}