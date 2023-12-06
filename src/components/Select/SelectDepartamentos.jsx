import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";

export const SelectDepartamentos = (props) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState(null); // Nuevo estado para almacenar el departamento_id
    const { token } = useContext(UserContext);
    const http = new HttpService();

    useEffect(() => {
        http.getData('/departamentos', token)
            .then(response => {
                const departamentos = response.data.data.map(departamento => ({
                    value: departamento.nombre,
                    label: departamento.nombre,
                    departamento_id: departamento.id
                }));
                setDepartamentos(departamentos);

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSelected = (departamentoSeleccionado) => {
        const departamentoId = departamentoSeleccionado.departamento_id;
        setSelectedDepartamentoId(departamentoId);

        // Utiliza la función setDeptoId proporcionada como prop
        props.setDeptoId(departamentoId);
        props.onChange(departamentoSeleccionado);
    }



    return (
        <Select
            value={props.selectedValueDep}
            options={departamentos}
            onChange={handleSelected}
            placeholder="Departamentos"
        />
    );
}


