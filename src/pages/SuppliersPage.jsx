import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import editIcon from '../assets/editar.png';
import { InputText } from 'primereact/inputtext';
import query from '../api/axios.js';
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
            <Link to={`/provedores/registro/${rowData.idProveedor}`}>
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
                    <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={15} totalRecords={data.length} scrollable scrollHeight="200px">
                        <Column field='idProveedor' header='Cod' sortable />
                        <Column field='nombreProveedor' header='Proveedor' sortable />
                        <Column field='numeroProveedor' header='Tel Proveedor' sortable />
                        <Column field='correoProveedor' header='correo Proveedor' sortable />
                        <Column field='nombreEmpresa' header='Empresa' sortable />
                        <Column field='numeroEmpresa' header='tel Empresa' sortable />
                        <Column field='correoEmpresa' header='correo Empresa' sortable />
                        <Column field='descripcionProducto' header='Descripción' sortable />
                        <Column header='ON/OFF' body={(rowData) => (
                            <AccionesBodyTemplate idProveedor={rowData.idProveedor} />
                        )} />
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

export default SuppliersPage;
