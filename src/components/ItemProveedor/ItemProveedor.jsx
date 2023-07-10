import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import HttpService from "../../services/HttpService";
import { Card } from "react-bootstrap";

export const ItemProveedor = () => {

    const [proveedor, setProveedor] = useState('')
    const { pid } = useParams();
    const { token } = useContext(UserContext)

    const http = new HttpService();

    useEffect(() => {
        http.getData(`/proveedor/${pid}`, token)
            .then(response => {
                const ListProveedores = response.data.data.nombre;
                setProveedor(ListProveedores)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])



    return (
        <>
       
            <div className="p-3">
                <h2 className="text-center"> PROVEEDOR </h2>
                <h5 className="text-center">{proveedor}</h5>
            </div>
        
        </>
    )
}