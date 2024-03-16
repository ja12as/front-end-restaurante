/**Pantalla: Registrar venta 
Nombre del producto 
Cantidad 
Precio 
Valor total 
Medio de pago 
Ingresar dinero dado 
Cambio  */

import '../style/venta.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import updateIcon from '../assets/eliminar.png'; 
import query  from '../api/axios.js';


function RegisterSalepage() {
    const [filters, setFilters] = useState([]);

    const [venta, setVenta] = useState([]);
    const [total, setTotal] = useState(0);
    const [efectivo, setEfectivo] = useState(0);
    const [formaPago, setFormaPago] = useState([]);


    useEffect(()=>{
        //Api get para traer los tipos de pago
        const listarFormaPago = async() => {
            try {
                const respuestaMedioPago = await query.get('/medios-pagos');
                setFormaPago(respuestaMedioPago.data);
            } catch (error) {
                console.error('error al obtener los tipos de pagos')
            }
        };
        listarFormaPago();
    },[]);

    const handleCantidadChange = (index, cantidad) => {
        const newData = [...venta];
        newData[index].cantidad = cantidad;
        newData[index].subtotal = newData[index].precioUnitario * cantidad;
        setVenta(newData.sort((a, b) => b.subtotal - a.subtotal)); // Ordena los productos por subtotal
        setTotal(newData.reduce((total, producto) => total + producto.subtotal, 0));
    };

    const handleDelete = (index) => {
        const newData = [...venta];
        newData.splice(index, 1);
        setVenta(newData);
    };

    const handleEfectivoChange = (efectivo) => {
        setEfectivo(efectivo);
    };
    //cuando el cajero busque un producto por su ID o nombre, este se agregue 
    //automáticamente a la tabla con una cantidad por defecto de 1
    const agregarProducto = (producto) => {
        setVenta(prevVenta => [
            ...prevVenta,
            {
                ...producto,
                cantidad: 1,
                subtotal: producto.precioUnitario
            }
        ]);
    };
    

    // filtardor de menu
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const handleFilterChange = (e) => {
        query.get(`/menu/${e.target.value}`)
        .then(response => {
            setProductosFiltrados(response.data);
            if (response.data.length === 1) {
                agregarProducto(response.data[0]);
            }
        })
            .catch(error => {
                console.error('Ocurrió un error:', error);
                if (error.response) {
                    // El servidor respondió con un estado fuera del rango de 2xx
                    console.error('Datos de la respuesta:', error.response.data);
                    console.error('Estado de la respuesta:', error.response.status);
                    console.error('Encabezados de la respuesta:', error.response.headers);
                } else if (error.request) {
                    // La solicitud se hizo pero no se recibió ninguna respuesta
                    console.error('Solicitud:', error.request);
                } else {
                    // Algo sucedió en la configuración de la solicitud que provocó un error
                    console.error('Error:', error.message);
                }
                console.error('Configuración de la solicitud:', error.config);
            });
        }


    const onRowClick = (producto) => {
        agregarProducto(producto);
    };
    
    // boton de eliminar producto de la venta
    const accionesBodyTemplate = (rowData, column) => {
    return (
        <button onClick={() => handleDelete(column.rowIndex)}>
            Eliminar
        </button>
    );
    };
    /*el campo de efectivo se llene automáticamente con el valor total cuando la forma de pago es por transferencia, y que el cajero no pueda editarlo*/ 
    /**el campo de cambio quede vacío en este caso. Pero si la forma de pago es en efectivo, el cajero debe poder ingresar el valor recibido manualmente y el cambio se calcula automáticamente. */
    const [formaPagoSeleccionada, setFormaPagoSeleccionada] = useState('');
    const handleFormaPagoChange = (e) => {
        const formaPago = e.target.value;
            setFormaPagoSeleccionada(formaPago);
            if (formaPago === 'Transferencia') {
                setEfectivo(total);
            } else {
                setEfectivo(0);
            }
    };

    // genera u id de 4 numero
    const generarIdVenta = () => {
        const prefijo = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
        const sufijo = Date.now(); // Obtiene la hora actual en milisegundos desde la medianoche del 1 de enero de 1970
        return `${prefijo}${sufijo}`;
    };

    const [tokenCajero, setTokenCajero] = useState(null);

    // Cuando el cajero se logea obtiene el token y con el token se genera la venta a nombre del cajero
    const handleLogin = async (credencialesCajero) => {
        const respuesta = await query.post('/login', credencialesCajero);
        setTokenCajero(respuesta.data.token);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
    
        const registroVentas = {
            idVenta: generarIdVenta(), // Aquí debes poner el ID de la venta
            fechaVenta: new Date().toISOString(), // Esto pondrá la fecha y hora actual en formato ISO
            cantidadVenta: venta.reduce((total, producto) => total + producto.cantidad, 0), // Esto sumará las cantidades de todos los productos
            venta: venta, // Esto pondrá la lista de productos en la venta
            numeroDocumento: tokenCajero, // Aquí debes poner el número de documento
            precioTotal: total, // Esto pondrá el total de la venta
            valorRecibido: efectivo, // Esto pondrá el valor recibido
            valorCambio: efectivo - total, // Esto calculará el cambio
            idMedioPago: formaPagoSeleccionada, // Esto pondrá el ID del medio de pago seleccionado
        };
    
        query.post('/ventas', registroVentas)
            .then(response => {
                console.log('Venta registrada con éxito:', response.data);
                // Aquí puedes manejar lo que sucede después de que la venta se registra con éxito
            })
            .catch(error => {
                console.error('Error al registrar la venta:', error);
            });
    };
    

    return (
        <div className='container'>
            <div className='subcontainer'>
                <div className='title-filter'>
                    <div className='title'>
                        <h1>Registro de venta</h1>
                    </div>
                    <div className='filter'>
                        <div className='input-field'>
                            <InputText
                            onInput={handleFilterChange}
                            placeholder='Buscar Menu'
                            />
                        </div>
                    </div>
                </div>
                <div className='registro-venta'>
                    <div className='vista-venta'>
                        <div className='datatable'>
                            <DataTable value={productosFiltrados} onRowClick={onRowClick} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={venta.length} scrollable scrollHeight="400px">
                                <Column field='idMenu' header='Cod' sortable />
                                <Column field='nombreMenu' header='Descripcion' sortable />
                                <Column field='cantidad' header='Cantidad' sortable editor={(props) => (
                                    <div>
                                        <button onClick={() => handleCantidadChange(props.rowIndex, props.rowData.cantidad - 1)}>-</button>
                                        <input type='number' value={props.rowData.cantidad} onChange={(e) => handleCantidadChange(props.rowIndex, e.target.value)} />
                                        <button onClick={() => handleCantidadChange(props.rowIndex, props.rowData.cantidad + 1)}>+</button>
                                    </div> )} 
                                />
                                <Column field='precioMenu' header='Precio U' sortable />
                                <Column field='subtotal' header='Sub Total' sortable />
                                <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />                            
                            </DataTable>
                        </div>
                        <div className='input-4'>
                            <div className='inputs'>
                                <label>Valor Total</label>
                                <input type='number' value={total} readOnly />
                            </div>
                            <div className='inputs'>
                                <label>Forma de Pago</label>
                                <select onChange={handleFormaPagoChange}>
                                    {formaPago.map((opcion, index) => <option key={index} value={opcion.idMedioPago}>{opcion.descripcionTipoPago}</option>)}
                                </select>
                            </div>
                            <div className='inputs'>
                                <label>Efectivo $</label>
                                <input type='number' value={efectivo} readOnly={formaPagoSeleccionada === 'Transferencia'} onChange={(e) => handleEfectivoChange(e.target.value)} />
                            </div>
                            <div className='inputs'>
                                <label>Cambio</label>
                                <input type='number' value={formaPagoSeleccionada === 'Transferencia' ? '' : efectivo - total} readOnly />
                            </div>
                        </div>
                    </div>
                        <div className='input-total'>
                            <label>Total</label>
                            <input type='number' value={total} readOnly />
                        </div>
                    <div className='botton'>
                        <botton type='submit' className='btn-venta' onClick={handleSubmit}>Generar Venta</botton>
                        <Link to='/home-venta'>
                            <div className='btn-venta'>
                                <button>
                                    salir
                                </button>
                            </div> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RegisterSalepage
