import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import routes from './routes'

function App() {
  return (
    <Router>
      <div className="container-fluid px-0 cg-background min-vh-100 d-flex flex-column">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  )
}

export default App
