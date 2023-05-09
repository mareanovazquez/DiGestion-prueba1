import { useEffect, useState } from "react";
export const ListProveedores = () => {

    const [proveedores, setProveedores] = useState([]);
    

    useEffect(() => {
        const FetchProveedores = async () => {
            const response = await fetch('http://10.10.49.124/api/proveedores');
            const result = await response.json();

            const proveedores = result.data

            setProveedores(proveedores);
            
        }

        FetchProveedores()

    }, []);


    


    return (

        <>
            <div>
                <h3 className="text-center">Lista de proveedores</h3>
               {<ul className="grupo-proveedores">
                    {proveedores.map((proveedor) => (
                        <li className="card text-center " key={proveedor.id}> {proveedor.nombre}</li>
                    ))} 
                </ul>} 
               
            </div>
        </>
    )
}