import { useState } from "react";
import { Form } from "react-bootstrap";
import { ItemCount } from "../ItemCountPeriferico/ItemCountPeriferico";

export const ListadoPerifericos = () => {

    const perifericos = [
        {
            id: 1,
            nombre: 'Impresora',
            marca: [
                {
                    id: 1,
                    nombre: 'HP',
                    modelo: [
                        {
                            id: 1,
                            nombre: 'HP DeskJet 2130'
                        },
                        {
                            id: 2,
                            nombre: 'HP LaserJet Pro M15w'
                        },
                    ]
                },
                {
                    id: 2,
                    nombre: 'Samsung',
                    modelo: [
                        { id: 1, nombre: 'Samsung XYZ Printer' },
                        { id: 2, nombre: 'Samsung ABC Printer' },
                    ]
                }
            ]
        },
        {
            id: 2,
            nombre: 'Monitor',
            marca: [
                {
                    id: 1,
                    nombre: 'HP',
                    modelo: [
                        { id: 1, nombre: 'HP Ultrasharp U2719D' },
                        { id: 2, nombre: 'HP XYZ Monitor' }
                    ]
                },
                {
                    id: 2,
                    nombre: 'Samsung',
                    modelo: [
                        { id: 1, nombre: 'Samsung S34J550WQ' },
                        { id: 2, nombre: 'Samsung S40000WQ' },
                    ]
                },
                {
                    id: 3,
                    nombre: 'Lenovo',
                    modelo: [
                        { id: 1, nombre: 'Lenovo L24q-30' },
                        { id: 2, nombre: 'Lenovo zw543' }

                    ]
                }

            ]
        },
        {
            id: 3,
            nombre: 'Teclado',
            marca: [
                {
                    id: 1,
                    nombre: 'Dell',
                    modelo: [
                        { id: 1, nombre: 'Dell Pro Mechanical Keyboard' },
                        { id: 2, nombre: 'Dell Huntsman Elite' },
                        { id: 3, nombre: 'Dell K70 RGB MK.2' }
                    ]
                },
                {
                    id: 2,
                    nombre: 'Logitech',
                    modelo: [
                        { id: 1, nombre: 'Logigech Super Gaming Teclado 200' },
                        { id: 2, nombre: 'Logitech MX Master 3' },
                        { id: 3, nombre: 'SteelSeries Rival 650 Wireless' },
                        { id: 4, nombre: 'LogitechABC Teclado' },

                    ]
                }
            ]

        },


    ];

    const [perifericoSeleccionado, setPerifericoSeleccionado] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');

    // Función para manejar el cambio en la selección del periférico
    const handlePerifericoChange = (e) => {
        setPerifericoSeleccionado(e.target.value);
        setMarcaSeleccionada('');
        setModeloSeleccionado('');
    };

    // Función para manejar el cambio en la selección de la marca
    const handleMarcaChange = (e) => {
        setMarcaSeleccionada(e.target.value);
        setModeloSeleccionado('');
    };

    // Función para manejar el cambio en la selección del modelo
    const handleModeloChange = (e) => {
        setModeloSeleccionado(e.target.value);
    };


    return (

        <>
        <div >
        <div className="row ">
            <h2>Seleccione los periféricos</h2>
            <div className="col">
                <label>Periférico:</label>
                <br></br>
                <Form.Select 
                value={perifericoSeleccionado} 
                onChange={handlePerifericoChange}>
                    <option value="">Periférico</option>
                    {perifericos.map((periferico) => (
                        <option key={periferico.id} value={periferico.nombre}>
                            {periferico.nombre}
                        </option>
                    ))}
                </Form.Select>

                {perifericoSeleccionado && (
                    <div className="col">
                        <label>Marca:</label>
                        <br></br>
                        <Form.Select value={marcaSeleccionada} onChange={handleMarcaChange}>
                            <option value="">Marca</option>
                            {perifericos
                                .find((periferico) => periferico.nombre === perifericoSeleccionado)
                                .marca.map((marca) => (
                                    <option key={marca.id} value={marca.nombre}>
                                        {marca.nombre}
                                    </option>
                                ))}
                        </Form.Select>
                    </div>
                )}

                {marcaSeleccionada && (
                    <div className="col">
                        <label>Modelo:</label>
                        <br></br>
                        <Form.Select value={modeloSeleccionado} onChange={handleModeloChange}>
                            <option value="">Modelo</option>
                            {perifericos
                                .find((periferico) => periferico.nombre === perifericoSeleccionado)
                                .marca.find((marca) => marca.nombre === marcaSeleccionada)
                                .modelo.map((modelo) => (
                                    <option key={modelo.id} value={modelo.nombre}>
                                        {modelo.nombre}
                                    </option>
                                ))}
                        </Form.Select>
                    </div>
                )}
<ItemCount/>
                {modeloSeleccionado && (
                    <div>
                        <p>Has seleccionado el modelo: {modeloSeleccionado} de la marca {marcaSeleccionada}</p>
                    </div>
                )}
            </div>
            </div>
            </div>
        </>
    )
}