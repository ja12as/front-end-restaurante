/**Pantalla: Pagos 
Historial de pagos 
 * Registrar pago  */
import { Link } from "react-router-dom";

import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
function PaymentsPage() {
    return (
        <div className="container">
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
                    <div className='button-container'>
                    <Link to='/home-admin'>
                        <div className='text-center'>
                            <button className='btn btn-block'>
                                salir
                            </button>
                        </div>
                    </Link>

                </div> 
            </div>
        </div>
    );
}

export default PaymentsPage
