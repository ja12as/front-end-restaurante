/**Pantalla: Pagos 
Historial de pagos 
 * Registrar pago  */
import { Link } from "react-router-dom";

import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
import '../style/home.css'
function PaymentsPage() {
    return (
        <div className="container2">
            <div className="container-menu2">    
                <div className="main-content-adm">
                    <Link to='/pagos/realizar-pago' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgRegistrocompra} alt="Registro-venta" />
                            </div>
                            <p>Registrar pago</p>
                        </div>
                    </Link>
                    <Link to='/pagos/historial-pago'className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgHistorialFactura} alt="Historial-factura" />
                            </div>
                            <p>Historial de pago</p>
                        </div>
                    </Link>
                </div> 
                <Link to='/home-admin'className="link-boton">
                    <div className='bbtoon'>
                        <button class="ingresar" type='submit'>Salir</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PaymentsPage
