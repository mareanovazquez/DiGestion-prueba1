import { useContext } from "react"
import { UserContext } from "../../UserContext/UserContext"

export const ItemListPerifericosRaW = () => {


    const { permisos, departamento } = useContext(UserContext)
    return (

        <>
            <h2 className="text-center"> Lista de Periféricos</h2>
            <h3 className="text-center"> Permisos de solo {permisos}</h3>
            <h3 className="text-center"> Departamento {departamento}</h3>
        </>
    )
}