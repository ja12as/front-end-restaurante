import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPages from './pages/LoginPages';
import HomeAdministratorPage from './pages/HomeAdministratorPage';
import HomeCashierPage from './pages/HomeCashierPage';
import AccountsPage from './pages/AccountsPage';
import EditAccountsPage from './pages/EditAccountsPage';
import MenuPage from './pages/MenuPage';
import EditMenuPage from './pages/EditMenuPage';
import RealEstateInventoriesPage from './pages/RealEstateInventoriesPage';
import EditPropertyInventoriesPage from './pages/EditPropertyInventoriesPage';
import PaymentsPage from './pages/PaymentsPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import RegisterPaymentPage from './pages/RegisterPaymentPage';
import SuppliersPage from './pages/SuppliersPage';
import EditSuppliersPage from './pages/EditSuppliersPage';
import SalesHistoryPage from './pages/SalesHistoryPage';
import RegisterSalepage from './pages/RegisterSalepage';
import SecurityQuestionsPages from './pages/SecurityQuestionsPages';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />                                                 {/*Pagina de iniciar sesion*/}
          <Route path="/home-cajero" element={<HomeCashierPage/>} />                                 {/*pagina Inicial del cajero*/}
          <Route path="/home-admin" element={<HomeAdministratorPage/>} />                            {/*Pagina Inicial del administrador*/}
          <Route path="/registrar-venta" element={<RegisterSalepage/>} />                            {/*pagina de registrar una venta*/}
          <Route path="/historial-venta" element={<SalesHistoryPage/>} />                            {/* pagina para ver el historial de venta*/}
          <Route path="/menu" element={<MenuPage/>} />                                               {/*pagina para listar menu*/}
          <Route path="/menu/actualizar-menu" element={<EditMenuPage/>} />                           {/*pagina para crear el menu*/}
          <Route path="/provedores" element={<SuppliersPage/>} />                                    {/*pagina para listar un proveedor*/}
          <Route path="/provedores/actualizar" element={<EditSuppliersPage/>} />                     {/*Pagina para crear proveedor */}
          <Route path="/cuentas" element={<AccountsPage/>} />                                        {/**/}
          <Route path="/cuentas/id" element={<EditAccountsPage/>} />                                 {/**/}
          <Route path="/dashboard" element={<h1>DASHBOARD</h1>} />                                   {/**/}
          <Route path="/pagos" element={<PaymentsPage/>} />                                          {/**/}
          <Route path="/pagos/historial-pago" element={<PaymentHistoryPage/>} />                     {/**/}
          <Route path="/pagos/realizar-pago" element={<RegisterPaymentPage/>} />                     {/**/}
          <Route path="/inventario" element={<RealEstateInventoriesPage/>} />                        {/**/}
          <Route path="/inventario/actualizar" element={<EditPropertyInventoriesPage/>} />           {/**/}
          <Route path="/pregunta" element={<SecurityQuestionsPages/>} />                             {/**/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
