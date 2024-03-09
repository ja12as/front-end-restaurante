/**Pantalla: Proveedores 
Lista de proveedores	 
Nombre personal 
Numero personal 
Nombre empresa 
Numero empresa 
Descripión 
Correo  */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'

function SuppliersPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Datos de ejemplo para la tabla
    const data = [
        { id: 1, nombre: 'Ejemplo 1', tel: 'tel A', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 2, nombre: 'Ejemplo 2', tel: 'tel B', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 3, nombre: 'Ejemplo 3', tel: 'tel C', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 4, nombre: 'Ejemplo 4', tel: 'tel D', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 5, nombre: 'Ejemplo 5', tel: 'tel E', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 6, nombre: 'Ejemplo 6', tel: 'tel F', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com' },
        { id: 7, nombre: 'Ejemplo 7', tel: 'tel G', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 8, nombre: 'Ejemplo 8', tel: 'tel H', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 9, nombre: 'Ejemplo 9', tel: 'tel J', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 10, nombre: 'Ejemplo 10', tel: 'tel K', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 11, nombre: 'Ejemplo 11', tel: 'tel L', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 12, nombre: 'Ejemplo 12', tel: 'tel M', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 13, nombre: 'Ejemplo 13', tel: 'tel N', empresa: '123456789' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        { id: 14, nombre: 'Ejemplo 14', tel: 'tel O', empresa: '987654321' ,telEmpresa:'12345678',descripcion:'ola',correo:'provvedor@gmail.com'},
        // Agregar más objetos de datos según sea necesario
    ];
    const accionesBodyTemplate = () => {
        return (
            <Link to='/provedores/actualizar'>
                <img src={updateIcon} alt='Actualizar' width='20' height='20' />
            </Link>
        );
    };

    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                    Proveedores
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
                    <Column field='tel' header='Telefono' sortable />
                    <Column field='empresa' header='Empresa' sortable />
                    <Column field='telEmpresa' header='Tel Empresa' sortable />
                    <Column field='descripcion' header='Descripcion' sortable />
                    <Column field='correo' header='Correo' sortable />
                    <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
                </DataTable>
                <div className='bbutton-container'>
                    <Link to='/provedores/actualizar'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear proveedor
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



export default SuppliersPage
