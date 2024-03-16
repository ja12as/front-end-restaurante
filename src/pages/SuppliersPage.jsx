/**Pantalla: Proveedores 
Lista de proveedores	 
Nombre personal 
Numero personal 
Nombre empresa 
Numero empresa 
Descripión 
Correo  */

import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import editIcon  from '../assets/editar.png';
import { InputText } from 'primereact/inputtext';
import query  from '../api/axios.js';
import '../style/Listar.css'

function SuppliersPage() {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await query.get('/proveedores', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData(); 
    }, []);

    const accionesBodyTemplate = () => {
        return (
            <Link to='/provedores/registro'>
                <img src={updateIcon} alt='Actualizar' width='20' height='20' />
            </Link>
        );
    };
    const editarBodyTemplate = (rowData) => {
        return (
            <Link to={`/menu/registro/${rowData.idMenu}`}>
                <img src={editIcon} alt='Editar' width='20' height='20' />
            </Link>
        );
    };
    
    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                    Provedores
                </div>
                <div className='form-group py-2'>
                    <div className='input-field'>
                        <InputText
                                onInput={(e) =>
                                    setFilters({
                                        global: { value: e.target.value, matchMode: 'contains' },
                                    })}
                                placeholder='Buscar Usuario'
                        />
                    </div>
                </div>
                <div className='dtable'>
                    <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                        <Column field='idProveedor' header='Cod' sortable />
                        <Column field='nombreProveedor' header='Proveedor' sortable />
                        <Column field='numeroProveedor' header='Tel Proveedor' sortable />
                        <Column field='correoProveedor' header='correo Proveedor' sortable />
                        <Column field='nombreEmpresa' header='Empresa' sortable />
                        <Column field='numeroEmpresa' header='tel Empresa' sortable />
                        <Column field='correoEmpresa' header='correo Empresa' sortable />
                        <Column field='descripcionProducto' header='Descripción' sortable />
                        <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
                        <Column field='editar' header='Editar' body={editarBodyTemplate} />
                    </DataTable>
                </div>
                <div className='bbutton-container'>
                    <Link to='/provedores/registro'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear Proeedor
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
