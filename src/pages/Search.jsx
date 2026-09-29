import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import ErrorState from '../components/ErrorState'
import { useDebounce } from '../hooks/useDebounce'
import { searchMovies } from '../services/movieService'

export default function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError('')
      try {
        const matches = await searchMovies(debouncedQuery)
        setResults(matches)
      } catch {
        setError('Search is temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div className="page search-page">
      <div className="section-header section-header--page">
        <h1>Search</h1>
      </div>
      <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />

      {query ? <p className="search-summary">Search results for: {query}</p> : null}

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState title="Search error" message={error} />
      ) : results.length ? (
        <div className="movie-grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState title="No movies found" message="We couldn’t find anything matching that search." />
      )}
    </div>
  )
}
