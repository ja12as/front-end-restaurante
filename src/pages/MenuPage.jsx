/**Pantalla: Menú 
Lista de productos 
Nombre 
Categoría 
Descripción  
Precio  */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css';


function MenuPage() {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Datos de ejemplo para la tabla
    const data = [
        { id: 1, nombre: 'Ejemplo 1', categoria:'A', descripcion: 'descripcion A', precio: '123456789' },
        { id: 2, nombre: 'Ejemplo 2', categoria:'A', descripcion: 'descripcion B', precio: '987654321' },
        { id: 3, nombre: 'Ejemplo 3', categoria:'A', descripcion: 'descripcion C', precio: '123456789' },
        { id: 4, nombre: 'Ejemplo 4', categoria:'A', descripcion: 'descripcion D', precio: '987654321' },
        { id: 5, nombre: 'Ejemplo 5', categoria:'A', descripcion: 'descripcion E', precio: '123456789' },
        { id: 6, nombre: 'Ejemplo 6', categoria:'A', descripcion: 'descripcion F', precio: '987654321' },
        { id: 7, nombre: 'Ejemplo 7', categoria:'A', descripcion: 'descripcion G', precio: '123456789' },
        { id: 8, nombre: 'Ejemplo 8', categoria:'A', descripcion: 'descripcion H', precio: '987654321' },
        { id: 9, nombre: 'Ejemplo 9', categoria:'A', descripcion: 'descripcion J', precio: '123456789' },
        { id: 10, nombre: 'Ejemplo 10', categoria:'A', descripcion: 'descripcion K', precio: '987654321' },
        { id: 11, nombre: 'Ejemplo 11', categoria:'A', descripcion: 'descripcion L', precio: '123456789' },
        { id: 12, nombre: 'Ejemplo 12', categoria:'A', descripcion: 'descripcion M', precio: '987654321' },
        { id: 13, nombre: 'Ejemplo 13', categoria:'A', descripcion: 'descripcion N', precio: '123456789' },
        { id: 14, nombre: 'Ejemplo 14', categoria:'A', descripcion: 'descripcion O', precio: '987654321' },
        // Agregar más objetos de datos según sea necesario
    ];
    const accionesBodyTemplate = () => {
        return (
            <Link to='/menu/actualizar-menu'>
                <img src={updateIcon} alt='Actualizar' width='20' height='20' />
            </Link>
        );
    };

    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                    Menus
                </div>
                <div className='form-group py-2'>
                    <div className='input-field'>
                        <InputText
                                onInput={(e) =>
                                    setFilters({
                                        global: { value: e.target.value, matchMode: 'contains' },
                                    })}
                                placeholder='Buscar Menu'
                        />
                    </div>
                </div>
                <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                    <Column field='id' header='Cod' sortable />
                    <Column field='nombre' header='Nombre' sortable />
                    <Column field='categoria' header='Categoria' sortable />
                    <Column field='descripcion' header='Descripcion' sortable />
                    <Column field='precio' header='Precio' sortable />
                    <Column field='accion' header='Accion' body={accionesBodyTemplate} />
                </DataTable>
                <div className='bbutton-container'>
                    <Link to='/menu/actualizar-menu'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear Menu
                            </button>
                        </div>
                    </Link>
                    <Link to='/home-admin'>
                        <div className='text-center'>
                            <button className='btn'>
                                salir
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

    

export default MenuPage
