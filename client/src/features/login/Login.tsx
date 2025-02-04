import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/auth/authSlice'
import './Login.css'
import { RoutePath } from '../../app/Routes.types'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      await dispatch(login({ email, password })).unwrap()

      navigate(RoutePath.DASHBOARD)
    } catch (e) {
      console.error(e)
      setError('Login failed')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="d-flex bst-login justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow">
        <h3 className="text-center mb-4 bst-title">Login • BSDigital</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </button>
          {error && (
            <div className="mt-3 alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
