import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPages from './pages/LoginPages';
import SignupPages from './pages/SignupPages';
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


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />
          <Route path="/signub" element={<SignupPages/>} />
          <Route path="/home-cajero" element={<HomeCashierPage/>} />
          <Route path="/home-admin" element={<HomeAdministratorPage/>} />
          <Route path="/registrar-venta" element={<RegisterSalepage/>} />
          <Route path="/historial-venta" element={<SalesHistoryPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/menu/actualizar-menu" element={<EditMenuPage/>} />
          <Route path="/provedores" element={<SuppliersPage/>} />
          <Route path="/provedores/actualizar" element={<EditSuppliersPage/>} />
          <Route path="/cuentas" element={<AccountsPage/>} />
          <Route path="/cuentas/id" element={<EditAccountsPage/>} />
          <Route path="/dashboard" element={<h1>DASHBOARD</h1>} />
          <Route path="/pagos" element={<PaymentsPage/>} />
          <Route path="/pagos/historial-pago" element={<PaymentHistoryPage/>} />
          <Route path="/pagos/realizar-pago" element={<RegisterPaymentPage/>} />
          <Route path="/inventario" element={<RealEstateInventoriesPage/>} />
          <Route path="/inventario/actualizar" element={<EditPropertyInventoriesPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
