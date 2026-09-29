export default function Loader() {
  return (
    <div className="loader-wrap" aria-live="polite" aria-busy="true">
      <div className="loader-spinner" />
      <p>Loading content...</p>
    </div>
  )
}
