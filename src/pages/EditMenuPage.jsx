/**Pantalla: Menú 
Lista de productos 
Nombre 
Categoría 
Descripción  
Precio 
Editar, crear o desactivar productos  */

import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';

function EditMenuPage() {
    const {register, handleSubmit, errors} = useForm();
    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Menu</h1>
            <form onSubmit={handleSubmit(async(values)=>{
                console.log(values);
            })} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Categoría </label>
                        <input type="text" {...register("categoria", { required: true })} placeholder="Ingresa la categoria" />
                    </div>
                    <div className='form-group'>
                        <label>Descripción  </label>
                        <input type="text" {...register("descripcion", { required: true })} placeholder="Ingresa sus propiedad" />
                    </div>
                    <div className='form-group'>
                        <label>Precio</label>
                        <input type="number" {...register("precio", { required: true })} placeholder="$col" />
                    </div>
                </div>
                <div className="botones">
                        <Link to='/menu'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <Link to='/menu'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 2'>Registrar</button>
                            </div>
                        </Link>
                </div>
            </form>
        </div>
    )
}

export default EditMenuPage
