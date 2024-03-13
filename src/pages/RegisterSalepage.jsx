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
import query  from '../api/axios.js';


function RegisterSalepage() {
    const [filters, setFilters] = useState({});

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [efectivo, setEfectivo] = useState(0);
    const [formaPago, setFormaPago] = useState([]);

    useEffect(() => {
        query.post('https://mi-api.com/productos', {
            // Aquí puedes incluir los datos que necesitas enviar con la solicitud POST
        })
        .then(response => setData(response.data))
        .catch(error => console.error(error));

        query.get('https://mi-api.com/formaPago')
        .then(response => setFormaPago(response.data))
        .catch(error => console.error(error));
    }, []);

    const handleCantidadChange = (index, cantidad) => {
        const newData = [...data];
        newData[index].cantidad = cantidad;
        newData[index].subtotal = newData[index].precioUnitario * cantidad;
        setData(newData);
        setTotal(newData.reduce((total, producto) => total + producto.subtotal, 0));
    };

    const handleEfectivoChange = (efectivo) => {
        setEfectivo(efectivo);
    };

    const handleFilterChange = (e) => {
        query.get(`https://mi-api.com/filtro?query=${e.target.value}`)
            .then(response => {
                setFilters({
                    global: { value: response.data, matchMode: 'contains' },
                });
            })
            .catch(error => console.error(error));
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
                            <DataTable value={data} sortMode='multiple' paginator rows={10} totalRecords={data.length}>
                                <Column field='id' header='Cod' sortable />
                                <Column field='nombre' header='Descripcion' sortable />
                                <Column field='cantidad' header='Cantidad' sortable editor={(props) => <input type='number' value={props.rowData.cantidad} onChange={(e) => handleCantidadChange(props.rowIndex, e.target.value)} />} />
                                <Column field='precioUnitario' header='Precio U' sortable />
                                <Column field='subtotal' header='Sub Total' sortable />
                            </DataTable>
                        </div>
                        <div className='input-4'>
                            <div className='inputs'>
                                <label>Valor Total</label>
                                <input type='number' value={total} readOnly />
                            </div>
                            <div className='inputs'>
                                <label>Forma de Pago</label>
                                <select>
                                    {formaPago.map((opcion, index) => <option key={index} value={opcion}>{opcion}</option>)}
                                </select>
                            </div>
                            <div className='inputs'>
                                <label>Efectivo $</label>
                                <input type='number' onChange={(e) => handleEfectivoChange(e.target.value)} />
                            </div>
                            <div className='inputs'>
                                <label>Cambio</label>
                                <input type='number' value={efectivo - total} readOnly />
                            </div>
                        </div>
                    </div>
                        <div className='input-total'>
                            <label>Total</label>
                            <input type='number' value={total} readOnly />
                        </div>
                    <div className='botton'>
                        <botton type='submit' className='btn-venta'>Generar  Venta</botton>
                        <Link to='/home-admin'>
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
}

export default RegisterSalepage
