import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import ErrorState from '../components/ErrorState'
import { useWatchlist } from '../hooks/useWatchlist'
import { getMovies } from '../services/movieService'

export default function MyList() {
  const { watchlist } = useWatchlist()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchList = async () => {
      try {
        const allMovies = await getMovies()
        setMovies(allMovies.filter((movie) => watchlist.includes(movie.id)))
      } catch {
        setError('Your list could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchList()
  }, [watchlist])

  if (loading) return <Loader />
  if (error) return <ErrorState title="My List unavailable" message={error} />

  return (
    <div className="page">
      <div className="section-header section-header--page">
        <h1>My List</h1>
      </div>
      {movies.length ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your list is empty"
          message="Add a few titles you want to revisit later."
          actionLabel="Explore Movies"
          onAction={() => (window.location.href = '/movies')}
        />
      )}
    </div>
  )
}
