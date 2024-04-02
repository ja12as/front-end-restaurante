import React, { useState, useEffect } from 'react';
import query from 'axios'; // Asegúrate de importar axios correctamente
import XLSX from 'xlsx'; // Asegúrate de importar xlsx correctamente

function ReporteExcelPagos() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [data, setData] = useState([]);

    // Trae los usuarios para mostrarlos en el select de busqueda
    useEffect(() => {
        query.get('/usuarios')
        .then(response => {
            setUsuarios(response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la petición GET:', error);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Asegúrate de cambiar la URL y los parámetros según sea necesario
                const response = await query.get(`/pago-usuario?usuario=${nombre}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`, {
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
    }, [nombre, fechaInicio, fechaFinal]); // Asegúrate de que fetchData se ejecuta cada vez que cambian estos valores

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