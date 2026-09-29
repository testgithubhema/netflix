import { Bell, Menu, Search, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV Shows', to: '/tv-shows' },
  { label: 'Trending', to: '/trending' },
  { label: 'My List', to: '/my-list' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <nav className="nav-inner" aria-label="Main navigation">
        <div className="nav-main">
          <Link className="brand" to="/" aria-label="StreamFlix home">
            <span className="brand__mark">S</span>
            <span>StreamFlix</span>
          </Link>

          <div className="nav-links desktop-only">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="nav-actions">
          <Link className="nav-icon" to="/search" aria-label="Search movies">
            <Search size={18} />
          </Link>
          <button type="button" className="nav-icon desktop-only" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <Link className="nav-avatar desktop-only" to="/profile" aria-label="Profile">
            <User size={18} />
          </Link>
          <button type="button" className="nav-menu mobile-only" aria-label="Open menu" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'mobile-menu__link active' : 'mobile-menu__link')}>
              {item.label}
            </NavLink>
          ))}
          <Link className="mobile-menu__link" to="/profile">
            Profile
          </Link>
        </div>
      ) : null}
    </header>
  )
}
