
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import query  from '../api/axios.js';

function EditAccountsPage() {
    const[roles, setRoles]= useState([]);
    const[tiposDocumentos ,setTiposDocumentos]= useState([]);



    useEffect(()=>{
        const listarTipoDoccumento= async () => {
            try {
                const respuestaTipoDoccumento = await query.get('/tipos-documentos');
                setTiposDocumentos(respuestaTipoDoccumento.data);
            } catch (error) {
                console.error('Error al obtener los tipos de documento:', error);
            }
        };

        const listarRoles= async () => {
            try {
                const respuestaRoles = await query.get('/roles');
                setRoles(respuestaRoles.data);
            } catch (error) {
                console.error('Error al obtener los roles:', error);
            }
        };
        listarRoles();
        listarTipoDoccumento();
        
    },[]);


    const [formulario, setFormData] = useState({
        numeroDocumento: 0,
        nombreCompleto: "",
        telefono: 0,
        direccion: "",
        correo: "",
        contrasena: "",
        rutaFoto: "",
        idTipoDocumento: "",
        idRolUsuario: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorNumerico= name === 'numeroDocumento' || name === 'telefono' ? parseInt(value, 10) : value;
        setFormData({ ...formulario, [name]: valorNumerico });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 1) Validate that numeroDocumento is a number
        if (isNaN(formulario.numeroDocumento)) {
            console.error('numeroDocumento must be a number');
            return;
        }
    
        // 2) Validate all fields are filled
        for (let field in formulario) {
            if (!formulario[field]) {
                console.error(`Please fill in the ${field}`);
                return;
            }
        }
        // 5) Validate password length and content
        if (formulario.contrasena.length < 12 || !/[a-z]/.test(formulario.contrasena) || !/[0-9]/.test(formulario.contrasena)) {
            console.error('Password must be at least 12 characters long and contain both numbers and letters');
            return;
        }
    
        // 6) Validate email format
        if (!/\S+@\S+\.\S+/.test(formulario.correo)) {
            console.error('Invalid email format');
            return;
        }
    
        // If all validations pass, send the request
        try {
            const response = await query.post('/usuarios/crear', formulario);
            // 4) Validate the backend returned 200
            if (response.status !== 200) {
                console.error('Error from backend:', response.status);
                return;
            }
            console.log(response.data); // Handle the backend response here
        } catch (error) {
            console.error('Error sending data:', error);
        }

    };
    

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Usuario</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" value={formulario.nombreCompleto} name='nombreCompleto' onChange={handleChange} placeholder='Nombre' />
                    </div>
                    <div className='form-group'>
                        <label>Direccion</label>
                        <input type="text" value={formulario.direccion} name='direccion'onChange={handleChange}  placeholder='Cra cll #'/>
                    </div>
                    <div className='form-group'>
                        <label>Correo</label>
                        <input type="email" value={formulario.correo} name='correo' onChange={handleChange}  placeholder='usuario@gmail.com'/>
                    </div>
                    <div className='form-group'>
                        <label>Telefono</label>
                        <input type="number" value={formulario.telefono} name='telefono' onChange={handleChange}  placeholder='000 000 0000'/>
                    </div>
                    <div className='form-group'>
                        <label>Imagen</label>
                        <input type="file"accept='.png, .jpg, .jpeg' value={formulario.rutaFoto} name='rutaFoto' onChange={handleChange}  placeholder='Carga tu img'/>
                    </div>
                </div>
                <div className='div-col-2'>

                    <div className='form-group'>
                        <label>Rol</label>
                        <select id='rol' name="idRolUsuario" value={formulario.idRolUsuario}  onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {roles.map(tipo => (
                            <option key={tipo.idRolUsuario} value={tipo.idRolUsuario}>{tipo.rolUsuario}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" value={formulario.contrasena} name='contrasena'onChange={handleChange}  placeholder='**********'/>
                    </div>
                    <div className='form-group'>
                        <label>Tipo de documento</label>
                        <select id='tipoDocumento' name="idTipoDocumento" value={formulario.idTipoDocumento} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                            {tiposDocumentos.map(tipo => (
                        <option key={tipo.idTipoDocumento} value={tipo.idTipoDocumento}>{tipo.tipoDocumento}</option>
                        ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>N° de documento</label>
                        <input type="text" value={formulario.numeroDocumento} name='numeroDocumento' onChange={handleChange}  placeholder='************'/>
                    </div>
                </div>
                <div className="botones">
                        <Link to='/cuentas'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton'>Salir</button>
                            </div>
                        </Link>
                        <button type="submit" className="boton" >Guardar</button>
                </div>
            </form>
        </div>
    );
    
}
export default EditAccountsPage
