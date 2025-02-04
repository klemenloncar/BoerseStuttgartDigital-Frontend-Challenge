import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import { Suspense } from 'react'
import routes from './routes'
import Spinner from '../components/Spinner'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../components/error/ErrorFallback'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { RoutePath } from './Routes.types'

const RequireAuth = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? element : <Navigate to={RoutePath.LOGIN} replace />
}

const RedirectIfAuthenticated = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <Navigate to={RoutePath.DASHBOARD} replace /> : element
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="container-fluid px-0 d-flex flex-column">
          <Suspense fallback={<Spinner />}>
            <Routes>
              {routes.map((route, index) => {
                if (route.path === RoutePath.LOGIN) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<RedirectIfAuthenticated element={route.element} />}
                    />
                  )
                }
                if (route.path === RoutePath.DASHBOARD) {
                  return <Route key={index} path={route.path} element={<RequireAuth element={route.element} />} />
                }
                return <Route key={index} path={route.path} element={route.element} />
              })}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
