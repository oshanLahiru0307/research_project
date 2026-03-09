import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { AuthProviderWithStore } from './context/AuthProviderWithStore'

import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Diagnosis from './pages/Diagnosis'
import Patient from './pages/Patient'
<<<<<<< HEAD
import PatientDetails from './pages/PatientDetails'
=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        } 
      />
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/diagnosis/*" element={<Diagnosis />} />
                <Route path="/diagnose/*" element={<Diagnosis />} />
                <Route path="/patient" element={<Patient />} />
<<<<<<< HEAD
                <Route path="/patient/:id" element={<PatientDetails />} />
=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProviderWithStore>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProviderWithStore>
  )
}

export default App
