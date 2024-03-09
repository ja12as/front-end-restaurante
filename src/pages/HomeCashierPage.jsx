
import { Link } from "react-router-dom";
import usuario1 from '../assets/usuario6.png';
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
import '../style/home.css'
function HomeCashierPage() {
    return (
        <div className="container2">
            <div className="header">
                <div className="perfil-empleado">
                <img src={usuario1} alt="img-empleado" />
                <p>hola-nom-empleado</p>
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
                        <button class="ingresar" type='submit'>Cerrar Sesion</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HomeCashierPage;