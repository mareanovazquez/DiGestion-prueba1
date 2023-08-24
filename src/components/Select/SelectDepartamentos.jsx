import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectDepartamentos = (props) => {
    const [departamentos, setDepartamentos] = useState([])
    const { token } = useContext(UserContext)
    const http = new HttpService();

    useEffect(() => {
        http.getData('/departamentos', token)

            .then(response => {

                const departamentos = response.data.data.map(departamento => ({
                    value: departamento.nombre,
                    label: departamento.nombre,
                    departamento_id: departamento.id, // Cambia "otroValor" al nombre correcto                  

                }
                ))
                setDepartamentos(departamentos)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSelected = (departamentoSeleccionado) => {
        props.onChange({
            value: departamentoSeleccionado.value,
            departamento_id: departamentoSeleccionado.departamento_id
        });
        props.setSelectedValueDep(departamentoSeleccionado)
    }

    return (
        <>
            <Select
                value={props.selectedValueDep}
                options={departamentos}
                onChange={handleSelected}
            />
        </>
    )
}

