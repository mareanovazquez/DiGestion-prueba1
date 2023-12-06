import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { UserContext } from "../../UserContext/UserContext"
import HttpService from "../../services/HttpService"

export const SelectOrganismos = (props) => {
    const [organismos, setOrganismos] = useState([])
    const { token } = useContext(UserContext)
    const http = new HttpService();
    const deptoId = props.deptoId


    useEffect(() => {
        if (deptoId) {
            http.getData(`/organismos-by-depto/${deptoId}`, token)
                .then(response => {
                    const organismos = response.data.data.map(organismo => ({
                        value: organismo.nombre,
                        label: organismo.nombre,
                        organismoId: organismo.id
                    }
                    ))
                    setOrganismos(organismos)

                })
                .catch(error => {
                    console.log(error)
                });
            props.onChange(null)
        }
    }, [deptoId])

    const handleSelected = (organismoSeleccionado) => {
        props.onChange(organismoSeleccionado);
    }

    return (
        <>
            <Select
                value={props.selectedValueOrg}
                options={organismos}
                onChange={handleSelected}
                placeholder="Organismos"
            />
        </>
    )
}