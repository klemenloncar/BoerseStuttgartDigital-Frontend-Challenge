import { Navigate } from 'react-router'
import { lazy } from 'react'
import { RoutePath } from './Routes.types'

const LoginView = lazy(() => import('../features/login/Login'))
const DashboardView = lazy(() => import('../features/dashboard/Dashboard'))

const routes = [
  { path: RoutePath.LOGIN, element: <LoginView /> },
  { path: RoutePath.DASHBOARD, element: <DashboardView /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> }
]

export default routes
