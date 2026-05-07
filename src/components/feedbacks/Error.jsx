import './Error.css'

function Error({
  title = 'Something went wrong',
  message = 'We hit a problem while loading this page. Please refresh or try again later.',
  actionText = 'Retry',
  onRetry,
}) {
  return (
    <div className="error-overlay" role="alert" aria-live="assertive">
      <div className="error-card">
        <div className="error-icon" aria-hidden="true">⚠️</div>
        <div className="error-content">
          <h2>{title}</h2>
          <p>{message}</p>
          <button className="error-button" type="button" onClick={onRetry}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error
