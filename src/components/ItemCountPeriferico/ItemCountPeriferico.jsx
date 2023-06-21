import { useState } from "react";


export const ItemCount = () => {

    const [counter, setCounter] = useState(1)

    let sumarCount = () => {
        if (counter < 5) {
            setCounter(counter + 1)
        }
    }

    let restarCount = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

    return (
        <>
            <br></br>
            <button onClick={sumarCount}>+1</button>
            <button onClick={restarCount}>-1</button>
            <p>cantidad: {counter}</p>
            <button>Agregar al remito</button>
        </>
    )
}