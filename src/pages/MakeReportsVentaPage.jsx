import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import jsPDF from 'jspdf';

import '../style/RegisterStyle.css';

function MakeReportsVentaPage() {
    const [mediosPagos, setMediosPagos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mediosPagosData, usuariosData] = await Promise.all([
                    axios.get('/medios-pagos', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                    axios.get('/usuarios', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                ]);

                setMediosPagos([
                    { id: 0, nombre: 'Todos' },
                    ...mediosPagosData.data,
                ]);
                setUsuarios([
                    { id: 0, nombre: 'Todos' },
                    ...usuariosData.data,
                ]);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                // Manejo de errores
            }
        };
        fetchData();
    }, []);

    const getPagos = async (tipoPago, usuario, fechaInicial, fechaFinal) => {
        try {
            const response = await axios.get('/pagos', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    tipoPago,
                    usuario,
                    fechaInicial,
                    fechaFinal,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            return []; // Manejo de errores, puedes devolver un array vacío o lanzar una excepción
        }
    };

    const onSubmit = async (data) => {
        // Validación adicional
        if (data.fechaInicial > data.fechaFinal) {
            alert('La fecha inicial no puede ser mayor a la final.');
            return;
        }

        // Obtener pagos filtrados
        const filtros = {
            tipoPago: data.tipoPago || null,
            usuario: data.usuario || null,
            fechaInicial: data.fechaInicial,
            fechaFinal: data.fechaFinal,
        };
        const pagosFiltrados = await getPagos(filtros.tipoPago, filtros.usuario, filtros.fechaInicial, filtros.fechaFinal);

        // Generar PDF y Excel
        generatePDF(filtros, pagosFiltrados);
        //generateExcel(filtros, pagosFiltrados); // Si no necesitas generar Excel, puedes comentar esta línea
    };

    const generatePDF = (filtros, pagos) => {
        const { fechaInicial, fechaFinal } = filtros;

        // Generar contenido de la primera página
        const header = {
            logo: 'https://www.tuempresa.com/logo.png',
            titulo: 'Reporte de ventas',
            fechas: `Desde ${fechaInicial} hasta ${fechaFinal}`,
        };

        const pdf = new jsPDF();
        let yPos = 10;

        pdf.addImage(header.logo, 'PNG', 10, yPos, 50, 50);
        yPos += 60;
        pdf.text(header.titulo, 10, yPos);
        yPos += 10;
        pdf.text(header.fechas, 10, yPos);

        // Agregar tabla de datos
        const columns = ['Fecha', 'Usuario', 'Tipo de pago', 'Monto'];
        const rows = pagos.map(pago => [pago.fecha, pago.usuario.nombre, pago.tipoPago.nombre, pago.monto]);
        pdf.autoTable({
            startY: yPos + 20,
            head: [columns],
            body: rows,
        });

        pdf.save('reporte-ventas.pdf');
    };


    // const generateExcel = async (filtros, pagos) => {
    //     const { tipoPago, usuario, fechaInicial, fechaFinal } = filtros;
    //     // Generar contenido de la hoja de cálculo
    //     const data = [
    //         ['Reporte de ventas'],
    //         [`Desde ${fechaInicial} hasta ${fechaFinal}`],
    //         ['Tu empresa'],
    //         [pagos.length === 0 ? 'Todos' : pagos[0].usuario.nombre],
    //         [pagos.length === 0 ? 'Todos' : pagos[0].tipoPago.nombre],
    //         ['Fecha', 'Usuario', 'Tipo de pago', 'Monto'],
    //         ...pagos.map((pago) => [pago.fecha, pago.usuario.nombre, pago.tipoPago.nombre, pago.monto]),
    //     ];
        
    //     const worksheet = XLSX.utils.aoa_to_sheet(data);
    //     const workbook = XLSX.utils.book_new();
        
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
        
    //     // Descargar el archivo Excel
    //     XLSX.writeFile(workbook, 'reporte-ventas.xlsx');
    // };
    
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="tipoPago">Tipo de pago:</label>
            <select name="tipoPago" ref={register}>
                <option value="">Todos</option>
                {mediosPagos.map((medioPago) => (
                    <option key={medioPago.id} value={medioPago.id}>
                        {medioPago.nombre}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="usuario">Usuario:</label>
            <select name="usuario" ref={register}>
                <option value="">Todos</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="fechaInicial">Fecha inicial:</label>
            <input
                type="date"
                name="fechaInicial"
                ref={register({ required: true })}
                className={errors.fechaInicial ? 'error' : ''}
            />
            <br />
            <label htmlFor="fechaFinal">Fecha final:</label>
            <input
                type="date"
                name="fechaFinal"
                ref={register({ required: true })}
                className={errors.fechaFinal ? 'error' : ''}
            />
            <br />
            <br />
            <button type="submit">Generar PDF</button>
            <button type="button">Generar Excel</button>
            <button type="button">Salir</button>
        </form>
        </div>
    );
                }

export default MakeReportsVentaPage;
