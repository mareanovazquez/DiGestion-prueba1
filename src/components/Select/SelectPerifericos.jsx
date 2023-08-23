import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectPerifericos = ({onChange}) => {
    const [perifericos, setPerifericos] = useState([])
    const { token } = useContext(UserContext)

    const http = new HttpService();

    useEffect(() => {
        http.getData('/perifericos', token)
        
            .then(response => {
                
                const perifericos = response.data.data.map(periferico => ({
                    value: periferico.nombre,
                    label: periferico.nombre,
                    perifId: periferico.id // Cambia "otroValor" al nombre correcto                  
                    
                }
                ))
                setPerifericos(perifericos)
                })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    const handleSelected = (perifericoSeleccionado) => {        
        onChange({value: perifericoSeleccionado.value,
                perifId: perifericoSeleccionado.perifId});
    }

    return (
        <>
            <Select
                defaultValue={ {label: 'Periférico', value: ''}}
                options={perifericos}
                onChange={handleSelected}
            />
        </>
    )
}