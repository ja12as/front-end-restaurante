import { Link } from "react-router-dom";
import imgRegistrocompra from '../assets/registarCompras.png';
import imgHistorialFactura from '../assets/historialFactura.png';
import imgDetalleventa from '../assets/detalle-venta.png';
import '../style/home.css'

function HomeSalesPage() {
    return (
        <div className="container2">
            <div className="container-menu2">    
                <div className="main-content-adm">
                    <Link to='/home-venta/registrar-venta' className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgRegistrocompra} alt="Registro-venta" />
                            </div>
                            <p>Registrar Venta</p>
                        </div>
                    </Link>
                    <Link to='/home-venta/historial-venta'className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgHistorialFactura} alt="Historial-factura" />
                            </div>
                            <p>Historial de Venta</p>
                        </div>
                    </Link>
                    <Link to='/home-venta/detalle-venta'className="link-sin-subrayado">
                        <div className="div-logo">
                            <div className="img-wrapper">
                                <img src={imgDetalleventa} alt="Historial-factura" />
                            </div>
                            <p>Detalle  Venta</p>
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

export default HomeSalesPage
