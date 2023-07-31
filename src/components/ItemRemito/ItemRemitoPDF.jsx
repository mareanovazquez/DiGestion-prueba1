import { useContext, useState } from "react";
import HttpService from "../../services/HttpService";
import { UserContext } from "../../UserContext/UserContext";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"


export const ItemRemitoPDF = ({data}) => {

    const [remitos, setRemitos] = useState([])
    const { token } = useContext(UserContext);
    const http = new HttpService();

    const styles = StyleSheet.create({
        encabezado: {
            fontSize: '30px',
            textAlign: 'center',
            paddingTop: '20px',
        },
        container: {
            marginBottom: 10,
            padding: '20px',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        column: {
            flex: 1,
        },
        list: {
            marginTop: 5,
            marginBottom: 5,
            fontSize: 10,
        },
        listItem: {
            marginBottom: 3,
        },
        bold: {
            fontWeight: 'bold',
        },
        separator: {
            borderTopWidth: 1,
            borderTopColor: '#bfbfbf',
            marginTop: 10,
            marginBottom: 10,
        },
        comments: {
            marginTop: 10,
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            marginTop: 10,
        },
        tableRow: {
            margin: 'auto',
            flexDirection: 'row',
        },
        tableCell: {
            margin: 'auto',
            marginTop: 5,
            marginBottom: 5,
            fontSize: 10,
            paddingLeft: 5,
            paddingRight: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
        },
        tableHeader: {
            fontSize: '12px',
            fontWeight: 'bold',
        },
    });
    return (
        <>
            <Document>
                <Page size="A4">
                    <View style={styles.encabezado}>
                        <Text>DiGestión</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Departamento: {data.departamento}</Text> 
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Remito: {data.remito}</Text> 
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Usuario alta:</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden provisión:</Text>
                                    </li>
                                </ul>
                            </View>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Proveedor:{data.proveedor}</Text> 
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Expediente:</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden compra:</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden entrega:</Text>
                                    </li>
                                </ul>
                            </View>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Fecha recepción: {data.fecha_recepcion}</Text> 
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Fecha recepción DTI: {data.fecha_recepcion_dti}</Text> 
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Legajo compra:</Text>
                                    </li>
                                </ul>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.comments}>
                            <Text style={styles.bold}>COMENTARIOS: {data.comentarios}</Text> 
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Periférico</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Marca</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Modelo</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Garantía</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Cantidad</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Disponible</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Comentarios</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>CPU Mini</Text>
                            <Text style={styles.tableCell}>HP</Text>
                            <Text style={styles.tableCell}>Elite desk 800</Text>
                            <Text style={styles.tableCell}>12 meses</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>esto es un comentario</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>CPU Mini</Text>
                            <Text style={styles.tableCell}>HP</Text>
                            <Text style={styles.tableCell}>Elite desk 800</Text>
                            <Text style={styles.tableCell}>12 meses</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>esto es un comentario</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>CPU Mini</Text>
                            <Text style={styles.tableCell}>HP</Text>
                            <Text style={styles.tableCell}>Elite desk 800</Text>
                            <Text style={styles.tableCell}>12 meses</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>8</Text>
                            <Text style={styles.tableCell}>esto es un comentario</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    )
}