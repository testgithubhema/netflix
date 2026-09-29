import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search movies, genres, cast...' }) {
  return (
    <div className="searchbar" role="search">
      <Search size={18} className="searchbar__icon" />
      <input
        aria-label="Search content"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {value ? (
        <button type="button" className="searchbar__clear" aria-label="Clear search" onClick={onClear}>
          <X size={16} />
        </button>
      ) : null}
    </div>
  )
}
