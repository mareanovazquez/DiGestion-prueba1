import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectDepartamentos = ({onChange}) => {
    const [departamentos, setDepartamentos] = useState([])
    const { token } = useContext(UserContext)

    const http = new HttpService();

    useEffect(() => {
        http.getData('/departamentos', token)
        
            .then(response => {
                
                const departamentos = response.data.data.map(departamento => ({
                    value: departamento.nombre,
                    label: departamento.nombre                  
                    
                }
                ))
                setDepartamentos(departamentos)
                console.log(departamentos)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    const handleSelected = (departamentoSeleccionado) => {        
        onChange(departamentoSeleccionado.value  )
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

/* Esto es lo que debe modificarse para extraer el ID de la selección

const departamentos = response.data.data.map(departamento => ({
    value: departamento.nombre,
    label: departamento.nombre,
    segundoValor: departamento.otroValor, // Cambia "otroValor" al nombre correcto
}));


const handleSelected = (departamentoSeleccionado) => {
    onChange({
        value: departamentoSeleccionado.value,
        segundoValor: departamentoSeleccionado.segundoValor, // Cambia "segundoValor" al nombre correcto
    });
};

*/