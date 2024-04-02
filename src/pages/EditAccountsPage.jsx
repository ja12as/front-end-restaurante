
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import query  from '../api/axios.js';

function EditAccountsPage() {
    const { numeroDocumento } = useParams();
    const isEditMode = !!numeroDocumento;


    const[roles, setRoles]= useState([]);
    const[tiposDocumentos ,setTiposDocumentos]= useState([]);
    const [formulario, setFormularioUsuario] = useState({
        numeroDocumento: isEditMode ? numeroDocumento : 0,
        nombreCompleto: "",
        telefono: 0,
        direccion: "",
        correo: "",
        contrasena: "",
        rutaFoto: "",
        idTipoDocumento: "",
        idRolUsuario: ""
    })
    const [errorsCategorias, setErrorsCategorias] = useState({
        numeroDocumento: isEditMode ? numeroDocumento : 0,
        nombreCompleto: "",
        telefono: 0,
        direccion: "",
        correo: "",
        contrasena: "",
        rutaFoto: "",
        idTipoDocumento: "",
        idRolUsuario: ""
    });


    useEffect(()=>{

        const listarTipoDoccumento = async () => {
                try {
                const response = await query.get('/tipos-documentos', {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTiposDocumentos(response.data);
                } catch (error) {
                console.error('Error al obtener el tipo de documento:', error);
                } 
        };

        const listarRoles = async () => {
                try {
                const response = await query.get('/roles', {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRoles(response.data);
                } catch (error) {
                console.error('Error al obtener el rol:', error);
                }
            };
        listarRoles();
        listarTipoDoccumento();

        if (isEditMode) {
            const listarUsuarioActualizar = async () => {
                try {
                    const response = await query.get(`/usuarios/${numeroDocumento}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormularioUsuario(response.data);
    
                    // Establecer el valor seleccionado del select con la categoría del menú
                    setFormularioUsuario(prevState => ({
                        ...prevState,
                        idTipoDocumento: response.data.idTipoDocumento.idTipoDocumento
                    }));
                    setFormularioUsuario(prevState => ({
                        ...prevState,
                        idRolUsuario: response.data.idRolUsuario.idRolUsuario
                    }));
                } catch (error) {
                    console.error('Error al obtener los datos del Usuario', error);
                }
            };
    
            listarUsuarioActualizar();
        }
    }, [numeroDocumento, isEditMode]);


    const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Actualizar el estado del formulario con el nuevo valor ingresado
        setFormularioUsuario(prevState => ({
          ...prevState,
          [name]: value,
        }));
      
        // Validar que el campo no esté vacío al salir del mismo
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
      
        // Validaciones específicas para cada campo
      
        switch (name) {
          case 'nombreCompleto':
            if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'El nombre solo puede contener letras y caracteres especiales'
              }));
            }
            break;
          case 'correo':
            if (!/^\S+@\S+\.\S+$/.test(value)) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'Este no es un correo electrónico válido.'
              }));
            }
            break;
          case 'telefono':
            if (!/^3\d{9}$/.test(value)) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'El número de teléfono no es válido.'
              }));
            }
            break;
          case 'idRolUsuario':
            if (!value || (value !== '1' && value !== '5')) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'El rol de usuario no es válido.'
              }));
            }
            break;
          case 'contrasena':
            if ((formulario.idRolUsuario === 'Administrador' || formulario.idRolUsuario === 'Cajero') && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}/.test(value)) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial.'
              }));
            }
            break;
          case 'numeroDocumento':
            if (!/^\d{8,13}$/.test(value)) {
              setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'El número de documento no es válido.'
              }));
            }
            break;
          default:
            break;
        }
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar que todos los campos estén llenos
        const { numeroDocumento, nombreCompleto, telefono, direccion, correo, contrasena, rutaFoto, idTipoDocumento, idRolUsuario } = formulario;
        
        if (!numeroDocumento || !nombreCompleto || !telefono || !direccion || !correo || !contrasena || !rutaFoto || !idTipoDocumento || !idRolUsuario) {
            alert('Debe completar todos los campos antes de enviar el formulario');
            return;
        }
    
        // // Validar si hay errores en los campos
        if (Object.values(errorsCategorias).some(error => error !== '')) {
            alert('Por favor, corrija los errores antes de enviar el formulario');
            return;
        }
    
        try {
            let response;
            if (isEditMode) {
                response = await query.put(`/usuarios/crear/${numeroDocumento}`, formulario, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },

                });
            } else {
                response = await query.post('/usuarios/crear', formulario, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            console.log(response.data);
            alert('El formulario se ha guardado exitosamente');
            setFormularioUsuario({
                numeroDocumento: isEditMode ? numeroDocumento : 0,
                nombreCompleto: "",
                telefono: 0,
                direccion: "",
                correo: "",
                contrasena: "",
                rutaFoto: "",
                idTipoDocumento: "",
                idRolUsuario: ""
            });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    
    

    return (
        <div className='div-padre'>
            <h1 className='titulo'>{isEditMode ? 'Editar usuario' : 'Registro de Usuario'}</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label className={errorsCategorias.nombreCompleto ? 'required-field' : ''}>Nombre</label>
                        <input type="text" value={formulario.nombreCompleto} name='nombreCompleto' onChange={handleChange} placeholder='Nombre'  className={errorsCategorias.nombreCompleto ? 'error' : ''} />
                        {errorsCategorias.nombreCompleto && (<div className="error-message">{errorsCategorias.nombreCompleto}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.direccion ? 'required-field' : ''}>Direccion</label>
                        <input type="text" value={formulario.direccion} name='direccion'onChange={handleChange}  placeholder='Cra cll #'  className={errorsCategorias.direccion ? 'error' : ''} />
                        {errorsCategorias.direccion && (<div className="error-message">{errorsCategorias.direccion}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.correo ? 'required-field' : ''}>Correo</label>
                        <input type="email" value={formulario.correo} name='correo' onChange={handleChange}  placeholder='usuario@gmail.com'  className={errorsCategorias.correo ? 'error' : ''} />
                        {errorsCategorias.correo && (<div className="error-message">{errorsCategorias.correo}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.telefono ? 'required-field' : ''}>Telefono</label>
                        <input type="number" value={formulario.telefono} name='telefono' onChange={handleChange}  placeholder='000 000 0000'  className={errorsCategorias.telefono ? 'error' : ''} />
                        {errorsCategorias.telefono && (<div className="error-message">{errorsCategorias.telefono}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.rutaFoto ? 'required-field' : ''}>Imagen</label>
                        <input type="file"accept='.png, .jpg, .jpeg' value={formulario.rutaFoto} name='rutaFoto' onChange={handleChange}  placeholder='Carga tu img'  className={errorsCategorias.rutaFoto ? 'error' : ''} />
                        {errorsCategorias.rutaFoto && (<div className="error-message">{errorsCategorias.rutaFoto}</div>)}
                    </div>
                </div>
                <div className='div-col-2'>

                    <div className='form-group'>
                        <label className={errorsCategorias.idRolUsuario ? 'required-field' : ''}>Rol</label>
                        <select id='rol' name="idRolUsuario" value={formulario.idRolUsuario}  onChange={handleChange}  className={errorsCategorias.idRolUsuario ? 'error' : ''} >
                        <option value="">Seleccione...</option>
                        {roles.map(tipo => (
                            <option key={tipo.idRolUsuario} value={tipo.idRolUsuario}>{tipo.rolUsuario}</option>
                        ))}
                        </select>
                        {errorsCategorias.idRolUsuario && (<div className="error-message">{errorsCategorias.idRolUsuario}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.contrasena ? 'required-field' : ''}>Password</label>
                        <input type="password" value={formulario.contrasena} name='contrasena'onChange={handleChange}  placeholder='**********'  className={errorsCategorias.contrasena ? 'error' : ''} />
                        {errorsCategorias.contrasena && (<div className="error-message">{errorsCategorias.contrasena}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.idTipoDocumento ? 'required-field' : ''}>Tipo de documento</label>
                        <select id='tipoDocumento' name="idTipoDocumento" value={formulario.idTipoDocumento} onChange={handleChange} className={errorsCategorias.idTipoDocumento ? 'error' : ''}>
                        <option value="">Seleccione...</option>
                            {tiposDocumentos.map(tipo => (
                        <option key={tipo.idTipoDocumento} value={tipo.idTipoDocumento}>{tipo.tipoDocumento}</option>
                        ))}
                        </select>
                        {errorsCategorias.idTipoDocumento && (<div className="error-message">{errorsCategorias.idTipoDocumento}</div>)}
                    </div>
                    <div className='form-group'>
                        <label className={errorsCategorias.numeroDocumento ? 'required-field' : ''}>N° de documento</label>
                        <input type="number" value={formulario.numeroDocumento} name='numeroDocumento' onChange={handleChange}  placeholder='************'  className={errorsCategorias.numeroDocumento ? 'error' : ''} />
                        {errorsCategorias.numeroDocumento && (<div className="error-message">{errorsCategorias.numeroDocumento}</div>)}
                    </div>
                </div>
                <div className="botones">
                        <Link to='/cuentas'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton'>{isEditMode ? 'Guardar Cambios' : 'Crear Usuario'}</button>
                </div>
            </form>
        </div>
    );
    
}
export default EditAccountsPage
