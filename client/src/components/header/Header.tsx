import React from 'react'
import { HeaderProps } from './Header.types'
import { Link } from 'react-router'

import baseLogo from '../../assets/logo.svg'

const Header = React.memo(({ availableBTC, availableEUR, username }: HeaderProps) => {
  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={baseLogo} alt="Bison Trading App Logo" width="120" className="d-inline-block align-top me-2" />
          <span className="btn btn-primary position-relative">
            Trading App
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {username}
            </span>
          </span>
        </Link>
        <div className="d-flex">
          <span className="navbar-text">
            Available: {availableBTC} <strong>BTC</strong> | {availableEUR} <strong>EUR</strong>
          </span>
        </div>
      </div>
    </nav>
  )
})

export default Header
