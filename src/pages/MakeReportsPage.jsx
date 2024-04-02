
import React, { useEffect, useState } from 'react';
import query from '../api/axios.js';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf'; 
import * as XLSX from 'xlsx';
import '../style/RegisterStyle.css';


function MakeReportsPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [mediosPagos, setMediosPagos] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
    const [medioPagoSeleccionado, setMedioPagoSeleccionado] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

// Styles for the Excel sheet
const combinedHeaderStyle = {
    font: {
        bold: true,
        color: { rgb: 'FFFF00' }, // Yellow color
    },
    alignment: {
        horizontal: 'center',
    },
    border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    },
};



// Trae los usuarios para mostrarlos en el select de busqueda
useEffect(() => {
    const listarMediosPagos = async () => {
        try {
        const respuestaMedioPago = await query.get('/medios-pagos', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setMediosPagos(respuestaMedioPago.data);
        } catch (error) {
        console.error('Error:', error);
        } 
    };

    const listarPagos = async () => {
        try {
        const respuestaMedioPago = await query.get('/pago-usuario', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setMediosPagos(respuestaMedioPago.data);
        } catch (error) {
        console.error('Error:', error);
        } 
    };
    
    const listarUsuario = async () => {
        try {
        const response = await query.get('/usuarios', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setUsuarios(response.data);

        // Obtiene el nombre del usuario seleccionado
        if (usuarioSeleccionado) {
            const usuario = response.data.find(usuario => usuario.numeroDocumento === usuarioSeleccionado);
            if (usuario) {
            setNombre(usuario.nombreCompleto);
            }
        }
        } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError('Error al obtener los usuarios.');
        }
    };
    listarMediosPagos();
    listarUsuario();
    listarPagos();
}, [usuarioSeleccionado]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await query.get(`/pago-usuario?usuario=${nombre}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const pagosFiltrados = response.data.filter(pago => {
                const fechaPago = new Date(pago.fechaPago);
                return (
                    pago.usuario.nombre === nombre &&
                    Date.parse(fechaPago) >= Date.parse(fechaInicio) &&
                    Date.parse(fechaPago) <= Date.parse(fechaFinal) &&
                    (medioPagoSeleccionado === '' || pago.idMedioPago === medioPagoSeleccionado)
                );
            });
            setPagos(pagosFiltrados);
            setData(pagosFiltrados); // Actualiza también los datos filtrados para Excel y PDF
        } catch (error) {
            console.error('Error al recuperar datos:', error);
            setError('Error al recuperar datos.');
        }
    };
    fetchData();
}, [nombre, fechaInicio, fechaFinal, medioPagoSeleccionado]);

const downloadExcel = () => {
    if (data.length === 0) {
        console.error('No hay datos disponibles para exportar a Excel.');
        alert('No hay datos disponibles para exportar a Excel.');
        return;
    }
    const workbook = XLSX.utils.book_new();
    const worksheetData = data.map(pago => [
        pago.numeroDocumento.numeroDocumento,
        pago.numeroDocumento.nombreCompleto,
        pago.idMedioPago.descripcionTipoPago,
        pago.valorPagado,
        new Date(pago.fechaPago).toLocaleDateString(),
    ]);
    const header = [
        { t: 'Número de documento', s: combinedHeaderStyle },
        { t: 'Nombre completo', s: combinedHeaderStyle },
        { t: 'Tipo de pago', s: combinedHeaderStyle },
        { t: 'Valor pagado', s: combinedHeaderStyle },
        { t: 'Fecha de pago', s: combinedHeaderStyle },
    ];
    worksheetData.unshift(header);
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData, { cellStyles: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagos');
    const file = XLSX.write(workbook, { type: 'binary' });
    const blob = new Blob([s2ab(file)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pagos.xlsx';
    link.click();
};

const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
};
const exportToPDF = () => {
    if (!nombre || !fechaInicio || !fechaFinal || !medioPagoSeleccionado) {
        console.error('Todos los filtros deben estar seleccionados.');
        alert('Por favor seleccione todos los filtros.');
        return;
    }
    const doc = new jsPDF();
    doc.text('Documento', 10, 5);
    doc.text('Nombre', 50, 5);
    doc.text('Tipo de pago', 90, 5);
    doc.text('Valor pagado', 130, 5);
    doc.text('Fecha de pago', 170, 5);
    data.forEach((pago, index) => {
        const y = 15 + (index + 1) * 10;
        doc.text(pago.numeroDocumento.numeroDocumento, 10, y);
        doc.text(pago.numeroDocumento.nombreCompleto, 50, y);
        doc.text(pago.idMedioPago.descripcionTipoPago, 50, y);
        doc.text(pago.valorPagado, 90, y);
        doc.text(new Date(pago.fechaPago).toLocaleDateString(), 130, y);
        doc.text('(Actions in PDF not supported)', 170, y);
    });
    doc.save('Pago.pdf');
};

    return (
        <div className='div-padre'>
            <h1>Generar reportes de pagos</h1>
            <form className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre del empleado</label>
                        <select value={nombre} onChange={(e) => setNombre(e.target.value)} required>
                        {usuarios.map((usuario) => (
                            <option key={usuario.numeroDocumento} value={usuario.numeroDocumento}>{usuario.nombreCompleto}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Medio de pago</label>
                        <select value={medioPagoSeleccionado} onChange={(e) => setMedioPagoSeleccionado(e.target.value)} required>
                        <option value="">Todos</option>
                        {mediosPagos.map(tipo => (
                            <option key={tipo.idMedioPago} value={tipo.idMedioPago}>{tipo.descripcionTipoPago}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Fecha de inicio del reporte*</label>
                        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label>Fecha final del reporte*</label>
                        <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} required />
                    </div>
                </div>
                <div className="botones">
                    <button type='button' className='boton 1' onClick={downloadExcel}>Generar Excel</button>
                    <button type='button' className='boton 1' onClick={exportToPDF}>Generar PDF</button>
                    <Link to={'/pagos/historial-pago'}>
                        <div className="img-medio-admin">
                            <button type='button' className='boton 2'>Salir</button>
                        </div>
                    </Link>
                </div>
            </form>
        </div>
    );
    
};

export default MakeReportsPage
