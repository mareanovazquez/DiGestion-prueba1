import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectModelos = (props) => {
    const [modelos, setModelos] = useState([])
    const { token } = useContext(UserContext)

    const http = new HttpService();

    const perifId = props.perifId;
    const marcaId = props.marcaId

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
        props.onChange({
            value: modeloSeleccionada.value,
            modeloId: modeloSeleccionada.modeloId
        });
        props.setSelectedValueMod(modeloSeleccionada)
    }

    return (
        <>
            <Select
                value={props.selectedValueMod}
                options={modelos}
                onChange={handleSelected}
            />
        </>
    )
}