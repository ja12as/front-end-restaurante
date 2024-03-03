/**Pantalla: Inventario de inmuebles 
Lista de inmuebles 
Nombre 
Descripción  
Cantidad  */
import {useForm} from 'react-hook-form'
import '../style/RegisterStyle.css';


function RealEstateInventoriesPage() {
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
                    <button type='submit' className='boton 1'>Salir</button>
                    <button type='submit' className='boton 2'>Registrar</button>
                </div>
            </form>
        </div>
    );

}

export default RealEstateInventoriesPage
