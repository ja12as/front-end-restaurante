
import { Link } from "react-router-dom";
import '../style/home.css'
import usuario1 from '../assets/usuario1.png';
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
import imgMenu from '../assets/menu1.png';
import imgPerfil from '../assets/perfil1.png';
import imgInventario from '../assets/inventario.png'
import imgReciboPago from '../assets/reciboPago.png';
import imgProveedor from '../assets/proveedor.png';


function HomeAdministratorPage() {
    return (
        <div className="container">
            <div className="header">
                <div className="perfil-empleado">
                <img src={usuario1} alt="img-empleado" />
                <p>hola-nom-empleado</p>
                </div>
            </div>
            <div className="container-menu">
                
                <div className="main-content-adm">
                    <Link to='/registrar-venta'>
                        <div className="img-medio-admin">
                            <img src={imgRegistrocompra} alt="Registro-venta" />
                            <p>Registrar venta</p>
                        </div>
                    </Link>
                    <Link to='/historial-venta'>
                        <div className="img-medio-admin">
                            <img src={imgHistorialFactura} alt="Historial-factura" />
                            <p>Historial factura</p>
                        </div>
                    </Link>
                    <Link to='/menu'>
                        <div className="img-medio-admin">
                            <img src={imgMenu} alt="Registro-menu" />
                            <p>Registro menu</p>
                        </div>
                    </Link>
                    <Link to='/cuentas'>
                        <div className="img-medio-admin">
                            <img src={imgPerfil} alt="perfil" />
                            <p>Perfiles</p>
                        </div>
                    </Link>
                </div>

                <div className="main-content-adm">
                    <Link to='/inventario'>
                        <div className="img-medio-admin">
                            <img src={imgInventario} alt="Registro-inventario" />
                            <p>Inventario</p>
                        </div>  
                    </Link>
                    <Link to='/pagos'>
                        <div className="img-medio-admin">
                            <img src={imgReciboPago} alt="recibo-pago" />
                            <p>pago</p>
                        </div>
                    </Link>
                    <Link to='/provedores'>
                        <div className="img-medio-admin">
                            <img src={imgProveedor} alt="Registro-proveedor" />
                            <p>Proveedor</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="action-button">
                <button className="action-btn">Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default HomeAdministratorPage;