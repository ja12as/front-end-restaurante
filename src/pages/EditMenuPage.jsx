
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import query  from '../api/axios.js';

function EditMenuPage() {
    const { idMenu } = useParams();
    const isEditMode = !!idMenu;

    const [categorias, setCategorias] = useState([]);
    const [formularioMenu, setFormularioMenu] = useState({
        idMenu: isEditMode ? idMenu : uuidv4(),
        nombreMenu:"",
        idCategoriaMenu:"",
        descripcionMenu:"",
        precioMenu:0
    });
    const [errorsCategorias, setErrorsCategorias] = useState({
        nombreMenu:"",
        idCategoriaMenu:"",
        descripcionMenu:"",
        precioMenu:0
    });

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const respuestaCategoria = await query.get('/categorias-menus', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCategorias(respuestaCategoria.data);
            } catch (error) {
                console.error('Error al obtener las categorias:', error);
            }
        };
    
        fetchCategorias();
    
        if (isEditMode) {
            const listarMenuActualizar = async () => {
                try {
                    const response = await query.get(`/menu/${idMenu}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormularioMenu(response.data);
    
                    // Establecer el valor seleccionado del select con la categoría del menú
                    setFormularioMenu(prevState => ({
                        ...prevState,
                        idCategoriaMenu: response.data.idCategoriaMenu.idCategoriaMenu
                    }));
                } catch (error) {
                    console.error('Error al obtener los datos del menú', error);
                }
            };
    
            listarMenuActualizar();
        }
    }, [idMenu, isEditMode]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormularioMenu(prevState => ({
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

        // Validar nombre solo letras y caracteres especiales
        if (name === 'nombreMenu') {
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
        if (name === 'precioMenu') {
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
        if (name === 'descripcionMenu' && value.length > 50) {
            setErrorsCategorias(prevErrors => ({
                ...prevErrors,
                [name]: 'La descripción no puede tener más de 50 caracteres'
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { nombreMenu, idCategoriaMenu, descripcionMenu, precioMenu } = formularioMenu;
    
        // Validar que todos los campos estén llenos
        if (!nombreMenu || !idCategoriaMenu || !descripcionMenu || !precioMenu) {
            alert('Debe completar todos los campos antes de enviar el formulario');
            return;
        }
              // Validar si hay errores en los campos
        const errors = Object.values(errorsCategorias).filter(error => error !== '');
    
        if (errors.length > 0) {
          // Mostrar los errores al usuario
            alert('Por favor, corrija los siguientes errores:\n' + errors.join('\n'));
            return;
        }
    
        try {
            let response;
        
            if (isEditMode) {
                response = await query.put(`/menu/${idMenu}`, formularioMenu, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                });
            } else {
                response = await query.post('/menu', formularioMenu, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                });
            }
        
            console.log(response.data);
            alert('El formulario se ha guardado exitosamente');
            setFormularioMenu({
                idMenu: isEditMode ? idMenu : uuidv4(),
                nombreMenu: '',
                idCategoriaMenu: '',
                descripcionMenu: '',
                precioMenu: 0,
            });
        } catch (error) {
            console.error('Error sending data:', error);
            }
        };
        
    

    return (
        <div className='div-padre'>
            <h1 className='titulo'>{isEditMode ? 'Editar Menú' : 'Registro de Menú'}</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                <div className='form-group'>
                    <label className={errorsCategorias.nombreMenu ? 'required-field' : ''}>Nombre</label>
                    <input type="text" value={formularioMenu.nombreMenu} name='nombreMenu' onChange={handleChange} placeholder="Nombre" className={errorsCategorias.nombreMenu ? 'error' : ''} />
                    {errorsCategorias.nombreMenu && (<div className="error-message">{errorsCategorias.nombreMenu}</div>)}
                </div>
                <div className='form-group'>
                    <label className={errorsCategorias.descripcionMenu ? 'required-field' : ''}>Descripción</label>
                    <input type="text" value={formularioMenu.descripcionMenu} name='descripcionMenu' onChange={handleChange} placeholder="Ingresa sus propiedades" className={errorsCategorias.descripcionMenu ? 'error' : ''} />
                    {errorsCategorias.descripcionMenu && (<div className="error-message">{errorsCategorias.descripcionMenu}</div>)}
                </div>
                <div className='form-group'>
                    <label className={errorsCategorias.precioMenu ? 'required-field' : ''}>Precio</label>
                    <input type="number" value={formularioMenu.precioMenu} name='precioMenu' onChange={handleChange} placeholder="$col" className={errorsCategorias.precioMenu ? 'error' : ''} />
                    {errorsCategorias.precioMenu && (<div className="error-message">{errorsCategorias.precioMenu}</div>)}
                </div>
                <div className='form-group'>
                    <label className={errorsCategorias.idCategoriaMenu ? 'required-field' : ''}>Categoría</label>
                    <select id='categoria' name="idCategoriaMenu" value={formularioMenu.idCategoriaMenu} onChange={handleChange} className={errorsCategorias.idCategoriaMenu ? 'error' : ''}>
                        <option value="">Seleccione...</option>
                        {categorias.map(tipo => (
                            <option key={tipo.idCategoriaMenu} value={tipo.idCategoriaMenu}>{tipo.nombreCategoria}</option>
                        ))}
                    </select>
                    {errorsCategorias.idCategoriaMenu && (<div className="error-message">{errorsCategorias.idCategoriaMenu}</div>)}
                </div>

                </div>
                <div className="botones">
                        <Link to='/menu'>
                            <div className="img-medio-admin">
                                <button className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton'>{isEditMode ? 'Guardar Cambios' : 'Crear Menú'}</button>
                </div>
            </form>
        </div>
    )
}
export default EditMenuPage
