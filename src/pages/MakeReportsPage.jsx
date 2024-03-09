
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';


function MakeReportsPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [redirigirA, setRedirigirA] = useState('/historial-venta');

    // Trae los usuarios para mostrarlos en el select de busqueda
    useEffect(() => {
        axios.get('https://mi-api.com/usuarios')
        .then(response => {
            setUsuarios(response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la petición GET:', error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Petición POST para enviar la información del formulario
        const infoParaEnviar = {
        nombre,
        fechaFinal,
        fechaInicio,
        };

        axios.post('https://mi-api.com/usuarios', infoParaEnviar)
        .then(response => {
            console.log('Respuesta de la petición POST:', response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la petición POST:', error);
        });
    };
    //para redireccionar a las dos paginas 
    const cambiarRedireccion = () => {
        setRedirigirA(redirigirA === '/historial-venta' ? '/pagos/historial-pago' : '/historial-venta');
    }

    return (
        <div className='div-padre'>
        <h1 className='titulo'>Generar Reportes</h1>
        <form onSubmit={handleSubmit}className='formulario'>
            <div className='div-col-1'>
                <div className='form-group'>
                <label>Nombre del empleado</label>
                <select value={nombre} onChange={(e) => setNombre(e.target.value)}>
                    {usuarios.map((usuario, index) => (
                        <option key={index} value={usuario.nombre}>{usuario.nombre}</option>
                    ))}
                </select>
                </div>
                <div className='form-group'>
                    <label>Fecha  de inicio del reporte*</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>fecha  final del reporte*</label>
                    <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Observacion</label>
                    <input type="text" placeholder="Escribe alguna observacion .:" />
                </div>
            </div>
            <div className="botones">
                    <button type='submit' className='boton 1'>Generar</button>
                    <Link to={redirigirA}>
                        <div className="img-medio-admin">
                        <button type='submit' className='boton 2' onClick={cambiarRedireccion}>salir</button>
                        </div>
                    </Link>
            </div>
        </form>
    </div>
    );
};

export default MakeReportsPage
