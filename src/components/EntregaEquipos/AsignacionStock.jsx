export const AsignacionStock = ({dataPerifericos, setShowTableEntrega, showTableEntrega})=> {

    console.log(dataPerifericos)

    return (
        <>
        <div>
            <h2>Asignación cantidad de stock por equipo</h2>
            
            <>
           
            {dataPerifericos.map((periferico) =>
            <ul key={periferico.id}>
                <li>{periferico.nombreMarca}</li>
                <li></li>
            </ul>

            )
            }
       
            </>
            

        </div>
        </>
    )
}