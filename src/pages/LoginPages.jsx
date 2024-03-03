import  '../style/loginStyle.css';
import imglogin  from "../assets/logonegro.png";
import imgbodylogin from "../assets/body login.png"
import { Link } from 'react-router-dom';

function LoginPages() {
    return (
        <div className="login-page">
        <img src={imgbodylogin} alt="Imagen de fondo" className="bg-image" />
        <div className="login-container">
            <img src={imglogin}alt="Logo" className="logo" />
            <form className="login-form" method="post">
                <label htmlFor="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" required />
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required />
                <div className='text'>
                    <Link  to="/pregunta">Olvidar Contraseña</Link>
                </div>
                <div>
                    <button type='submit' className='boton'>Ingresar</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default LoginPages
