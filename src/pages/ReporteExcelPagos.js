import React, { useState, useEffect } from 'react';
import query from '../api/axios.js';
import * as XLSX from 'xlsx';

function ReporteExcelPagos() {
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
                console.error('Error al recuperar datos:', error);
            }
        };
        
        fetchData();
    }, []);
    



    const downloadExcel = () => {
        if (data.length === 0) {
        console.error('No hay datos para exportar a Excel.');
        return;
        }

        const workbook = XLSX.utils.book_new();

        // Extrae los datos relevantes de cada pago
        const worksheetData = data.map(pago => [
        pago.numeroDocumento.numeroDocumento,
        pago.numeroDocumento.nombreCompleto,
        pago.valorPagado,
        new Date(pago.fechaPago).toLocaleDateString(), // Formatear la fecha correctamente
        // ... incluye otras propiedades deseadas
        ]);

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagos');

        // Genera el archivo binario del Excel
        const file = XLSX.write(workbook, { type: 'binary' });
        const blob = new Blob([s2ab(file)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'pagos.xlsx';
        link.click();
    };

    // Convierte el contenido de la cadena en una matriz de bytes
    const s2ab = s => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    };

    return (
        <div>
        <button onClick={downloadExcel}>Descargar Excel</button>
        </div>
    );
}

export default ReporteExcelPagos;