import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import LiveData from './pages/Customer/LiveData';
import Recharge from './pages/Customer/Recharge';
import Transaction from './pages/Customer/Transaction';
import AdminLiveData from './pages/Admin/AdminLiveData';
import AdminRecharge from './pages/Admin/AdminRecharge';
import AdminTransaction from './pages/Admin/AdminTransaction';
import CustomerInfo from './pages/Admin/CustomerInfo';
import AdminInfo from './pages/SuperAdmin/AdminInfo';
import SuperAdminCustomerInfo from './pages/SuperAdmin/SuperAdminCustomerInfo';
import SuperAdminLiveData from './pages/SuperAdmin/SuperAdminLiveData';
import SuperAdminRecharge from './pages/SuperAdmin/SuperAdminRecharge';
import SuperAdminTransaction from './pages/SuperAdmin/SuperAdminTransaction';
import CreateCustomer from './pages/Admin/CreateCustomer';
import EditCustomer from './pages/Admin/EditCustomer';
import CreateDevice from './pages/Admin/CreateDevice';
import UpdateDevice from './pages/Admin/UpdateDevice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/profile" element={<ProtectedRoute allowedRoles={['customer']}><Profile /></ProtectedRoute>} />
        <Route path="/customer/liveData" element={<ProtectedRoute allowedRoles={['customer']}><LiveData /></ProtectedRoute>} />
        <Route path="/customer/recharge" element={<ProtectedRoute allowedRoles={['customer']}><Recharge /></ProtectedRoute>} />
        <Route path="/customer/transaction" element={<ProtectedRoute allowedRoles={['customer']}><Transaction /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><Profile /></ProtectedRoute>} />
        <Route path="/admin/customerInfo" element={<CustomerInfo />} />
        <Route path="/admin/liveData" element={<ProtectedRoute allowedRoles={['admin']}><AdminLiveData /></ProtectedRoute>} />
        <Route path="/admin/recharge" element={<ProtectedRoute allowedRoles={['admin']}><AdminRecharge /></ProtectedRoute>} />
        <Route path="/admin/transaction" element={<ProtectedRoute allowedRoles={['admin']}><AdminTransaction /></ProtectedRoute>} />
        <Route path="/admin/create-customer" element={<ProtectedRoute allowedRoles={['admin']}><CreateCustomer /></ProtectedRoute>} />
        <Route path="/admin/edit-customer/:customerId" element={<ProtectedRoute allowedRoles={['admin']}><EditCustomer /></ProtectedRoute>} />
        <Route path="/admin/createDevice" element={<ProtectedRoute allowedRoles={['admin']}><CreateDevice /></ProtectedRoute>} />
        <Route path="/admin/updateDevice/:deviceId" element={<ProtectedRoute allowedRoles={['admin']}><UpdateDevice /></ProtectedRoute>} />

        {/* SuperAdmin Routes */}
        <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminDashboard /></ProtectedRoute>} />
        <Route path="/superadmin/profile" element={<ProtectedRoute allowedRoles={['superadmin']}><Profile /></ProtectedRoute>} />
        <Route path="/superadmin/customerInfo" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminCustomerInfo /></ProtectedRoute>} />
        <Route path="/superadmin/liveData" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminLiveData /></ProtectedRoute>} />
        <Route path="/superadmin/recharge" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminRecharge /></ProtectedRoute>} />
        <Route path="/superadmin/transaction" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminTransaction /></ProtectedRoute>} />
        <Route path="/superadmin/adminInfo" element={<ProtectedRoute allowedRoles={['superadmin']}><AdminInfo /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
