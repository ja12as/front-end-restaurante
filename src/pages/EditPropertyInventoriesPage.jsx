/**Pantalla: Inventario de inmuebles 
Lista de inmuebles 
Nombre 
Descripción  
Cantidad 
Editar, crear o desactivar inmuebles */


import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import query  from '../api/axios.js';


function EditPropertyInventoriesPage() {
    const[usuarios, setUsuario] = useState([]);

    useEffect (() => {
        const listarNumeroDocumentoUsuario = async () =>{
            try {
                const   respuestaNumeroDocumentoUsuario = await query.get('/usuarios');
                setUsuario(respuestaNumeroDocumentoUsuario.data);
            } catch (error) {
                console.error('Error al obtener los numeros de documentos de los empleados' , error);
            }
        }
        listarNumeroDocumentoUsuario();
    },[]);
    
    const [formularioInventario, setFormularioInventario] = useState({
        idInventarioInmueble:uuidv4(),
        nombreInmueble:"",
        descripcionInmueble:"",
        cantidadInmueble:0,
        fechaRegistroInmueble:new Date().toISOString().slice(0,10), 
        numeroDocumento: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorNumerico= name === 'cantidadInmueble' || name === 'idInventarioInmueble'? parseInt(value, 10) : value;
        setFormularioInventario({ ...formularioInventario, [name]: valorNumerico });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await query.post('/inventario-inmueble/crear' , formularioInventario, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            });
            if (response.status !== 200) {
            console.error('Error from backend:', response.status);
            return;
            }
        } catch (error) {
            console.error('Error sending data:', error);
    }
    };

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Inmueble</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" value={formularioInventario.nombreInmueble} name='nombreInmueble' onChange={handleChange} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Descripción </label>
                        <input type="text" value={formularioInventario.descripcionInmueble}  name='descripcionInmueble' onChange={handleChange} placeholder="Ingresa sus propiedades" />
                    </div>
                    <div className='form-group'>
                        <label>Cantidad</label>
                        <input type="number" value={formularioInventario.cantidadInmueble} name='cantidadInmueble' onChange={handleChange} placeholder="1-⊗" />
                    </div>
                    <div className='form-group'>
                        <label>usuario</label>
                        <select id='rol' name="numeroDocumento" value={formularioInventario.numeroDocumento}  onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {usuarios.map(tipo => (
                            <option key={tipo.numeroDocumento} value={tipo.numeroDocumento}>{tipo.nombreCompleto}</option>
                        ))}
                        </select>
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
                    <button type='submit' className='boton'>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default EditPropertyInventoriesPage
