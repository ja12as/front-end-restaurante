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
                    <Link to='/pagos/realizar-pago'>
                        <div className="img-medio-admin">
                            <img src={imgRegistrocompra} alt="Registro-venta" />
                            <p>Registrar pago</p>
                        </div>
                    </Link>
                    <Link to='/pagos/historial-pago'>
                        <div className="img-medio-admin">
                            <img src={imgHistorialFactura} alt="Historial-factura" />
                            <p>Historial de pago</p>
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
