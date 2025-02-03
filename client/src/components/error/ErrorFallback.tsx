import { ErrorFallbackProps } from './ErrorFallback.types'

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="text-danger">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="btn btn-primary">
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
