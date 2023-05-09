import { useState } from "react";
import { DataProveedor } from "../DataProveedor/DataProveedor";

export const ItemProveedor = () => {

    const [id, setId] = useState('')
    const [proveedor, setProveedor] = useState(null);

    async function fetchProveedor() {

        const response = await fetch(`http://10.10.49.124/api/proveedores/${'id'}`)
        const data = await response.json()


        setProveedor(data.data)
        setId('')
    }

    function handleInputChange(e) {
        setId(e.target.value);
    }

    

    return (
        <>
            <div>
                <input
                    className="text-muted"
                    type="text"
                    value={id}
                    name="usuario"
                    placeholder="Proveedor"
                    onChange={handleInputChange}
                />
                <br></br>
                <br></br>
                <button className="btn btn-success" onClick={fetchProveedor}>Buscar</button>

                <DataProveedor proveedor={proveedor} /> 

                


            </div>
        </>
    )
}