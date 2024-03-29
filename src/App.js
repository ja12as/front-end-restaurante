import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPages from './pages/LoginPages';
import SignupPages from './pages/SignupPages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />
          <Route path="/home-cajero" element={<SignupPages/>} />
          <Route path="/home-admin" element={<h1>HOME DEL ADMINISTRADOR</h1>} />
          <Route path="/registrar-venta" element={<h1>REGISTRAR VENTAS POR EL CAJERO</h1>} />
          <Route path="/historial-venta" element={<h1>HISTORIAL DE VENTAS</h1>} />
          <Route path="/menu" element={<h1>MENU</h1>} />
          <Route path="/menu/actualizar-menu" element={<h1>ACTUALIZAR MENU</h1>} />
          <Route path="/provedores" element={<h1>PROVEEDORES</h1>} />
          <Route path="/cuentas" element={<h1>CUENTAS DE LOS EMPLEADOS</h1>} />
          <Route path="/dashboard" element={<h1>DASHBOARD</h1>} />
          <Route path="/pagos" element={<h1>PAGOS A LOS EMPLEADOS</h1>} />
          <Route path="/pagos/historial-pago" element={<h1>HISTORIAL DE PAGOS</h1>} />
          <Route path="/pagos/realizar-pago" element={<h1>REALIZAR PAGOS</h1>} />
          <Route path="/inventario" element={<h1>INVENTARIS</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
