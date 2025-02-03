import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Suspense } from 'react'
import routes from './routes'
import Spinner from '../components/Spinner'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../components/error/ErrorFallback'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="container-fluid px-0 cg-background min-vh-100 d-flex flex-column">
          <Suspense fallback={<Spinner />}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
