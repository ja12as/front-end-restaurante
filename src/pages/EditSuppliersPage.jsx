/**  
Pantalla: Proveedores 
Lista de proveedores	 
Nombre personal 
Numero personal 
Nombre empresa 
Numero empresa 
Descripción 
Correo 
Editar, crear o desactivar proveedores */

import {useForm} from 'react-hook-form'
import '../style/SignupStyle.css';


function EditSuppliersPage() {
        const {register, handleSubmit, errors} = useForm();
    
        return (
            <div className='div-padre'>
                <h1 className='titulo'>Registro de Proveedores</h1>
                <form onSubmit={handleSubmit(async(values)=>{
                    console.log(values);
                })} className='formulario'>
                    <div className='div-col-1'>
                        <div className='form-group'>
                            <label>Nombre personal </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Nombre" />
                        </div>
                        <div className='form-group'>
                            <label>Numero personal </label>
                            <input type="text" {...register("direccion", { required: true })} placeholder="123456789" />
                        </div>
                        <div className='form-group'>
                            <label>Correo</label>
                            <input type="text" {...register("correo", { required: true })} placeholder="Correo@gmail.com" />
                        </div>
                    </div>
                    <div className='div-col-2'>
                        <div className='form-group'>
                            <label>Nombre empresa </label>
                            <input type="text" {...register("rol", { required: true })} placeholder="Empresa" />
                        </div>
                        <div className='form-group'>
                            <label>Numero empresa</label>
                            <input type="text" {...register("Password", { required: true })} placeholder="123456789" />
                        </div>
                        <div className='form-group'>
                            <label>Descripción </label>
                            <input type="text" {...register("tdocumento", { required: true })} placeholder="descripcion" />
                        </div>
                    </div>
                    <div className="botones">
                        <button type='submit' className='boton'>Salir</button>
                        <button type='submit' className='boton'>Registrar</button>
                    </div>
                </form>
            </div>
        );
}

export default EditSuppliersPage
