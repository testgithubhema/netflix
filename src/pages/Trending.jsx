import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import ErrorState from '../components/ErrorState'
import { getTrendingMovies } from '../services/movieService'

export default function Trending() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const result = await getTrendingMovies()
        setMovies(result)
      } catch {
        setError('Trending titles could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorState title="Trending unavailable" message={error} />

  return (
    <div className="page">
      <div className="section-header section-header--page">
        <h1>Trending</h1>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
