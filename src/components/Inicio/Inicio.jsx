import { useContext } from "react"
import { UserContext } from "../../UserContext/UserContext"

export const Inicio = ()=> {

const { username } = useContext(UserContext)

    return (
        <>
        <h2>Bienvenido {username}</h2>
        </>
    )
}