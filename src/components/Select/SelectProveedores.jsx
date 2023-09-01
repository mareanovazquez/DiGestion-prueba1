import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";

export const SelectProveedores = (props) => {
    const [proveedores, setProveedores] = useState([]);
    const { token } = useContext(UserContext);
    const http = new HttpService();

    useEffect(() => {
        http.getData('/proveedores', token)
            .then(response => {
                const proveedores = response.data.data.map(proveedor => ({
                    value: proveedor.nombre,
                    label: proveedor.nombre,
                    proveedor_id: proveedor.id,
                }));
                setProveedores(proveedores);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSelected = (proveedorSeleccionado) => {
        props.onChange(proveedorSeleccionado); // Pasamos todo el objeto seleccionado para que coincida con el formato de las opciones
    }

    return (
        <Select
            value={props.selectedValueProv} // Asegúrate de que selectedValueProv tenga el formato correcto
            options={proveedores}
            onChange={handleSelected}
            placeholder="Proveedor"
        />
    );
}
