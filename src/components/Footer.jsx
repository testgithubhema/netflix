import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <span className="brand brand--small">
            <span className="brand__mark">S</span>
            <span>StreamFlix</span>
          </span>
        </div>
        <div className="site-footer__links">
          <Link to="/movies">Movies</Link>
          <Link to="/tv-shows">TV Shows</Link>
          <Link to="/my-list">My List</Link>
          <Link to="/profile">Account</Link>
        </div>
      </div>
    </footer>
  )
}
