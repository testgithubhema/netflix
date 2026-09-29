import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import MovieCard from '../components/MovieCard'
import ErrorState from '../components/ErrorState'
import { getMovies } from '../services/movieService'

export default function TVShows() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const result = await getMovies()
        setShows(result.filter((movie) => movie.type === 'tv'))
      } catch {
        setError('TV shows could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorState title="TV shows unavailable" message={error} />

  return (
    <div className="page">
      <div className="section-header section-header--page">
        <h1>TV Shows</h1>
      </div>
      {shows.length ? (
        <div className="movie-grid">
          {shows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      ) : (
        <EmptyState title="No series found" message="Check back soon for more shows." />
      )}
    </div>
  )
}
