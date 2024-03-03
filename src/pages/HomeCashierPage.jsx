import React from "react";
import { Link } from "react-router-dom";
import '../style/SignupStyle.css';

function HomeCashierPage() {
    return (
        <div className="container">
        <div className="header">
            <div className="perfil-empleado">
            <img src="../img/usuario.jpg" alt="img-empleado" />
            <p>hola-nom-empleado</p>
            </div>
        </div>

        <div className="main-content">
            <Link to="/ruta-imagen-1" style={{ textDecoration: "none" }}>
            <div className="img-medio-cajero">
                <img
                src="../img/registar compras.png"
                alt="Registro-venta"
                style={{
                    maxWidth: "50%",
                    margin: "2%",
                    paddingRight: "50px",
                    paddingLeft: "40px",
                }}
                />
                <p
                style={{
                    color: "black",
                    textDecoration: "overLine",
                    textDecorationColor: "#5AD57F",
                    textDecorationThickness: "3px",
                }}
                >
                Registrar ventas
                </p>
            </div>
            </Link>

            <Link to="/HomeAdministratorPage" style={{ textDecoration: "none" }}>
            <div className="/src/pages/HomeAdministratorPage.jsx">
                <img
                src="../img/historial factura.png"
                alt="Historial-factura"
                style={{
                    maxWidth: "50%",
                    margin: "2%",
                    paddingRight: "50px",
                    paddingLeft: "40px",
                }}
                />
                <p
                style={{
                    color: "black",
                    textDecoration: "overLine",
                    textDecorationColor: "#5AD57F",
                    textDecorationThickness: "3px",
                }}
                >
                Historial de facturas
                </p>
            </div>
            </Link>
        </div>

        <div className="action-button">
            <button className="action-btn">Cerrar Sesión</button>
        </div>
        </div>
    );
}

export default HomeCashierPage;