/**Pantalla: Inventario de inmuebles 
Lista de inmuebles 
Nombre 
Descripción  
Cantidad 
Editar, crear o desactivar inmuebles */


import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import query  from '../api/axios.js';
 

function EditPropertyInventoriesPage() {
    const { idInventarioInmueble } = useParams();
    const isEditMode = !!idInventarioInmueble;

    const[usuarios, setUsuario] = useState([]);
    const [formularioInventario, setFormularioInventario] = useState({
        idInventarioInmueble: isEditMode ? idInventarioInmueble :uuidv4(),
        nombreInmueble:"",
        descripcionInmueble:"",
        cantidadInmueble:0,
        fechaRegistroInmueble:new Date().toISOString().slice(0,10), 
        numeroDocumento: "",
    })
    const [errorsCategorias, setErrorsCategorias] = useState({
        nombreInmueble:"",
        descripcionInmueble:"",
        cantidadInmueble:0,
        numeroDocumento: "",
    })

    useEffect (() => {
        const listarNumeroDocumentoUsuario = async () => {
            try {
                const respuestaNumeroDocumentoUsuario = await query.get('/usuarios', {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsuario(respuestaNumeroDocumentoUsuario.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            } 
        };
        listarNumeroDocumentoUsuario();

        if (isEditMode) {
            const listarInventarioActualizar = async () => {
                try {
                    const response = await query.get(`/inventario-inmueble/${idInventarioInmueble}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormularioInventario(response.data);
    
                    setFormularioInventario(prevState => ({
                        ...prevState,
                        numeroDocumento: response.data.numeroDocumento.numeroDocumento
                    }));
                } catch (error) {
                    console.error('Error al obtener los datos del inventario', error);
                }
            };
    
            listarInventarioActualizar();
        }
    },[idInventarioInmueble,isEditMode]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormularioInventario(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (value.trim() === '') {
            setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'Este campo es obligatorio'
            }));
        } else {
            setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
         // Validar nombre solo letras y caracteres especiales
        if (name === 'nombreInmueble') {
            if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
                setErrorsCategorias(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsCategorias(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Solo se permiten letras y caracteres especiales'
                }));
            }
        }

         // Validar precio solo números mayores a 0
        if (name === 'cantidadInmueble') {
            if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >0) {
                setErrorsCategorias(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setErrorsCategorias(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Ingrese un precio válido (mayor a 0)'
                }));
            }
        }

        // Limitar descripción a 50 caracteres
        if (name === 'descripcionInmueble' && value.length > 50) {
            setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'No puede tener más de 50 caracteres'
            }));
        }

        
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombreInmueble, descripcionInmueble, cantidadInmueble, numeroDocumento } = setFormularioInventario;

        // Validar que todos los campos estén llenos
        if (!nombreInmueble || !descripcionInmueble || !cantidadInmueble || !numeroDocumento) {
            alert('Debe completar todos los campos antes de enviar el formulario');
            return;
        }

        const errors = Object.values(errorsCategorias).filter(error => error !== '');
    
        if (errors.length > 0) {
          // Mostrar los errores al usuario
            alert('Por favor, corrija los siguientes errores:\n' + errors.join('\n'));
            return;
        }

        try {
            let response;
            if (isEditMode) {
                response = await query.put(`/inventario-inmueble/${idInventarioInmueble}`, formularioInventario, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                response = await query.post('/inventario-inmueble/crear' , formularioInventario, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            console.log(response.data);
            alert('El formulario se ha guardado exitosamente');
            setFormularioInventario({
                idInventarioInmueble: isEditMode ? idInventarioInmueble :uuidv4(),
                nombreInmueble:"",
                descripcionInmueble:"",
                cantidadInmueble:0,
                fechaRegistroInmueble:new Date().toISOString().slice(0,10), 
                numeroDocumento: "",
            });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className='div-padre'>
            <h1 className='titulo'>{isEditMode ? 'Editar Inmueble' : 'Registro de Inmueble'}</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label  className={errorsCategorias.nombreInmueble ? 'required-field' : ''}>Nombre</label>
                        <input type="text" value={formularioInventario.nombreInmueble} name='nombreInmueble' onChange={handleChange} placeholder="Nombre" className={errorsCategorias.nombreInmueble ? 'error' : ''} />
                        {errorsCategorias.nombreInmueble && (<div className="error-message">{errorsCategorias.nombreInmueble}</div>)}
                    </div>
                    <div className='form-group'>
                        <label  className={errorsCategorias.descripcionInmueble ? 'required-field' : ''}>Descripción </label>
                        <input type="text" value={formularioInventario.descripcionInmueble}  name='descripcionInmueble' onChange={handleChange} placeholder="Ingresa sus propiedades"className={errorsCategorias.descripcionInmueble ? 'error' : ''}  />
                        {errorsCategorias.descripcionInmueble && (<div className="error-message">{errorsCategorias.descripcionInmueble}</div>)}
                    </div>
                    <div className='form-group'>
                        <label  className={errorsCategorias.cantidadInmueble ? 'required-field' : ''}>Cantidad</label>
                        <input type="number" value={formularioInventario.cantidadInmueble} name='cantidadInmueble' onChange={handleChange} placeholder="1-⊗" className={errorsCategorias.cantidadInmueble ? 'error' : ''} />
                        {errorsCategorias.cantidadInmueble && (<div className="error-message">{errorsCategorias.cantidadInmueble}</div>)}
                    </div>
                    <div className='form-group'>
                        <label  className={errorsCategorias.numeroDocumento ? 'required-field' : ''}>usuario</label>
                        <select id='rol' name="numeroDocumento" value={formularioInventario.numeroDocumento}  onChange={handleChange} className={errorsCategorias.numeroDocumento ? 'error' : ''} >
                        <option value="">Seleccione...</option>
                        {usuarios.map(tipo => (
                            <option key={tipo.numeroDocumento} value={tipo.numeroDocumento}>{tipo.nombreCompleto}</option>
                        ))}
                        </select>
                        {errorsCategorias.numeroDocumento && (<div className="error-message">{errorsCategorias.numeroDocumento}</div>)}
                    </div>
                </div>
                <div className="botones">
                    <Link to='/inventario'>
                        <div className='text-center my-3'>
                            <button className='boton 1'>
                                Salir
                            </button>
                        </div>
                    </Link>
                    <button type='submit' className='boton'>{isEditMode ? 'Guardar Cambios' : 'Crear Inventario'}</button>
                </div>
            </form>
        </div>
    )
}

export default EditPropertyInventoriesPage
