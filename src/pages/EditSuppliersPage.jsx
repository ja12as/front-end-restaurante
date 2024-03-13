/**  
Pantalla: Proveedores 
Lista de proveedores	 
Nombre personal 
Numero personal 
Nombre empresa 
Numero empresa 
Descripción 
Correo 
Editar, crear o desactivar proveedores */

import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import query  from '../api/axios.js';

function EditSuppliersPage() {


    const [formularioProveedor ,setFormularioProveedor] = useState ({
        idProveedor:uuidv4(),
        nombreProveedor:"",
        numeroProveedor:0,
        correoProveedor: "",
        nombreEmpresa:"",
        numeroEmpresa:0,
        correoEmpresa:"",
        descripcionProducto:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorNumerico =  name === 'numeroProveedor' || name === 'numeroEmpresa'? parseInt(value, 10) : value;
        setFormularioProveedor({ ...formularioProveedor, [name]: valorNumerico });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { idProveedor, nombreProveedor, numeroProveedor, correoProveedor, nombreEmpresa, numeroEmpresa, correoEmpresa, descripcionProducto } = formularioProveedor;
    
        if (!idProveedor || !nombreProveedor || !numeroProveedor || !correoProveedor || !nombreEmpresa || !numeroEmpresa || !correoEmpresa || !descripcionProducto) {
            alert('Todos los campos deben estar llenos');
            return;
        }
        
        // Verificar si el numeroProveedor ya existe en la base de datos
        try {
            const response = await query.get(`/proveedores/${numeroProveedor}`);
            if (response.data) {
                alert('El número de proveedor ya existe');
                return;
            }
        } catch (error) {
            console.error('Error al verificar el número de proveedor:', error);
        }

        // Verificar si los correos son válidos y únicos
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(correoProveedor) || !emailRegex.test(correoEmpresa)) {
            alert('Por favor, ingresa correos válidos');
            return;
        }

        try {
            const responseProveedor = await query.get(`/proveedores/${correoProveedor}`);
            if (responseProveedor.data) {
                alert('El correo ya existe');
                return;
            }
        } catch (error) {
            console.error('Error al verificar los correos:', error);
        }

        try {
            const response = await query.post('/proveedores/crear', formularioProveedor);
            console.log(response.data); // Puedes manejar la respuesta del backend aquí
            alert('Proveedor creado exitosamente');
            setFormularioProveedor({
                idProveedor: uuidv4(),
                nombreProveedor: "",
                numeroProveedor: 0,
                correoProveedor: "",
                nombreEmpresa: "",
                numeroEmpresa: 0,
                correoEmpresa: "",
                descripcionProducto: ""
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };
    

    
        return (
            <div className='div-padre'>
                <h1 className='titulo'>Registro de Proveedores</h1>
                <form onSubmit={handleSubmit} className='formulario'>
                    <div className='div-col-1'>
                        <div className='form-group'>
                            <label>Nombre del proveedor </label>
                            <input type="text" value={formularioProveedor.nombreProveedor} name='nombreProveedor' onChange={handleChange} placeholder="Nombre del proveedor" />
                        </div>
                        <div className='form-group'>
                            <label>N° telefonico del  proveedores </label>
                            <input type="tel" value={formularioProveedor.numeroProveedor} name='numeroProveedor' onChange={handleChange} placeholder="Tel: " />
                        </div>
                        <div className='form-group'>
                            <label>Correo del proveedor</label>
                            <input type="email" value={formularioProveedor.correoProveedor} name='correoProveedor' onChange={handleChange} placeholder="proveedor@gmail.com" />
                        </div>
                        <div className='form-group'>
                            <label>Descripcion del producto</label>
                            <input type="text" value={formularioProveedor.descripcionProducto} name='descripcionProducto' onChange={handleChange} placeholder=".:.:.:::...::" />
                        </div>
                    </div>
                    <div className='div-col-2'>
                        <div className='form-group'>
                            <label>Nombre empresa del proveedor</label>
                            <input type="text" value={formularioProveedor.nombreEmpresa} name='nombreEmpresa' onChange={handleChange}  placeholder="Nombre de la empresa" />
                        </div>
                        <div className='form-group'>
                            <label>N° telefonico de la  empresa</label>
                            <input type="tel" value={formularioProveedor.numeroEmpresa} name='numeroEmpresa' onChange={handleChange} placeholder="Tel: Empresa" />
                        </div>
                        <div className='form-group'>
                            <label>Correo de la empresa </label>
                            <input type="email" value={formularioProveedor.correoEmpresa} name='correoEmpresa' onChange={handleChange} placeholder="empresa@gmail.com" />
                        </div>
                    </div>
                    
                    <div className="botones">
                        <Link to='/provedores'>
                            <div>
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton 2'>Guardar</button>
                    </div>
                </form>
            </div>
        );
}

export default EditSuppliersPage
