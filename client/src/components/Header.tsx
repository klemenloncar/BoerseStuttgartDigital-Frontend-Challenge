import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import baseLogo from '../assets/logo.svg'
import { RootState } from '../store'
import { logoutUser } from '../store/auth/authSlice'
import { useAppDispatch } from '../store/hooks'

const Header = React.memo(() => {
  const navigate = useNavigate()
  const holdings = useSelector((state: RootState) => state.portfolio.holdings)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()

      navigate('/login')
    } catch (e) {
      console.error(e)
      throw new Error('Logout failed')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
          <img src={baseLogo} alt="Bison Trading App Logo" width="120" className="d-inline-block align-top me-2" />
          <span className="btn btn-primary position-relative">
            CryptoTrading App
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              BS DIGITAL
            </span>
          </span>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="holdingsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Holdings
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="holdingsDropdown">
            {Object.entries(holdings).map(([asset, amount]) => (
              <li key={asset}>
                <span className="dropdown-item-text">
                  <strong>{asset}</strong>:{' '}
                  {asset === 'BTC' ? amount.toFixed(8) : asset === 'EUR' ? amount.toFixed(2) : amount}
                </span>
              </li>
            ))}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
})

export default Header
