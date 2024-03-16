
import { Link } from "react-router-dom";
import '../style/home.css';
import usuario1 from '../assets/usuario1.png';
import imgRegistrocompra from '../assets/registarCompras.png';
import imgMenu from '../assets/menu1.png';
import imgPerfil from '../assets/perfil2.png';
import imgInventario from '../assets/inventario.png'
import imgReciboPago from '../assets/reciboPago.png';
import imgProveedor from '../assets/proveedor.png';


function HomeAdministratorPage() {
    const cerrarSesion  = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
    }
    
    return (
        <div className="container">
            <div className="header">
                <div className="perfil-empleado">
                <img src={usuario1} alt="img-empleado" />
                <p>Roboto Condensed</p>
                </div>
            </div>
            <div className="container-menu">
                
                <div className="main-content-adm">
                    <Link to='/home-venta' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgRegistrocompra} alt="Registro-venta" />
                            </div>
                            <p>Venta</p>
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