# BoerseStuttgartDigital-Frontend-Challenge

[![React][react-badge]][react-url]
[![Docker][docker-badge]][docker-url]

## Description

An React-based web application that provides a **simulated** trading experience, allowing users to manage a virtual portfolio and
analyze cryptocurrency trends with interactive charts.

### Features

1. **React V18 Frontend - `client`**
   - **Global notification system** for displaying various notifications
   - Login page (`/login`) with `AuthGuard` - lazy loaded routes
   - Login form (username / password)
   - Dashboard page (`/dashboard`) that displays **Crypto chart**, **trading interface** and **portfolio summary**.
   - Debounced search input
   - Redux slices (store)
   - Backend (server) is mocked

### Prerequisites

1. **Git** - for cloning repository
2. **Docker** - docker containerization is available (`DOCKERFILE` and `docker-compose.yml`)

## Getting Started

1. Clone the repository (`git@github.com:<YOUR_USERNAME>/BoerseStuttgartDigital-Frontend-Challenge.git`)
2. Add a `.env` file to the root of the project
   - Add content: `APP_ENV=development`
3. Build and run the Docker container
   - **docker-compose up -d** (**d** parameter is optional)
4. Running Without Docker (Manual Setup)
   - For client: **cd client -> npm install -> npm run dev**
5. Default Ports
   - Client: **5173**
6. Login Credentials:
   - username: **simon@bsdigital.com**
   - password: **test123**

### Additional notes

1. **GitHub Actions (pipeline)**
   - Simple pipeline was added.

[react-badge]: https://img.shields.io/badge/React-v18+-blue.svg
[react-url]: https://react.dev/
[docker-badge]: https://img.shields.io/badge/docker-blue
[docker-url]: https://www.docker.com/
