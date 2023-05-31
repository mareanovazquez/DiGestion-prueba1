import { useEffect, useState } from "react";
import { ProductFilter } from "../ProductFilter/ProductFilter"


export const ListaRemitos2 = () => {
   

    const [remitos, setRemitos] = useState([]);

    useEffect(() => {
        const FetchRemitos = async () => {
            const response = await fetch('http://10.10.49.124/api/remitos');
            const results = await response.json()
            const remitos = results.data

            setRemitos(remitos)
        }

        FetchRemitos()
    }, [])

    const handleFilterChange = (filterValue) => {
        // Update the products state with the filtered list of products
        const remitosFiltrados = remitos.filter(remito => remito.comentarios.toLowerCase().includes(filterValue.toLowerCase()))
        setRemitos(remitosFiltrados)
    }

    return (
        <div>
            <h1>Lista de remitos</h1>
            <ProductFilter remitos={remitos}  />
        </div>
    )
}