
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import query  from '../api/axios.js';
import { useParams } from 'react-router-dom';

function EditSuppliersPage() {
    const {idProveedor} = useParams();
    const isEditMode = !!idProveedor;

    const [formularioProveedor, setFormularioProveedor] = useState({
        idProveedor: isEditMode ? idProveedor : uuidv4(),
        nombreProveedor: "",
        numeroProveedor:0,
        correoProveedor: "",
        nombreEmpresa: "",
        numeroEmpresa:0,
        correoEmpresa: "",
        descripcionProducto:""
    });
    const [errorsProveedor, setErrorsProveedor] = useState({
        nombreProveedor: "",
        numeroProveedor:0,
        correoProveedor: "",
        nombreEmpresa: "",
        numeroEmpresa:0,
        correoEmpresa: "",
        descripcionProducto:""
    });

    useEffect(() => {
    
        if (isEditMode) {
            const fetchMenu = async () => {
                try {
                    const response = await query.get(`/proveedores/${idProveedor}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormularioProveedor(response.data);
                } catch (error) {
                    console.error('Error al obtener los datos del proveedor', error);
                }
            };
    
            fetchMenu();
            
        }
    }, [idProveedor, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormularioProveedor(prevState => ({
            ...prevState,
            [name]: value,
        }));
            
        // Validar que el campo no esté vacío al salir del mismo
        if (value.trim() === '') {
            setErrorsProveedor(prevErrors => ({
                ...prevErrors,
                [name]: 'Este campo es obligatorio'
            }));
        } else {
            setErrorsProveedor(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }

        // Validar el nombre del proveedor (solo letras y tildes)
        if (name === 'nombreProveedor') {
            if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Solo se permiten letras y caracteres especiales'
                }));
            }
        }

        // Validar el número de teléfono del proveedor
        if (name === 'numeroProveedor') {
            if (/^\d{10}$/.test(value) && value.startsWith('3')) {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: 'El teléfono debe tener 10 dígitos y empezar con 3'
                }));
            }
        }

        // Validar el número de teléfono del la empresa
        if (name === 'numeroEmpresa') {
            if (/^\d{10}$/.test(value) && value.startsWith('3')) {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: 'El teléfono debe tener 10 dígitos y empezar con 3'
                }));
            }
        }


      // Validar correo electrónico
    const correoValido = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formularioProveedor.correoProveedor);

    if (!correoValido) {
        setErrorsProveedor(prevErrors => ({
            ...prevErrors,
            correoProveedor: 'Por favor, ingrese un correo electrónico válido'
        }));
        return;
    }

        // Validar la descripción del producto (máximo 50 caracteres)
        if (name === 'descripcionProducto') {
            if (value.length <= 50) {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsProveedor(prevErrors => ({
                    ...prevErrors,
                    [name]: 'No puede tener más de 50 caracteres'
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombreProveedor, numeroProveedor, correoProveedor, nombreEmpresa, numeroEmpresa, correoEmpresa ,descripcionProducto } = formularioProveedor;

        // Validar que todos los campos estén llenos
        if (!nombreProveedor || !numeroProveedor || !correoProveedor || !nombreEmpresa || !numeroEmpresa || !correoEmpresa || !descripcionProducto) {
            alert('Debe completar todos los campos antes de enviar el formulario');
            return;
        }

               // Validar si hay errores en los campos
            const errors = Object.values(errorsProveedor).filter(error => error !== '');
    // Validar si hay errores en los campos
    if (errors.length > 0) {
        // Mostrar los errores al usuario
            alert('Por favor, corrija los siguientes errores:\n' + errors.join('\n'));
            return;
        }

        try {
            let response;
            if (isEditMode) {
                response = await query.put(`/proveedores/crear/${idProveedor}`, formularioProveedor, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                response = await query.post('/proveedores/crear', formularioProveedor, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            console.log(response.data);
            alert('El formulario se ha guardado exitosamente');
            setFormularioProveedor({
                idProveedor: isEditMode ? idProveedor : uuidv4(),
                nombreProveedor: "",
                numeroProveedor:0,
                correoProveedor: "",
                nombreEmpresa: "",
                numeroEmpresa:0,
                correoEmpresa: "",
                descripcionProducto: "",
                });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    
        return (
            <div className='div-padre'>
                <h1 className='titulo'>{isEditMode ? 'Editar Proveedor' : 'Registro de Proveedor'}</h1>
                <form onSubmit={handleSubmit} className='formulario'>
                    <div className='div-col-1'>
                        <div className='form-group'>
                            <label className={errorsProveedor.nombreProveedor ? 'required-field' : ''}>Nombre del proveedor </label>
                            <input type="text" value={formularioProveedor.nombreProveedor} name='nombreProveedor' onChange={handleChange} placeholder="Nombre del proveedor"  className={errorsProveedor.nombreProveedor ? 'error' : ''}/>
                            { errorsProveedor.nombreProveedor && ( <div className="error-message">{errorsProveedor.nombreProveedor} </div>)}
                        </div>
                        <div className='form-group'>
                            <label className={errorsProveedor.numeroProveedor ? 'required-field' : ''}>N° telefonico del  proveedores </label>
                            <input type="tel" value={formularioProveedor.numeroProveedor} name='numeroProveedor' onChange={handleChange} placeholder="Tel: "   className={errorsProveedor.numeroProveedor ? 'error' : ''} />
                            { errorsProveedor.numeroProveedor && ( <div className="error-message">{errorsProveedor.numeroProveedor} </div>)}
                        </div>
                        <div className='form-group'>
                            <label className={ errorsProveedor.correoProveedor? 'required-field' : ''}>Correo del proveedor</label>
                            <input type="email" value={formularioProveedor.correoProveedor} name='correoProveedor' onChange={handleChange} placeholder="proveedor@gmail.com"  className={errorsProveedor.correoProveedor ? 'error' : ''} />
                            { errorsProveedor.correoProveedor && ( <div className="error-message">{errorsProveedor.correoProveedor} </div>)}
                        </div>
                        <div className='form-group'>
                            <label className={errorsProveedor.descripcionProducto  ? 'required-field' : ''}>Descripcion del producto</label>
                            <input type="text" value={formularioProveedor.descripcionProducto} name='descripcionProducto' onChange={handleChange} placeholder=".:.:.:::...::"  className={errorsProveedor.descripcionProducto ? 'error' : ''} />
                            { errorsProveedor.descripcionProducto && ( <div className="error-message">{errorsProveedor.descripcionProducto} </div>)}
                        </div>
                    </div>
                    <div className='div-col-2'>
                        <div className='form-group'>
                            <label className={errorsProveedor.nombreEmpresa ? 'required-field' : ''}>Nombre empresa del proveedor</label>
                            <input type="text" value={formularioProveedor.nombreEmpresa} name='nombreEmpresa' onChange={handleChange}  placeholder="Nombre de la empresa"   className={errorsProveedor.nombreEmpresa ? 'error' : ''}/>
                            { errorsProveedor.nombreEmpresa && ( <div className="error-message">{errorsProveedor.nombreEmpresa} </div>)}
                        </div>
                        <div className='form-group'>
                            <label className={errorsProveedor.numeroEmpresa ? 'required-field' : ''}>N° telefonico de la  empresa</label>
                            <input type="tel" value={formularioProveedor.numeroEmpresa} name='numeroEmpresa' onChange={handleChange} placeholder="Tel: Empresa"   className={errorsProveedor.numeroEmpresa ? 'error' : ''}/>
                            { errorsProveedor.numeroEmpresa && ( <div className="error-message">{errorsProveedor.numeroEmpresa} </div>)}
                        </div>
                        <div className='form-group'>
                            <label className={errorsProveedor.correoEmpresa ? 'required-field' : ''}>Correo de la empresa </label>
                            <input type="email" value={formularioProveedor.correoEmpresa} name='correoEmpresa' onChange={handleChange} placeholder="empresa@gmail.com"  className={errorsProveedor.correoEmpresa ? 'error' : ''}/>
                            { errorsProveedor.correoEmpresa && ( <div className="error-message">{errorsProveedor.correoEmpresa} </div>)}
                        </div>
                    </div>
                    
                    <div className="botones">
                        <Link to='/provedores'>
                            <div>
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton'>{isEditMode ? 'Guardar Cambios' : 'Crear Proveedor'}</button>
                    </div>
                </form>
            </div>
        );
}

export default EditSuppliersPage
