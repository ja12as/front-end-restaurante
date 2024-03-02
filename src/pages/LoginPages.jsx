import  '../style/loginStyle.css';


function LoginPages() {
    return (
        <div className="login-page">
        <img src="src\img\body login.png" alt="Imagen de fondo" className="bg-image" />
        <div className="login-container">
            <img src="../img/logo 1 negro (1).png" alt="Logo" className="logo" />
            <form className="login-form" method="post">
                <label htmlFor="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" required />
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required />
                <p><a href="../pages/SecurityQuestionsPages.jsx">¿No tienes una cuenta? Regístrate aquí</a></p>
                <input type="submit" value="Ingresar" />
            </form>
        </div>
    </div>
    )
}

export default LoginPages
