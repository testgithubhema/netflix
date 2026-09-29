export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h3>{title}</h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
