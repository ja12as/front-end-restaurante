/**
Pantalla: Historial de ventas 
Dia, fecha, mes  
Hora 
Valor total de la venta 
Medio de pago 
Quien la realizo 
valorTotalpa de productos vendidos 
  */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'

function SalesHistoryPage() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Datos de ejemplo para la tabla
const data = [
    { id: 1, fecha: 'Ejemplo 1', hora: 'hora A', valorTotalpa: '123456789',tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 2, fecha: 'Ejemplo 2', hora: 'hora B', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 3, fecha: 'Ejemplo 3', hora: 'hora C', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 4, fecha: 'Ejemplo 4', hora: 'hora D', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 5, fecha: 'Ejemplo 5', hora: 'hora E', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 6, fecha: 'Ejemplo 6', hora: 'hora F', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 7, fecha: 'Ejemplo 7', hora: 'hora G', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 8, fecha: 'Ejemplo 8', hora: 'hora H', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 9, fecha: 'Ejemplo 9', hora: 'hora J', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 10, fecha: 'Ejemplo 10', hora: 'hora K', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 11, fecha: 'Ejemplo 11', hora: 'hora L', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 12, fecha: 'Ejemplo 12', hora: 'hora M', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 13, fecha: 'Ejemplo 13', hora: 'hora N', valorTotalpa: '123456789' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    { id: 14, fecha: 'Ejemplo 14', hora: 'hora O', valorTotalpa: '987654321' ,tPago:'efectivo',cajero:'2', cantidadProduct:'34'},
    // Agregar más objetos de datos según sea necesario
];
const accionesBodyTemplate = () => {
    return (
        <Link to='/inventario/actualizar'>
            <img src={updateIcon} alt='Actualizar' width='20' height='20' />
        </Link>
    );
};

return (
    <div className='container'>
        <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
            <div className='h2 text-center'>
                Historial de ventas 
            </div>
            <div className='form-group py-2'>
                <div className='input-field'>
                    <InputText
                            onInput={(e) =>
                                setFilters({
                                    global: { value: e.target.value, matchMode: 'contains' },
                                })}
                            placeholder='Buscar Ventas'
                    />
                </div>
            </div>
            <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                <Column field='id' header='Identificacion' sortable />
                <Column field='fecha' header='DD/MM/AAAA' sortable />
                <Column field='hora' header='Hora' sortable />
                <Column field='valorTotalpa' header='Valor total' sortable />
                <Column field='tPago' header='Tipo Pago' sortable />
                <Column field='cajero' header='Cajero' sortable />
                <Column field='cantidadProduct' header='Total producto' sortable />
                <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
            </DataTable>
                <div className='botbutton-containeron'>
                    <Link to='/registrar-venta'>
                        <div className='text-center'>
                            <button className='btn btn-block'>
                                Registrar Venta
                            </button>
                        </div>
                    </Link>
                    <Link to='/home-admin'>
                        <div className='text-center'>
                            <button className='btn btn-block'>
                                salir
                            </button>
                        </div>
                    </Link>
                </div>
        </div>
    </div>
);
};



export default SalesHistoryPage
