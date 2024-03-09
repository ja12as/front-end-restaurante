/**Historial de pagos 
Dia, fecha, mes  
Hora 
Valor pagado 
Observación 
Medio de pago 
A quien se le pago  */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { FilterMatchMode } from 'primereact/api';
import updateIcon from '../assets/menu.png'; 
import { InputText } from 'primereact/inputtext';
import '../style/Listar.css'
function PaymentHistoryPage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Datos de ejemplo para la tabla
    const data = [
        { id: 1, fecha: '22/02/2023', hora: 'hora A', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 2, fecha: '23/02/2023', hora: 'hora B', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 3, fecha: '24/02/2023', hora: 'hora C', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 4, fecha: '25/02/2023', hora: 'hora D', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 5, fecha: '26/02/2023', hora: 'hora E', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 6, fecha: '27/02/2023', hora: 'hora F', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 7, fecha: '28/02/2023', hora: 'hora G', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 8, fecha: '29/02/2023', hora: 'hora H', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 9, fecha: '30/02/2023', hora: 'hora J', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 10, fecha: '31/02/2023', hora: 'hora K', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 11, fecha: '01/02/2023', hora: 'hora L', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 12, fecha: '02/02/2023', hora: 'hora M', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 13, fecha: '03/02/2023', hora: 'hora N', valorP: '123456789' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        { id: 14, fecha: '04/02/2023', hora: 'hora O', valorP: '987654321' ,observacion:'snadra ',medioPago:'efectivo',user:'yo'},
        // Agregar más objetos de datos según sea necesario
    ];
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
                    Historial de pago por ADMIN 
                </div>
                <div className='form-group py-2'>
                    <div className='input-field'>
                        <InputText
                                onInput={(e) =>
                                    setFilters({
                                        global: { value: e.target.value, matchMode: 'contains' },
                                    })}
                                placeholder='Buscar Pagos'
                        />
                    </div>
                </div>
                <DataTable value={data} sortMode='multiple' filters={filters} paginator rows={10} totalRecords={data.length}>
                    <Column field='fecha' header='DD/MM/AAAA' sortable />
                    <Column field='hora' header='Hora' sortable />
                    <Column field='valorP' header='Valor Pagado' sortable />
                    <Column field='observacion' header='Observacion' sortable />
                    <Column field='medioPago' header='Medio de Pago' sortable />
                    <Column field='user' header='Usuario' sortable />
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



export default PaymentHistoryPage
