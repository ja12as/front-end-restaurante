/**Pantalla: Menú 
Lista de productos 
Nombre 
Categoría 
Descripción  
Precio 
Editar, crear o desactivar productos  */
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/RegisterStyle.css';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import query  from '../api/axios.js';


function EditMenuPage() {
    const[categorias, setCategorias] = useState([]);
    useEffect(() => {
        const listarCategoria = async () => {
            try {
                const respuestaCategoria = await query.get('/categorias-menus');
                setCategorias(respuestaCategoria.data);
            } catch (error) {
                console.error('error al obtener las categorias', error) ;
            }
        };
        listarCategoria();
    },[]);
    const [formularioMenu, setFormularioMenu]= useState({
        idMenu:uuidv4(),
        nombreMenu:"",
        idCategoriaMenu:"",
        descripcionMenu:"",
        precioMenu:0
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorNumerico =  name === 'numeroProveedor' || name === 'numeroEmpresa'? parseInt(value, 10) : value;
        setFormularioMenu({ ...formularioMenu, [name]: valorNumerico });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {nombreMenu, idCategoriaMenu, descripcionMenu, precioMenu } = formularioMenu;
        
        if (!nombreMenu) {
            alert('El campo Nombre debe estar lleno');
            return;
        }
        if (!idCategoriaMenu) {
            alert('El campo Categoría debe estar lleno');
            return;
        }
        if (!descripcionMenu) {
            alert('El campo Descripción debe estar lleno');
            return;
        }
        if (!precioMenu) {
            alert('El campo Precio debe estar lleno');
            return;
        }
        try {
            const response = await  query.post('/menu', formularioMenu);
            console.log(response.data);
            alert('El formulario se ha guardado exitosamente');
            setFormularioMenu({
                idMenu: uuidv4(),
                nombreMenu: "",
                idCategoriaMenu: "",
                descripcionMenu: "",
                precioMenu: 0
            });
        } catch (error) {
            console.error('Error al enviar los datos al formulario de menu', error);
        }
    };

    const { idMenu } = useParams();
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await query.get(`/menu${idMenu}`);
                setFormularioMenu(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del menú', error);
            }
        };

        fetchMenu();
    }, [idMenu]);
    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Menu</h1>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" value={formularioMenu.nombreMenu}  name='nombreMenu' onChange={handleChange} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Categoría </label>
                        <select id='categoria' name="idCategoriaMenu" value={formularioMenu.idCategoriaMenu}  onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {categorias.map(tipo => (
                            <option key={tipo.idCategoriaMenu} value={tipo.idCategoriaMenu}>{tipo.nombreCategoria}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className='div-col-2'>
                    <div className='form-group'>
                        <label>Descripción  </label>
                        <input type="text" value={formularioMenu.descripcionMenu}  name='descripcionMenu' onChange={handleChange} placeholder="Ingresa sus propiedad" />
                    </div>
                    <div className='form-group'>
                        <label>Precio</label>
                        <input type="number" value={formularioMenu.precioMenu}  name='precioMenu' onChange={handleChange} placeholder="$col" />
                    </div>
                </div>
                <div className="botones">
                        <Link to='/menu'>
                            <div className="img-medio-admin">
                                <button className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <button type='submit' className='boton'>Guardar</button>
                </div>
            </form>
        </div>
    )
}
export default EditMenuPage
