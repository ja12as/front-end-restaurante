/*pagina de cuentas--
Lista de cuentas 
Nombre completo  
Tipo de documento 
Numero de documento 
Teléfono 
Dirección 
Correo 
Contraseña 
Rol 
Foto */

import {useForm} from 'react-hook-form'
import '../style/RegisterStyle.css';

function AccountsPage() {
    const {register, handleSubmit, errors} = useForm();

    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Usuario</h1>
            <form onSubmit={handleSubmit(async(values)=>{
                console.log(values);
            })} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Direccion</label>
                        <input type="text" {...register("direccion", { required: true })} placeholder="Direccion" />
                    </div>
                    <div className='form-group'>
                        <label>Correo</label>
                        <input type="email" {...register("correo", { required: true })} placeholder="Correo@gmail.com" />
                    </div>
                    <div className='form-group'>
                        <label>Telefono</label>
                        <input type="text" {...register("telefono", { required: true })} placeholder="000 000 0000" />
                    </div>
                </div>
                <div className='div-col-2'>
                    <div className='form-group'>
                        <label>Rol</label>
                        <input type="text" {...register("rol", { required: true })} placeholder="Rol" />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="text" {...register("Password", { required: true })} placeholder="********" />
                    </div>
                    <div className='form-group'>
                        <label>Tipo de documento</label>
                        <input type="text" {...register("tdocumento", { required: true })} placeholder="Tipo de documento" />
                    </div>
                    <div className='form-group'>
                        <label>N° de documento</label>
                        <input type="text" {...register("tdocumento", { required: true })} placeholder="Numero de Documento" />
                    </div>
                </div>
                <div className="botones">
                    <button type='submit' className='boton 1'>Salir</button>
                    <button type='submit' className='boton 2'>Registrar</button>
                </div>
            </form>
        </div>
    );
    
}

export default AccountsPage
