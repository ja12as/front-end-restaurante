
import React, {useEffect, useState } from 'react';
import query  from '../api/axios.js';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import editIcon  from '../assets/editar.png';
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'

function AccountsPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await query.get('/usuarios', {
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
            const response = await query.get(`/usuarios/cambiar-estado/${idProveedor}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const estado = response.data.idEstado;
            const nuevoEstado = estado !== 1;
            await query.put(`/usuarios/cambiar-estado/${idProveedor}/${nuevoEstado}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            // Aquí actualizamos los datos después de cambiar el estado
            const updatedData = await query.get('/usuarios', {
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
                    const response = await query.get(`/usuarios/cambiar-estado/${idProveedor}`, {
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
            <Link to={`/cuentas/registro/${rowData.numeroDocumento}`}>
                <img src={editIcon} alt='Editar' width='20' height='20' />
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
                                placeholder='Buscar Usuario'
                        />
                    </div>
                </div>
                <div className='dtable'>
                    <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={15} totalRecords={data.length} scrollable scrollHeight="200px">
                        <Column field='numeroDocumento' header='Identificacion' sortable />
                        <Column field='nombreCompleto' header='Nombre' sortable />
                        <Column field='idTipoDocumento.tipoDocumento' header='T Documento' sortable />
                        <Column field='telefono' header='Telefono' sortable />
                        <Column field='direccion' header='Direccion' sortable />
                        <Column field='correo' header='Correo' sortable />
                        <Column field='rolUsuario.rolUsuario' header='Rol' sortable />
                        <Column header='ON/OFF' body={(rowData) => (
                            <AccionesBodyTemplate idProveedor={rowData.idProveedor} />
                        )} />
                        <Column field='editar' header='Editar' body={editarBodyTemplate} />
                    </DataTable>
                </div>
                <div className='bbutton-container'>
                    <Link to='/cuentas/registro'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear Usuario
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

export default AccountsPage
