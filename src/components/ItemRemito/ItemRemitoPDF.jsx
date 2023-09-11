import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

export const ItemRemitoPDF = ({ data, dataPerifericos, name }) => {

    const styles = StyleSheet.create({
        encabezado: {
            fontSize: '30px',
            textAlign: 'center',
            paddingTop: '20px',
        },
        encabezadoH2:{
            fontSize:'18px',
            textAlign:'center',
            paddingTop:'10px',
            fontWeight:'800',
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
            tableLayout: 'auto',
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
            textAlign: 'center',
            width: '14%',
            alignItems: 'left',
        },
        tableHeader: {
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: '#f2f2f2',
            textAlign: 'center',
            paddingTop: 5,
            paddingBottom: 5,
        },
    });
    return (
        <>
            <Document>
                <Page size="A4">
                    <View style={styles.encabezado}>
                        <Text>DiGestión</Text>
                    </View>
                    <View style={styles.encabezadoH2}>
                    <Text>Remito N° {data.remito}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Departamento: {data.departamento}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Proveedor:{data.proveedor}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Fecha recepción: {data.fecha_recepcion}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Usuario alta: {name}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden provisión:{data.orden_provision}</Text>
                                    </li>
                                </ul>
                            </View>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Expediente:{data.expediente}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden compra:{data.orden_compra}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Legajo compra: {data.legajo_compra}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Orden entrega:{data.orden_entrega}</Text>
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
                        {dataPerifericos.length > 0 &&
                            dataPerifericos.map((periferico) =>
                                <View key={periferico.id} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{periferico.nombrePeriferico}</Text>
                                    <Text style={styles.tableCell}>{periferico.nombreMarca}</Text>
                                    <Text style={styles.tableCell}>{periferico.nombreModelo}</Text>
                                    <Text style={styles.tableCell}>{periferico.garantia}</Text>
                                    <Text style={styles.tableCell}>{periferico.cantidad}</Text>
                                    <Text style={styles.tableCell}>{periferico.disponible}</Text>
                                    <Text style={styles.tableCell}>{periferico.comentarios}</Text>
                                </View>
                            )
                        }
                    </View>
                </Page>
            </Document>
        </>
    )
}