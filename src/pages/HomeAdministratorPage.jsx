import React from "react";
import { Link } from "react-router-dom";
import '../style/SignupStyle.css';

function HomeAdministratorPage() {
    return (
        <div className="container">
        <div className="header">
            <div className="perfil-empleado">
            <img src="../img/usuario.jpg" alt="img-empleado" />
            <p>hola-nom-empleado</p>
            </div>
        </div>

        <div className="main-content-adm">
            <div className="img-medio-admin">
            <img src="../img/registar compras.png" alt="Registro-venta" />
            <p>Registrar venta</p>
            </div>

            <div className="img-medio-admin">
            <img src="../img/historial factura.png" alt="Historial-factura" />
            <p>Historial factura</p>
            </div>

            <div className="img-medio-admin1">
            <img src="../img/menu 1.png" alt="Registro-menu" />
            <p>Registro menu</p>
            </div>

            <div className="img-medio-admin1">
            <img src="../img/perfil 1.png" alt="perfil" />
            <p>Perfiles</p>
            </div>
        </div>

        <div className="main-content-adm">
            <div className="img-medio-admin">
            <img src="../img/registar compras.png" alt="Registro-compra" />
            <p>Registro compras</p>
            </div>  

            <div className="img-medio-admin">
            <img src="../img/recibo pago.png" alt="Historial-factura" />
            <p>Recibo pago</p>
            </div>

            <div className="img-medio-admin">
            <img src="../img/proveedor.png" alt="Registro-venta" />
            <p>Proveedor</p>
            </div>
        </div>

        <div className="action-button">
            <button className="action-btn">Cerrar Sesión</button>
        </div>
        </div>
    );
}

export default HomeAdministratorPage;