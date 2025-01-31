import './App.css'
import { Navigate, Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={'home'} />
      <Route path="/about" element={'about'} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
