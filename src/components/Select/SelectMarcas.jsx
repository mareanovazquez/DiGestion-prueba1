import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectMarcas = ({ onChange, perifId }) => {
    const [marcas, setMarcas] = useState([])
    const { token } = useContext(UserContext)

    const http = new HttpService();

    useEffect(() => {

        if (perifId) {

            http.getData(`/remitos/get-marcas/${perifId}`, token)

                .then(response => {
                    const ListMarcas = response.data
                    const marcas = Object.values(ListMarcas).map(marca => ({
                        value: marca.nombre,
                        label: marca.nombre,
                        marcaId: marca.id // Cambia "otroValor" al nombre correcto                  

                    }
                    ))
                    setMarcas(marcas)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [perifId])

    const handleSelected = (marcaSeleccionada) => {
        onChange({
            value: marcaSeleccionada.value,
            marcaId: marcaSeleccionada.marcaId
        })
    }

    return (
        <>
            <Select
                defaultValue={{ label: 'Marcas', value: '' }}
                options={marcas}
                onChange={handleSelected}
            />
        </>
    )
}