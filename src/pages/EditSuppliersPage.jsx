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

    //creo una constante que me va guardar los errores que existan(campos-vacios,correo mal escrito etc)
    const [errorsProveedor, setErrorsProveedor] = useState({});
    const [formularioProveedor, setFormularioProveedor] = useState({
        idProveedor: uuidv4(),
        nombreProveedor: "",
        numeroProveedor: 0,
        correoProveedor: "",
        nombreEmpresa: "",
        numeroEmpresa: 0,
        correoEmpresa: "",
        descripcionProducto: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorNumeri =
        name === "numeroProveedor" || name === "numeroEmpresa"
            ? parseInt(value, 10)
            : value;
        setFormularioProveedor({ ...formularioProveedor, [name]: valorNumeri });


            //Para validar sintaxis del correo
        if (name === "correoProveedor" || name === "correoEmpresa") {
        if (!/\S+@\S+\.\S+/.test(value)) {
            setErrorsProveedor({
            ...errorsProveedor,
            [name]: "Por favor, ingresa un correo electrónico válido",
            });
        } else {
            setErrorsProveedor({ ...errorsProveedor, [name]: "" });
        }
        } else {

            //trim es un metodo para validar que los campos no esten vacios
        if (value.trim() === "") {
            setErrorsProveedor({
            ...errorsProveedor,
            [name]: "Este campo es requerido",
            });
        } else {
            setErrorsProveedor({ ...errorsProveedor, [name]: "" });
        }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // aqui  Se valida si hay errores en errorsProveedor y si hay algun error no deja enviar 
        // si no hay error pues por ende se enviara con exito jajaja
        const hayErrores = Object.values(errorsProveedor).some(
        (error) => error !== ""
        );
        if (hayErrores) {
        
        return;
        }

        try {
        const response = await query.post("/proveedores/crear",formularioProveedor );
        console.log(response.data); // Para manejar la respuesta del backend aquí


        // Limpiar los campos del formulario
        setFormularioProveedor({
            idProveedor: uuidv4(),
            nombreProveedor: "",
            numeroProveedor: 0,
            correoProveedor: "",
            nombreEmpresa: "",
            numeroEmpresa: 0,
            correoEmpresa: "",
            descripcionProducto: "",
        });

        // Reiniciar errores
        setErrorsProveedor({});
        alert("Los datos se han enviado con éxito");
        } catch (error) {
        console.error(
            "Error al enviar los datos al formulario de proveedores",
            error
        );
        }
    };

    // cree el evento onClick y en si faltan campos por llenar mando un alerte 
    const handleGuardar = (e) => {
        e.preventDefault();


        // Verificar si hay campos vacíos
        const camposVacios = Object.values(formularioProveedor).some(
        (value) => value === "" || value === 0
        );

        if (camposVacios) {
        // Mostrar alerta si hay campos vacíos
        alert("Por favor, diligencie todos los campos");
        return;
        }

        // Si no hay campos vacíos, continuo con el envío del formulario
        handleSubmit(e);
    };

    

    
        return (
            <div className='div-padre'>
                <h1 className='titulo'>Registro de Proveedores</h1>
                <form onSubmit={handleSubmit} className='formulario'>
                    <div className='div-col-1'>
                        <div className='form-group'>
                            <label>Nombre del proveedor </label>
                            <input type="text" value={formularioProveedor.nombreProveedor} name='nombreProveedor' onChange={handleChange} placeholder="Nombre del proveedor" />
                            { errorsProveedor.nombreProveedor && ( <span className="error-message">{errorsProveedor.nombreProveedor} </span>)}
                        </div>
                        <div className='form-group'>
                            <label>N° telefonico del  proveedores </label>
                            <input type="tel" value={formularioProveedor.numeroProveedor} name='numeroProveedor' onChange={handleChange} placeholder="Tel: " />
                            { errorsProveedor.numeroProveedor && ( <span className="error-message">{errorsProveedor.numeroProveedor} </span>)}
                        </div>
                        <div className='form-group'>
                            <label>Correo del proveedor</label>
                            <input type="email" value={formularioProveedor.correoProveedor} name='correoProveedor' onChange={handleChange} placeholder="proveedor@gmail.com" />
                            { errorsProveedor.correoProveedor && ( <span className="error-message">{errorsProveedor.correoProveedor} </span>)}
                        </div>
                        <div className='form-group'>
                            <label>Descripcion del producto</label>
                            <input type="text" value={formularioProveedor.descripcionProducto} name='descripcionProducto' onChange={handleChange} placeholder=".:.:.:::...::" />
                            { errorsProveedor.descripcionProducto && ( <span className="error-message">{errorsProveedor.descripcionProducto} </span>)}
                        </div>
                    </div>
                    <div className='div-col-2'>
                        <div className='form-group'>
                            <label>Nombre empresa del proveedor</label>
                            <input type="text" value={formularioProveedor.nombreEmpresa} name='nombreEmpresa' onChange={handleChange}  placeholder="Nombre de la empresa" />
                            { errorsProveedor.nombreEmpresa && ( <span className="error-message">{errorsProveedor.nombreEmpresa} </span>)}
                        </div>
                        <div className='form-group'>
                            <label>N° telefonico de la  empresa</label>
                            <input type="tel" value={formularioProveedor.numeroEmpresa} name='numeroEmpresa' onChange={handleChange} placeholder="Tel: Empresa" />
                            { errorsProveedor.numeroEmpresa && ( <span className="error-message">{errorsProveedor.numeroEmpresa} </span>)}
                        </div>
                        <div className='form-group'>
                            <label>Correo de la empresa </label>
                            <input type="email" value={formularioProveedor.correoEmpresa} name='correoEmpresa' onChange={handleChange} placeholder="empresa@gmail.com" />
                            { errorsProveedor.correoEmpresa && ( <span className="error-message">{errorsProveedor.correoEmpresa} </span>)}
                        </div>
                    </div>
                    
                    <div className="botones">
                        <Link to='/provedores'>
                            <div>
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton 2' onClick={handleGuardar}>Guardar</button>
                    </div>
                </form>
            </div>
        );
}

export default EditSuppliersPage
