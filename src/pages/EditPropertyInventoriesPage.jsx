/**Pantalla: Inventario de inmuebles 
Lista de inmuebles 
Nombre 
Descripción  
Cantidad 
Editar, crear o desactivar inmuebles */


import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import '../style/RegisterStyle.css';



function EditPropertyInventoriesPage() {
    const {register, handleSubmit, errors} = useForm();

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Inventario</h1>
            <form onSubmit={handleSubmit(async(values)=>{
                console.log(values);
            })} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Descripción </label>
                        <input type="text" {...register("descripcion", { required: true })} placeholder="Ingresa sus propiedades" />
                    </div>
                    <div className='form-group'>
                        <label>Cantidad</label>
                        <input type="text" {...register("telefono", { required: true })} placeholder="1-⊗" />
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
                    <Link to='/inventario/actualizar'>
                        <div className='text-center my-3'>
                            <button className='boton 1'>
                                Registrar
                            </button>
                        </div>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default EditPropertyInventoriesPage
