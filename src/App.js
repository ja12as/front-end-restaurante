import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPages from './pages/LoginPages.jsx';
import HomeAdministratorPage from './pages/HomeAdministratorPage.jsx';
import HomeCashierPage from './pages/HomeCashierPage.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import EditAccountsPage from './pages/EditAccountsPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import EditMenuPage from './pages/EditMenuPage.jsx';
import RealEstateInventoriesPage from './pages/RealEstateInventoriesPage.jsx';
import EditPropertyInventoriesPage from './pages/EditPropertyInventoriesPage.jsx';
import PaymentsPage from './pages/PaymentsPage.jsx';
import PaymentHistoryPage from './pages/PaymentHistoryPage.jsx';
import RegisterPaymentPage from './pages/RegisterPaymentPage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import EditSuppliersPage from './pages/EditSuppliersPage.jsx';
import SalesHistoryPage from './pages/SalesHistoryPage.jsx';
import MakeReportsPage from './pages/MakeReportsPage.jsx';
import SecurityQuestionsPages from './pages/SecurityQuestionsPages.jsx';

import Formulario from './pages/Formulario.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />         rol: user y admin                                {/*Pagina de iniciar sesion*/}
          <Route path="/home-cajero" element={<HomeCashierPage/>} />             rol: user                       {/*pagina Inicial del cajero*/}
          <Route path="/home-admin" element={<HomeAdministratorPage/>} />      rol: admin                      {/*Pagina Inicial del administrador*/}
          <Route path="/registrar-venta" element={<Formulario/>} />                rol: user y admin               {/*pagina de registrar una venta*/}
          <Route path="/historial-venta" element={<SalesHistoryPage/>} />             rol: user y admin                     {/* pagina para ver el historial de venta*/}
          <Route path="/menu" element={<MenuPage/>} />                              rol: admin                    {/*pagina para listar menu*/}
          <Route path="/menu/actualizar-menu" element={<EditMenuPage/>} />          rol: admin                    {/*pagina para crear el menu*/}
          <Route path="/provedores" element={<SuppliersPage/>} />                    rol: admin                   {/*pagina para listar un proveedor*/}
          <Route path="/provedores/actualizar" element={<EditSuppliersPage/>} />     rol: admin                   {/*Pagina para crear proveedor */}
          <Route path="/cuentas" element={<AccountsPage/>} />                          rol: admin                 {/**/}
          <Route path="/cuentas/id" element={<EditAccountsPage/>} />                   rol: admin                 {/**/}
          <Route path="/dashboard" element={<h1>DASHBOARD</h1>} />                    rol: admin                  {/**/}
          <Route path="/pagos" element={<PaymentsPage/>} />                             rol: admin                {/**/}
          <Route path="/pagos/historial-pago" element={<PaymentHistoryPage/>} />        rol: admin                {/**/}
          <Route path="/pagos/realizar-pago" element={<RegisterPaymentPage/>} />        rol: admin                {/**/}
          <Route path="/inventario" element={<RealEstateInventoriesPage/>} />           rol: admin                {/**/}
          <Route path="/inventario/actualizar" element={<EditPropertyInventoriesPage/>} />    rol: admin          {/**/}
          <Route path="/pregunta" element={<SecurityQuestionsPages/>} />                rol: admin                {/**/}
          <Route path="/reporte" element={<MakeReportsPage/>} />   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
