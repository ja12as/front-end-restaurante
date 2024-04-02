import React, {useEffect, useState } from 'react';
import query  from '../api/axios.js';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'

function PaymentHistoryPage() {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [data, setData] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await query.get('/pago-usuario', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error al  obtener las ventas:', error);
            }
            };
        
        fetchData();
    }, []);

    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                Historial de pagos
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
                        <Column field='idPagoUsuario' header='Cod' sortable />
                        <Column field='fechaPago' header='AAAA-MM-DD-HORA' sortable />
                        <Column field='valorPagado' header='Valor Pagado' sortable />
                        <Column field='descripcionPago' header='Descripción' sortable />
                        <Column field='numeroDocumento.nombreCompleto' header='Cajero' sortable />
                        <Column field='idMedioPago.descripcionTipoPago' header='Tipo de Pago' sortable />
                    </DataTable>
                </div>
                <div className='boton-historia'>
                    <Link to='/pagos/realizar-pago'>
                        <div className='text-center my-3'>
                            <button className='btn-block'>
                                Registrar pago
                            </button>
                        </div>
                    </Link>
                    <Link to='/reporte-Pago'>
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



export default PaymentHistoryPage
