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
    
    
    const cambiarEstado = async (idProveedor) => {
        try {
            const response = await query.get(`/proveedores/cambiar-estado/${idProveedor}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const estado = response.data.idEstado;
            const nuevoEstado = estado !== 1;
            await query.put(`/proveedores/cambiar-estado/${idProveedor}/${nuevoEstado}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            // Aquí actualizamos los datos después de cambiar el estado
            const updatedData = await query.get('/proveedores', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(updatedData.data); // Actualizamos los datos en el estado
        } catch (error) {
            console.error('Error al cambiar el estado:', error);
        }
    };
    
    const AccionesBodyTemplate = ({ idProveedor }) => {
        const [estadoActivo, setEstadoActivo] = useState(false);
    
        useEffect(() => {
            const estadoMenu = async () => {
                try {
                    const response = await query.get(`/proveedores/cambiar-estado/${idProveedor}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const estado = response.data.idEstado;
                    setEstadoActivo(estado === 1);
                } catch (error) {
                    console.error('Error al obtener el estado:', error);
                }
            };
    
            estadoMenu();
        }, [idProveedor]);
    
        const handleCambiarEstado = async () => {
            await cambiarEstado(idProveedor);
            setEstadoActivo((estado) => !estado);
        };
    
        return (
            <span style={{ color: estadoActivo ? 'green' : 'red' }}>
                {estadoActivo ? 'ON' : 'OFF'}
                <button onClick={handleCambiarEstado}>Estado</button>
            </span>
        );
    };
    
    const editarBodyTemplate = (rowData) => {
        return (
            <Link to={`/inventario/registro/${rowData.idInventarioInmueble}`}>
            <img src={editIcon} alt="Editar" width="20" height="20" />
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
                    <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={15} totalRecords={data.length}  scrollable scrollHeight="200px">
                        <Column field='idInventarioInmueble' header='Cod' sortable />
                        <Column field='nombreInmueble' header='Nombre' sortable />
                        <Column field='descripcionInmueble' header='Descripción' sortable />
                        <Column field='cantidadInmueble' header='Cantidad' sortable />
                        <Column field='fechaRegistroInmueble' header='Fecha' sortable />
                        <Column field='numeroDocumento.nombreCompleto' header='usuario' sortable />
                        <Column header='ON/OFF' body={(rowData) => (
                            <AccionesBodyTemplate idProveedor={rowData.idProveedor} />
                        )} />
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
