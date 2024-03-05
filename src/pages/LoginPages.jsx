
import imglogin  from "../assets/logonegro.png";
import imgbodylogin from "../assets/bodyLogin.png"
import { Link } from 'react-router-dom';
import { useState } from 'react'
import query from '../api/axios.js'
import { useNavigate } from 'react-router-dom';

function LoginPages() {
    const [showPassword, setShowPassword] = useState(false);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await query.get(`/inicio-sesion/${correo}/${password}`);
            
            if (response.data) {
                // La autenticación fue exitosa
                navigate('/');
                
                console.log('Inicio de sesión exitoso');
            } else {
                setError('Usuario o contraseña incorrectos');
                // La autenticación falló
                console.log('Inicio de sesión fallido');
            }
        } catch (error) {
            setError('Usuario o contraseña incorrectos');
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div className="login-page">
        <img src={imgbodylogin} alt="Imagen de fondo" className="bg-image" />
        <div className="login-container">
            <img src={imglogin}alt="Logo" className="logo" />
            <form className="login-form" method="post">
                <label htmlFor="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" required  value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                <label htmlFor="contrasena">Contraseña</label>
                <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className="" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn bg-white text-muted" onClick={togglePasswordVisibility}>
                    <span className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></span>
                </button>
                <div className='text'>
                    <Link  to="/pregunta">Olvidar Contraseña</Link>
                </div>
                <div >
                    <button class="boton" onClick={handleLogin}>Ingresar</button>
                </div>
                {error && <div className="text-center text-danger">{error}</div>}
            </form>
        </div>
    </div>
    )
}

export default LoginPages
