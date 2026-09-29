import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import MovieCard from '../components/MovieCard'
import ErrorState from '../components/ErrorState'
import { getMovies } from '../services/movieService'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getMovies()
        setMovies(result.filter((movie) => movie.type === 'movie'))
      } catch {
        setError('Movies could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorState title="Movies unavailable" message={error} />

  return (
    <div className="page movies-page">
      <div className="section-header section-header--page">
        <h1>Movies</h1>
      </div>
      {movies.length ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState title="No movies found" message="Try another category or come back later." />
      )}
    </div>
  )
}
