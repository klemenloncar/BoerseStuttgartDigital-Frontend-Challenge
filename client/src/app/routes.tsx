import { Navigate } from 'react-router'
import Login from '../features/login/Login'
import Dashboard from '../features/dashboard/Dashboard'

const routes = [
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <Navigate to="/" replace /> }
]

export default routes
