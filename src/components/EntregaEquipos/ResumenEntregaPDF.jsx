import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import { useEffect } from "react";
export const ResumenEntregaPDF = ({ comprobanteEquipos, equiposAsignados }) => {

    
    const styles = StyleSheet.create({
        encabezado: {
            fontSize: '30px',
            textAlign: 'center',
            paddingTop: '20px',
        },
        encabezadoH2: {
            fontSize: '18px',
            textAlign: 'center',
            paddingTop: '10px',
            fontWeight: '800',
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
            fontSize:'14px',
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
            width:'100%',
        },
        tableCell: {
            margin: 'auto',
            marginTop: 5,
            marginBottom: 5,
            fontSize: '10px',
            paddingLeft: 5,
            paddingRight: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
            textAlign: 'center',
            width: '15%',
            alignItems: 'left',
        },
        tableHeader: {
            fontSize: '10px',
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
                <Page size="A4" style={styles.container}>
                    <View style={styles.encabezado}>
                        <Text>DiGestión</Text>
                    </View>
                    <Text style={styles.encabezadoH2}>Comprobante de la entrega de equipos</Text>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <ul style={styles.list}>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Departamento: {comprobanteEquipos.departamento}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Organismo:{comprobanteEquipos.organismo}</Text>
                                    </li>
                                    <li style={styles.listItem}>
                                        <Text style={styles.bold}>Fecha entrega: {comprobanteEquipos.fechaEntrega}</Text>
                                    </li>
                                </ul>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.comments}>
                            <Text style={styles.bold}>COMENTARIOS: {comprobanteEquipos.comentario}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.encabezadoH2}>Equipos asignados</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Remito n°</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Periférico</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Marca</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Modelo</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Numero Serie</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Comentario del Equipo</Text>
                        </View>
                        {comprobanteEquipos &&
                            comprobanteEquipos.stockEquipos.map((equipo, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{equiposAsignados.remito}</Text>
                                    <Text style={styles.tableCell}>{equipo.periferico}</Text>
                                    <Text style={styles.tableCell}>{equipo.marca}</Text>
                                    <Text style={styles.tableCell}>{equipo.modelo}</Text>
                                    <Text style={styles.tableCell}>{equipo.numeroSerie}</Text>
                                    <Text style={styles.tableCell}>{equipo.comentarioEquipo}</Text>
                                </View>
                            ))}
                    </View>
                </Page>
            </Document>
        </>
    )
}