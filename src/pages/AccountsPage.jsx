/*pagina de cuentas--
Lista de cuentas 
Nombre completo  
Tipo de documento 
Numero de documento 
Teléfono 
Dirección 
Correo 
Contraseña 
Rol 
Foto */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'

function AccountsPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Datos de ejemplo para la tabla
    const data = [
        { id: 1, nombre: 'ana 1', tDocumento: 'tDocumento A', nDocumento: '123456789', telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 2, nombre: 'ana 2', tDocumento: 'tDocumento B', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 3, nombre: 'yordan 3', tDocumento: 'tDocumento C', nDocumento: '123456789', telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user' },
        { id: 4, nombre: 'el 4', tDocumento: 'tDocumento D', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 5, nombre: 'tu 5', tDocumento: 'tDocumento E', nDocumento: '123456789' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 6, nombre: 'yo 6', tDocumento: 'tDocumento F', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 7, nombre: 'aja 7', tDocumento: 'tDocumento G', nDocumento: '123456789', telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user' },
        { id: 8, nombre: 'aju 8', tDocumento: 'tDocumento H', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 9, nombre: 'uy 9', tDocumento: 'tDocumento J', nDocumento: '123456789' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 10, nombre: 'chimba 10', tDocumento: 'tDocumento K', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 11, nombre: 'eee 11', tDocumento: 'tDocumento L', nDocumento: '123456789', telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user' },
        { id: 12, nombre: 'parche 12', tDocumento: 'tDocumento M', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 13, nombre: 'marta 13', tDocumento: 'tDocumento N', nDocumento: '123456789' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        { id: 14, nombre: 'Ejemplo 14', tDocumento: 'tDocumento O', nDocumento: '987654321' , telefono:'098765432',direccion:'cll 43-#54',correo:'yo@gmail.com', rol:'user'},
        // Agregar más objetos de datos según sea necesario
    ];
    const accionesBodyTemplate = () => {
        return (
            <Link to='/cuentas/id'>
                <img src={updateIcon} alt='Actualizar' width='20' height='20' />
            </Link>
        );
    };

    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                    Cuentas
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
                    <Column field='tDocumento' header='T Documento' sortable />
                    <Column field='nDocumento' header='N documento' sortable />
                    <Column field='telefono' header='Telefono' sortable />
                    <Column field='direccion' header='Direccion' sortable />
                    <Column field='correo' header='Correo' sortable />
                    <Column field='rol' header='cantiRoldad' sortable />
                    <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
                </DataTable>
                <div className='button-container'>
                    <Link to='/cuentas/id'>
                        <div className='text-center'>
                            <button className='btn btn-block'>
                                Crear Usuario
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


export default AccountsPage
