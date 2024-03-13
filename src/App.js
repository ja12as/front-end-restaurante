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
import RegisterSalepage from './pages/RegisterSalepage.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />                                                   {/*Pagina de iniciar sesion*/}
          <Route path="/home-cajero" element={<HomeCashierPage/>} />                                   {/*pagina Inicial del cajero*/}
          <Route path="/home-admin" element={<HomeAdministratorPage/>} />                              {/*Pagina Inicial del administrador*/}
          <Route path="/registrar-venta" element={<RegisterSalepage/>} />                                    {/*pagina de registrar una venta*/}
          <Route path="/historial-venta" element={<SalesHistoryPage/>} />                              {/* pagina para ver el historial de venta*/}
          <Route path="/menu" element={<MenuPage/>} />                                                 {/*pagina para listar menu*/}
          <Route path="/menu/registro" element={<EditMenuPage/>} />                             {/*pagina para crear el menu*/}
          <Route path="/provedores" element={<SuppliersPage/>} />                                      {/*pagina para listar un proveedor*/}
          <Route path="/provedores/registro" element={<EditSuppliersPage/>} />                       {/*Pagina para crear proveedor */}
          <Route path="/cuentas" element={<AccountsPage/>} />                                          {/**/}
          <Route path="/cuentas/registro" element={<EditAccountsPage/>} />                                   {/**/}
          <Route path="/dashboard" element={<h1>DASHBOARD</h1>} />                                     {/**/}
          <Route path="/pagos" element={<PaymentsPage/>} />                                            {/**/}
          <Route path="/pagos/historial-pago" element={<PaymentHistoryPage/>} />                       {/**/}
          <Route path="/pagos/realizar-pago" element={<RegisterPaymentPage/>} />                       {/**/}
          <Route path="/inventario" element={<RealEstateInventoriesPage/>} />                          {/**/}
          <Route path="/inventario/registro" element={<EditPropertyInventoriesPage/>} />             {/**/}
          <Route path="/pregunta" element={<SecurityQuestionsPages/>} />                               {/**/}
          <Route path="/reporte" element={<MakeReportsPage/>} />   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
