import { useEffect, useState } from "react"


export const ListaRemitos = () => {

    const [remitos, setRemitos] = useState([]);

    useEffect (()=> {
        const FetchRemitos = async () => {
            const response = await fetch ('http://10.10.49.124/api/remitos');
            const results= await response.json()
            const remitos = results.data

            setRemitos(remitos)
        }

        FetchRemitos()
    }, [])

    
    return (
        <>
            <h3 className="text-center"> Lista de remitos</h3>

            { <ul className="card-group">
                {remitos.map((remito) => (
                    <li className="card" key={remito.id}>{remito.proveedor_id}</li>
                ))}
                
                </ul>}
        </>


    )

}