import { Film, SearchX } from 'lucide-react'

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{title?.toLowerCase().includes('search') ? <SearchX size={28} /> : <Film size={28} />}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="primary-btn" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
