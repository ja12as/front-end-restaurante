/**
Pantalla: Historial de ventas 
Dia, fecha, mes  
Hora 
Valor total de la venta 
Medio de pago 
Quien la realizo 
valorTotalpa de productos vendidos 
  */

import React, {useEffect, useState } from 'react';
import query  from '../api/axios.js';
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
    const [data, setData] = useState([]);

    useEffect(() => {
        query.get('/usuarios')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    

    const accionesBodyTemplate = () => {
        return (
            <Link to='/pagos/realizar-pago'>
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
                                placeholder='Buscar venta'
                        />
                    </div>
                </div>
                <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                    <Column field='numeroDocumento' header='Identificacion' sortable />
                    <Column field='nombreCompleto' header='Nombre' sortable />
                    <Column field='idTipoDocumento.tipoDocumento' header='T Documento' sortable />
                    <Column field='telefono' header='Telefono' sortable />
                    <Column field='direccion' header='Direccion' sortable />
                    <Column field='correo' header='Correo' sortable />
                    <Column field='rolUsuario.rolUsuario' header='Rol' sortable />
                    <Column field='acciones' header='Acciones' body={accionesBodyTemplate} />
                </DataTable>
                <div className='boton-historia'>
                    <Link to='/pagos/realizar-pago'>
                        <div className='text-center my-3'>
                            <button className='btn-block'>
                                Registrar pago
                            </button>
                        </div>
                    </Link>
                    <Link to='/reporte'>
                        <div className='text-center my-3'>
                            <button className='btn-block'>
                                Generar Reporte
                            </button>
                        </div>
                    </Link>
                    <Link to='/pagos'>
                        <div className='text-center my-3'>
                            <button className='btn-block'>
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
