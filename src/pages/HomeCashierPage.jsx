
import { Link } from "react-router-dom";
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
import {useEffect ,useState } from "react";
import '../style/home.css'
import query  from '../api/axios.js';
function HomeCashierPage() {
    const [usuario, setUsuario] = useState({});
    const numeroDocumento = localStorage.getItem('numeroDocumento'); // Asume que guardas el id del usuario en el localStorage al iniciar sesión

useEffect(() => {
    const listarImgyNombre = async () => {
        try {
            const response = await query.get(`/usuarios/${numeroDocumento}`, { // Nota el cambio aquí
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            });
            setUsuario(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        };
        listarImgyNombre();
    }, []);

    const cerrarSesion  = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
}

    return (
        <div className="container2">
            <div className="header">
                <div className="perfil-empleado">
                    {usuario && <img src={usuario.rutaFoto} alt="img-empleado" />}
                    {usuario && <p>Hola {usuario.nombreCompleto}</p>}
                </div>
            </div>
            <div className="container-menu2">    
                <div className="main-content-adm">
                    <Link to='/registrar-venta'className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgRegistrocompra} alt="Registro-venta" />
                            </div>
                            <p>Registrar venta</p>
                        </div>
                    </Link>
                    <Link to='/historial-venta' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgHistorialFactura} alt="Historial-factura" />
                            </div>
                            <p>Historial venta</p>
                        </div>
                    </Link>
                </div>
                <Link to='/' className="link-boton">
                    <div className='bbtoon'>
                        <button class="ingresar" type='submit' onClick={cerrarSesion}>Cerrar Sesion</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HomeCashierPage;