import {useForm} from 'react-hook-form'

function SignupPages() {
    const {register, handleSubmit, errors} = useForm();
    return (
        <div>
            <h1>Registro de usuario</h1>
            <form>
                <div>
                    <input type="text" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="text" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="email" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="text"{...register( "name",{required: true}) } placeholder='name'/>
                </div>
                <div>
                    <input type="text" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="password" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="text" {...register( "name",{required: true}) } placeholder='name'/>
                    <input type="text"{...register( "name",{required: true}) } placeholder='name'/>
                </div>
                <button type='submit'>Registrar</button>
                <button type='submit'>Salir</button>
            </form>
        </div>
    )
    
}

export default SignupPages
