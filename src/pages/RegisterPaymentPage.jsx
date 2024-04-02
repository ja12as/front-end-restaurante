/**Registrar pago 
Valor pagado 
Medio de pago 
A quien se le pago 
Observación  */ 


import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import query from '../api/axios';

function RegisterPaymentPage() {

    const[mediosPagos, setMediosPagos]= useState([]);
    const [empleados, setEmpleados] =  useState([]);



    useEffect(()=>{
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
        
        const listarEmpleados = async () => {
            try {
            const respuestaEmpleado = await query.get('/usuarios', {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEmpleados(respuestaEmpleado.data);
            } catch (error) {
            console.error('Error:', error);
            } 
        };
        listarMediosPagos();
        listarEmpleados();
    },[]);

    const [formularioPagoEmpleado, setFormularioPagoEmpleado]= useState({
        idPagoUsuario:uuidv4(),
        fechaPago:new Date().toISOString().slice(0,10), // Esto generará la fecha actual en formato YYYY-MM-DD,
        valorPagado:0,
        descripcionPago:"",
        numeroDocumento:"",
        idMedioPago:""
    })

    const handleChange = (e) => {
        const {name ,value } = e.target;
        const valorNumerico = name === 'valorPagado' || name === 'idPagoUsuario'  ? parseInt(value, 10): value; 
        setFormularioPagoEmpleado({...formularioPagoEmpleado, [name]: valorNumerico});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await query.post('/pago-usuario/crear',formularioPagoEmpleado);
            console.log(response.data);
        } catch (error) {
            console.error('Error al enviar los datos', error);
        }
    }

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Pago</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <select id='nombre' name="numeroDocumento" value={formularioPagoEmpleado.numeroDocumento}  onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {empleados.map(tipo => (
                            <option key={tipo.numeroDocumento} value={tipo.numeroDocumento}>{tipo.nombreCompleto}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Valor a Pagar </label>
                        <input type="number" value={formularioPagoEmpleado.valorPagado} name='valorPagado'  onChange={handleChange} placeholder="$col money" />
                    </div>
                    <div className='form-group'>
                        <label>Medio de pago  </label>
                        <select id='pago' name="idMedioPago" value={formularioPagoEmpleado.idMedioPago}  onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {mediosPagos.map(tipo => (
                            <option key={tipo.idMedioPago} value={tipo.idMedioPago}>{tipo.descripcionTipoPago}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Observacion</label>
                        <input type="text" value={formularioPagoEmpleado.descripcionPago}  name='descripcionPago' onChange={handleChange} placeholder="Observacion" />
                    </div>
                </div>
                <div className="botones">
                        <Link to='/pagos'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton 2'>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPaymentPage
