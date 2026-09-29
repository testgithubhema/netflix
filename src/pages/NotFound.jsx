import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="empty-state empty-state--large">
        <div className="empty-state__icon">404</div>
        <h3>Page not found</h3>
        <p>The page you’re looking for doesn’t exist.</p>
        <Link className="primary-btn" to="/">
          Go Home
        </Link>
      </div>
    </div>
  )
}
