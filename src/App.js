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
import MakeReportsVentaPage from './pages/MakeReportsVentaPage.jsx';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages/>} />                                                 
          <Route path="/home-cajero" rol='Cajero' element={<HomeCashierPage/>} />                            
          <Route path="/home-admin"  rol='Administrador' element={<HomeAdministratorPage/>} />                             
          <Route path="/registrar-venta" rol='Administrado' element={<RegisterSalepage/>} />                  
          <Route path="/historial-venta" rol='Administrador' element={<SalesHistoryPage/>} />                  
          <Route path="/menu" rol='Administrador' element={<MenuPage/>} />                                                
          <Route path="/menu/registro"  rol='Administrador' element={<EditMenuPage/>} /> 
          <Route path="/menu/registro/:idMenu"  rol='Administrador' element={<EditMenuPage/>} />                                       
          <Route path="/provedores" rol='Administrador' element={<SuppliersPage/>} />                                     
          <Route path="/provedores/registro" rol='Administrador'  element={<EditSuppliersPage/>} />
          <Route path="/provedores/registro/:idProveedor" rol='Administrador'  element={<EditSuppliersPage/>} />                           
          <Route path="/cuentas" rol='Administrador'  element={<AccountsPage/>} />                                        
          <Route path="/cuentas/registro" rol='Administrador' element={<EditAccountsPage/>} />
          <Route path="/cuentas/registro/:numeroDocumento" rol='Administrador' element={<EditAccountsPage/>} />                             
          <Route path="/pagos" rol='Administrador' element={<PaymentsPage/>} />                                            
          <Route path="/pagos/historial-pago" rol='Administrador' element={<PaymentHistoryPage/>} />                     
          <Route path="/pagos/realizar-pago" rol='Administrador'  element={<RegisterPaymentPage/>} />                       
          <Route path="/inventario" rol='Administrador' element={<RealEstateInventoriesPage/>} />                        
          <Route path="/inventario/registro"rol='Administrador'  element={<EditPropertyInventoriesPage/>} /> 
          <Route path="/inventario/registro/:idInventarioInmueble"rol='Administrador'  element={<EditPropertyInventoriesPage/>} />               
          <Route path="/reporte-Pago" rol='Administrador' element={<MakeReportsPage/>} />   
          <Route path="/reporte-venta" rol='Administrador' element={<MakeReportsVentaPage/>} />   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App