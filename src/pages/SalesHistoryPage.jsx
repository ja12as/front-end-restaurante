/**
Pantalla: Historial de ventas 
Dia, fecha, mes  
Hora 
Valor total de la venta 
Medio de pago 
Quien la realizo 
Cantidad de productos vendidos 
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
    { id: 1, nombre: 'Ejemplo 1', descripcion: 'descripcion A', cantidad: '123456789' },
    { id: 2, nombre: 'Ejemplo 2', descripcion: 'descripcion B', cantidad: '987654321' },
    { id: 3, nombre: 'Ejemplo 3', descripcion: 'descripcion C', cantidad: '123456789' },
    { id: 4, nombre: 'Ejemplo 4', descripcion: 'descripcion D', cantidad: '987654321' },
    { id: 5, nombre: 'Ejemplo 5', descripcion: 'descripcion E', cantidad: '123456789' },
    { id: 6, nombre: 'Ejemplo 6', descripcion: 'descripcion F', cantidad: '987654321' },
    { id: 7, nombre: 'Ejemplo 7', descripcion: 'descripcion G', cantidad: '123456789' },
    { id: 8, nombre: 'Ejemplo 8', descripcion: 'descripcion H', cantidad: '987654321' },
    { id: 9, nombre: 'Ejemplo 9', descripcion: 'descripcion J', cantidad: '123456789' },
    { id: 10, nombre: 'Ejemplo 10', descripcion: 'descripcion K', cantidad: '987654321' },
    { id: 11, nombre: 'Ejemplo 11', descripcion: 'descripcion L', cantidad: '123456789' },
    { id: 12, nombre: 'Ejemplo 12', descripcion: 'descripcion M', cantidad: '987654321' },
    { id: 13, nombre: 'Ejemplo 13', descripcion: 'descripcion N', cantidad: '123456789' },
    { id: 14, nombre: 'Ejemplo 14', descripcion: 'descripcion O', cantidad: '987654321' },
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
                Inventarios inmuebles
            </div>
            <div className='form-group py-2'>
                <div className='input-field'>
                    <InputText
                            onInput={(e) =>
                                setFilters({
                                    global: { value: e.target.value, matchMode: 'contains' },
                                })}
                            placeholder='Buscar proveedores'
                    />
                </div>
            </div>
            <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                <Column field='id' header='Identificacion' sortable />
                <Column field='nombre' header='Nombre' sortable />
                <Column field='descripcion' header='Descripcion' sortable />
                <Column field='cantidad' header='cantidad' sortable />
                <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
            </DataTable>
                <div className='botbutton-containeron'>
                    <Link to='/inventario/actualizar'>
                        <div className='text-center'>
                            <button className='btn btn-block'>
                                Crear Inventario
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
