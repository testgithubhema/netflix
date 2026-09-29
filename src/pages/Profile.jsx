import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="page profile-page">
      <div className="profile-card">
        <div className="profile-card__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'S'}</div>
        <div className="profile-card__content">
          <h1>{user?.name || 'StreamFlix Fan'}</h1>
          <p>{user?.email || 'guest@streamflix.com'}</p>
        </div>
      </div>

      <div className="profile-settings">
        <div className="profile-setting"><span>Account settings</span><strong>Premium</strong></div>
        <div className="profile-setting"><span>Language</span><strong>English</strong></div>
        <div className="profile-setting"><span>Playback</span><strong>Auto</strong></div>
        <button type="button" className="primary-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
