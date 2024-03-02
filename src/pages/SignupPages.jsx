import {useForm} from 'react-hook-form'
import '../style/SignupStyle.css';
function SignupPages() {
    const {register, handleSubmit, errors} = useForm();

    return (
        <div  className='div padre'>
            <h1 className='titulo'>Registro de usuario</h1>
            <form onSubmit={handleSubmit(async(values)=>{
                console.log(values);
            })} >
                <div className='div-col-1'>
                    <div className='div-hijo-col-1'>
                        <label >Nombre</label>
                        <input type="text" {...register("name", { required: true })}  placeholder="Nombre" />
                    </div>
                    <div className='div-hijo-col-1'>
                        <label >Direccion</label>
                        <input type="text" {...register("direccion", { required: true })}  placeholder="Direccion" />
                    </div>
                    <div className='div-hijo-col-1' >
                        <label className="block mb-2">Correo</label>
                        <input type="text" {...register("correo", { required: true })} placeholder="Correo@gmail.com" />
                    </div>
                    <div>
                        <label>Telefono</label>
                        <input type="text" {...register("telefono", { required: true })}  placeholder="000 000 0000" />
                    </div>
                </div>
                <div  className='div-col-2'>
                    <div >
                        <label >Rol</label>
                        <input type="text" {...register("rol", { required: true })}  placeholder="Rol" />
                    </div>
                    <div >
                        <label >Password</label>
                        <input type="text" {...register("Password", { required: true })} placeholder="********" />
                    </div>
                    <div >
                        <label>Tipo de documento</label>
                        <input type="text" {...register("tdocumento", { required: true })}  placeholder="Tipo de documento" />
                    </div>
                    <div>
                        <label>N° de documento</label>
                        <input type="text" {...register("tdocumento", { required: true })}  placeholder="Numero de Documento" />
                    </div>

                    
                </div> 
                <div>
                    <button type='submit' className=''>Salir</button>
                    <button type='submit' className=''>Registrar</button>
                </div>
            </form>
        </div>
    )  
}

export default SignupPages
