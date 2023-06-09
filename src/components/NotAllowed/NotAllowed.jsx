import { useContext } from "react"
import { NavBar } from "../NavBar/NavBar"
import { UserContext } from "../../UserContext/UserContext"

export const NotAllowed = () => {

    const { usuarios } = useContext(UserContext)

    return (

        <>
            <NavBar />
            <div className="notAllowed">
                <h1>{usuarios}</h1>
                <h2 className="text-danger">¡No tenés permiso para ver esto!</h2>
            </div>
        </>
    )
}