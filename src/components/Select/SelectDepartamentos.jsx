import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";

export const SelectDepartamentos = (props) => {
    const [departamentos, setDepartamentos] = useState([]);
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
        props.onChange(departamentoSeleccionado); // Pasamos todo el objeto seleccionado para que coincida con el formato de las opciones
    }

    return (
        <Select
            value={props.selectedValueDep} // Asegúrate de que selectedValueDep tenga el formato correcto
            options={departamentos}
            onChange={handleSelected}
            placeholder="Departamento"
        />
    );
}


