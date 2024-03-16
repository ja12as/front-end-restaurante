
import React, {useEffect, useState } from 'react';
import query  from '../api/axios.js';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'
function SaleDetailPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [data, setData] = useState([]);
    useEffect(() => {
        query.get('/venta')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    


    return (
        <div className='container'>
            <div className='wrapper bg-white' style={{ maxWidth: "1300px" }}>
                <div className='h2 text-center'>
                Detalle de ventas 
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
                    <Column field='idVentaDetalle' header='Cod' sortable />
                    <Column field='cantidadMenu' header='Cantidad de unidades' sortable />
                    <Column field='idMenu' header='menu' sortable />
                    <Column field='idVenta' header='Cod Venta ' sortable />
                    <Column field='valorRecibido' header='Valor Rec' sortable />
                </DataTable>
                <div className='bbutton-container'>
                    <Link to='/home-venta/registrar-venta'>
                        <div className='text-center'>
                            <button className='btn'>
                                Crear Venta
                            </button>
                        </div>
                    </Link>
                    <Link to='/home-venta'>
                        <div className='text-center'>
                            <button className='btn'>
                                salir
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
};
export default SaleDetailPage
