import { PDFDownloadLink } from "@react-pdf/renderer"
import { ResumenEntregaPDF } from "./ResumenEntregaPDF"

export const ConfirmacionEntrega = ({ equiposAsignados, setEquiposAsignados, comprobanteEquipos, setComprobanteEquipos, perifericosEntregados, setPerifericosEntregados, showConfirmacionEntrega, setShowConfirmacionEntrega }) => {


    return (
        <> {showConfirmacionEntrega &&
              <h2>Asignación completada correctamente</h2>
           
        }


            {/*   <PDFDownloadLink document={<ResumenEntregaPDF comprobanteEquipos={comprobanteEquipos} equiposAsignados={equiposAsignados} />} fileName='Comprobante_Entrega_Equipos'>
                <button className="btn btn-danger" type="button"> PDF </button>
            </PDFDownloadLink> */}
        </>
    )
}