
import { Link } from "react-router-dom";
import '../style/home.css';
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialventa from '../assets/historialFactura.png';
import imgMenu from '../assets/menu1.png';
import imgPerfil from '../assets/perfil2.png';
import imgInventario from '../assets/inventario.png'
import imgReciboPago from '../assets/reciboPago.png';
import imgProveedor from '../assets/proveedor.png';
import {useEffect ,useState } from "react";
import query  from '../api/axios.js';


function HomeAdministratorPage() {
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        const listarImgyNombre = async () => {
            try {
                const response = await query.get('/usuarios', {
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
        <div className="container">
            <div className="header">
                <div className="perfil-empleado">
                    <img src={usuario.rutaFoto} alt="img-empleado" />
                    <p>Hola {usuario.nombreCompleto}</p>
                </div>
            </div>
            <div className="container-menu">
                
                <div className="main-content-adm">
                    <Link to='/registrar-venta' className="link-sin-subrayado">
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
                                <img src={imgHistorialventa} alt="Registro-venta" />
                            </div>
                            <p>Historial de Venta</p>
                        </div>
                    </Link>
                    <Link to='/menu'  className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgMenu} alt="Registro-menu" />
                            </div>
                            <p>Registro menu</p>
                        </div>
                    </Link>
                    <Link to='/cuentas' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgPerfil} alt="perfil" />
                            </div>
                            <p>Perfil Empleado</p>
                        </div>
                    </Link>
                </div>

                <div className="main-content-adm">
                    <Link to='/inventario' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img  src={imgInventario} alt="Registro-inventario" />
                            </div>
                            <p>Inventario</p>
                        </div>  
                    </Link>
                    <Link to='/pagos' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgReciboPago} alt="recibo-pago" />
                            </div>
                            <p>pago</p>
                        </div>
                    </Link>
                    <Link to='/provedores' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgProveedor} alt="Registro-proveedor" />
                            </div>
                            <p>Proveedor</p>
                        </div>
                    </Link>
                </div>
            </div>
                    <Link to='/'>
                        <div className='bbtoon'>
                            <button class="ingresar" type='submit' onClick={cerrarSesion}>Cerrar Sesion</button>
                        </div>
                    </Link>
        </div>
    );
}
export default HomeAdministratorPage;