/**Pantalla: Inventario de inmuebles 
Lista de inmuebles 
Nombre 
Descripción  
Cantidad  */
import React, {useEffect, useState } from 'react';
import query  from '../api/axios.js';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import editIcon  from '../assets/editar.png';
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'


function RealEstateInventoriesPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await query.get('/inventario-inmueble', {
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
            <Link to='/inventario/registro'>
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
                    Inventario Inmueble
                </div>
                <div className='form-group py-2'>
                    <div className='input-field'>
                        <InputText
                                onInput={(e) =>
                                    setFilters({
                                        global: { value: e.target.value, matchMode: 'contains' },
                                    })}
                                placeholder='Buscar Inventario o Inmueble'
                        />
                    </div>
                </div>
                <div className='dtable'>
                    <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                        <Column field='idInventarioInmueble' header='Cod' sortable />
                        <Column field='nombreInmueble' header='Nombre' sortable />
                        <Column field='descripcionInmueble' header='Descripción' sortable />
                        <Column field='cantidadInmueble' header='Cantidad' sortable />
                        <Column field='fechaRegistroInmueble' header='Fecha' sortable />
                        <Column field='numeroDocumento.nombreCompleto' header='usuario' sortable />
                        <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
                        <Column field='editar' header='Editar' body={editarBodyTemplate} />
                    </DataTable>
                </div>
                <div className='bbutton-container'>
                    <Link to='/inventario/registro'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear Inventario
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

export default RealEstateInventoriesPage
