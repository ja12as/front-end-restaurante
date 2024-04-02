
import { location } from 'react-router-dom';
import {Navigate} from "react-router-dom";

const ValidacionRutas = ({ children, rol }) => {
    const isLoggedIn = localStorage.getItem('token') !== null;
        if (!isLoggedIn) {
            return <Navigate to="/" />;
        }
        const allowedRoutes = {
            admin: ['/home-admin', '/home-venta', '/home-venta/registrar-venta' , '/home-venta/historial-venta' , '/home-venta/detalle-venta', '/menu','/menu/registro','/provedores','="/provedores/registro','/cuentas','/cuentas/registro','/pagos','/pagos/historial-pago','/pagos/realizar-pago','/inventario','/inventario/registro','/reporte'], // Admin-specific routes
            cajero: ['/home-cajero', '/home-venta/registrar-venta' , '/home-venta/historial-venta'] 
        };

    const storedRole = localStorage.getItem('rol'); // Get role from localStorage

        if (!isLoggedIn || !storedRole) {
        // Redirect if not logged in or role not found
        return <Navigate to="/" />;
        }

        if (!allowedRoutes[storedRole] || !allowedRoutes[storedRole].includes(location.pathname)) {
        return <Navigate to="/" />; // Redirect if unauthorized
        }

    return <>{children}</>;
};

export default ValidacionRutas;