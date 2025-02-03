import { Navigate } from 'react-router'
import { lazy } from 'react'

const LoginView = lazy(() => import('../features/login/Login'))
const DashboardView = lazy(() => import('../features/dashboard/Dashboard'))

const routes = [
  { path: '/login', element: <LoginView /> },
  { path: '/dashboard', element: <DashboardView /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> }
]

export default routes
