
import { Link } from "react-router-dom";
import usuario1 from '../assets/usuario1.png';
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
function HomeCashierPage() {
    return (
        <div className="container">
            <div className="header">
                <div className="perfil-empleado">
                <img src={usuario1} alt="img-empleado" />
                <p>hola-nom-empleado</p>
                </div>
            </div>
            <div className="container-menu">    
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
                    <div className="action-button">
                        <button className="action-btn">Cerrar Sesión</button>
                </div> 
            </div>
        </div>
    );
}

export default HomeCashierPage;