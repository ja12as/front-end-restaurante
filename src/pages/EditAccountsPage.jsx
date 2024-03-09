/*Pantalla: editar Cuentas 
Lista de cuentas 
Nombre completo  
Tipo de documento 
Numero de documento 
Teléfono 
Dirección 
Correo 
Contraseña 
Rol 
Foto 
Editar, crear o desactivar cuentas */ 




import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import axios  from '../api/axios.js';

function EditAccountsPage() {
    const[nombre, setNombre]= useState('');
    const[direccion, setDireccion]=useState('');
    const[correo, setCorreo]= useState('');
    const[telefono, setTelefono]= useState('');
    const[rol, setRol]= useState('');
    const[roles, setRoles]= useState([]);
    const[password, setPassword]= useState('');
    const[tipoDocumento ,setTipoDocumento]= useState('');
    const[tiposDocumentos ,setTiposDocumentos]= useState([]);
    const[numeroDocumento, setnumeroDocumento]= useState('');

    useEffect(()=>{
        axios.get('')
        .then(response =>{
            setTiposDocumentos(response.data);
        })
        .catch(error=>{
            console.error('Hubo un error al hacer la peticon GET: Tipo de Documento');
        });
        
    },[]);

    useEffect(()=>{
        axios.get('')
        .then(response =>{
            setRoles(response.data);
        })
        .catch(error=>{
            console.error('Hubo un error al hacer la peticon GET: Tipo de Documento');
        });
        
    },[]);


    const handleSubmit = (event) =>{
        encodeURIComponent.preventDefault();

        const informacionEmpleadoEnviar = {
            nombre,
            direccion,
            correo,
            telefono,
            rol,
            password,
            tipoDocumento,
            numeroDocumento,
        };
        axios.post('', informacionEmpleadoEnviar)
        .then(response =>{
            console.error('Respuesta de la peticion POST:', response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la peticion POST:', error);
        });
    };

    const handleChange = event =>{
        setTipoDocumento(event.target.value);
        };

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Usuario</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
                    </div>
                    <div className='form-group'>
                        <label>Direccion</label>
                        <input type="text" value={nombre} onChange={(e) => setDireccion(e.target.value)}  placeholder='Cra cll #'/>
                    </div>
                    <div className='form-group'>
                        <label>Correo</label>
                        <input type="email" value={nombre} onChange={(e) => setCorreo(e.target.value)}  placeholder='usuario@gmail.com'/>
                    </div>
                    <div className='form-group'>
                        <label>Telefono</label>
                        <input type="email" value={nombre} onChange={(e) => setTelefono(e.target.value)}  placeholder='usuario@gmail.com'/>
                    </div>
                </div>
                <div className='div-col-2'>
                    <div className='form-group'>
                        <label>Rol</label>
                        <select name="tipoDocumento" value={rol} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {roles.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" value={nombre} onChange={(e) => setCorreo(e.target.value)}  placeholder='usuario@gmail.com'/>
                    </div>
                    <div className='form-group'>
                        <label>Tipo de documento</label>
                        <select name="tipoDocumento" value={tipoDocumento} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {tiposDocumentos.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>N° de documento</label>
                        <input type="text" value={nombre} onChange={(e) => setnumeroDocumento(e.target.value)}  placeholder='************'/>
                    </div>
                </div>
                <div className="botones">
                        <Link to='/cuentas'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        oo<button type='submit' className='boton 2'>Guardar</button>
                </div>
            </form>
        </div>
    );
    
}
export default EditAccountsPage
