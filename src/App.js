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
import RegisterSalepage from './pages/RegisterSalepage.jsx';
import SaleDetailPage from './pages/SaleDetailPage.jsx';
import HomeSalesPage from './pages/HomeSalesPage.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />                                                   {/*Pagina de iniciar sesion*/}
          <Route path="/home-cajero" rol='Cajero' element={<HomeCashierPage/>} />                                   {/*pagina Inicial del cajero*/}
          <Route path="/home-admin"  rol='Administrador' element={<HomeAdministratorPage/>} />                              {/*Pagina Inicial del administrador*/}
          <Route path="/home-venta" rol='Administrador' element={<HomeSalesPage />}/>
          <Route path="/home-venta/registrar-venta" rol='Administrado' element={<RegisterSalepage/>} />                   {/*pagina de registrar una venta*/}
          <Route path="/home-venta/historial-venta" rol='Administrador' element={<SalesHistoryPage/>} />                   {/* pagina para ver el historial de venta*/}
          <Route path="/home-venta/detalle-venta" rol='Administrador' element={<SaleDetailPage/>} />      
          <Route path="/menu" rol='Administrador' element={<MenuPage/>} />                                                 {/*pagina para listar menu*/}
          <Route path="/menu/registro"  rol='Administrador' element={<EditMenuPage/>} />                                              {/*pagina para crear el menu*/}
          <Route path="/provedores" rol='Administrador' element={<SuppliersPage/>} />                                      {/*pagina para listar un proveedor*/}
          <Route path="/provedores/registro" rol='Administrador'  element={<EditSuppliersPage/>} />                         {/*Pagina para crear proveedor */}
          <Route path="/cuentas" rol='Administrador'  element={<AccountsPage/>} />                                          {/**/}
          <Route path="/cuentas/registro" rol='Administrador' element={<EditAccountsPage/>} />                             {/**/}
          <Route path="/pagos" rol='Administrador' element={<PaymentsPage/>} />                                            {/**/}
          <Route path="/pagos/historial-pago" rol='Administrador' element={<PaymentHistoryPage/>} />                       {/**/}
          <Route path="/pagos/realizar-pago" rol='Administrador'  element={<RegisterPaymentPage/>} />                       {/**/}
          <Route path="/inventario" rol='Administrador' element={<RealEstateInventoriesPage/>} />                          {/**/}
          <Route path="/inventario/registro"rol='Administrador'  element={<EditPropertyInventoriesPage/>} />               {/**/}
          <Route path="/reporte" rol='Administrador' element={<MakeReportsPage/>} />   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
