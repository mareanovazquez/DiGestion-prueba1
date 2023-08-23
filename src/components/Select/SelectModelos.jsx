import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectModelos = ({ onChange, perifId, marcaId }) => {
    const [modelos, setModelos] = useState([])
    const { token } = useContext(UserContext)

    const http = new HttpService();

    useEffect(() => {

        if (marcaId) {

            http.getData(`/remitos/get-modelos/${marcaId}/${perifId}`, token)

                .then(response => {
                    const ListModelos = response.data
                    const modelos = Object.values(ListModelos).map(modelo => ({
                        value: modelo.nombre,
                        label: modelo.nombre,
                        modeloId: modelo.id // Cambia "otroValor" al nombre correcto                  

                    }
                    ))
                    setModelos(modelos)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [marcaId])

    const handleSelected = (modeloSeleccionada) => {
        onChange({
            value: modeloSeleccionada.value,
            modeloId: modeloSeleccionada.modeloId
        })
    }

    return (
        <>
            <Select
                defaultValue={{ label: 'Modelo', value: '' }}
                options={modelos}
                onChange={handleSelected}
            />
        </>
    )
}