import { useContext } from "react"

import { UserContext } from "../../UserContext/UserContext"


export const NotAllowedR = () => {

    const { usuarios } = useContext(UserContext)

    return (

        <>
        
            <div className="notAllowed">
                <h1>{usuarios}</h1>
                <h2 className="text-danger">¡No tenés permiso para ver esto!</h2>
            </div>
        </>
    )
}