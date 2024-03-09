/**Registrar pago 
Valor pagado 
Medio de pago 
A quien se le pago 
Observación  */


import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../style/RegisterStyle.css';

function RegisterPaymentPage() {
    const {register, handleSubmit, errors} = useForm();
    return (
        <div className='div-padre'>
            <h1 className='titulo'>Registro de Pago</h1>
            <form onSubmit={handleSubmit(async(values)=>{
                console.log(values);
            })} className='formulario'>
                <div className='div-col-1'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Nombre" />
                    </div>
                    <div className='form-group'>
                        <label>Valor a Pagar </label>
                        <input type="text" {...register("precio", { required: true })} placeholder="$col" />
                    </div>
                    <div className='form-group'>
                        <label>Medio de pago  </label>
                        <input type="text" {...register("tPago", { required: true })} placeholder="Medio de pago" />
                    </div>
                    <div className='form-group'>
                        <label>Observacion</label>
                        <input type="number" {...register("observacion", { required: true })} placeholder="Observacion" />
                    </div>
                </div>
                <div className="botones">
                        <Link to='/pagos'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 1'>Salir</button>
                            </div>
                        </Link>
                        <Link to='/pagos'>
                            <div className="img-medio-admin">
                                <button type='submit' className='boton 2'>Guardar</button>
                            </div>
                        </Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPaymentPage
