import { useEffect, useState } from 'react'
import { Bookmark, Heart, Play } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import MovieCard from '../components/MovieCard'
import { useWatchlist } from '../hooks/useWatchlist'
import { getMovieById, getRecommendedMovies } from '../services/movieService'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const details = await getMovieById(id)
        if (!details) {
          setError('This movie could not be found.')
          setMovie(null)
          return
        }

        setMovie(details)
        const suggestions = await getRecommendedMovies(details.id)
        setRelated(suggestions)
      } catch {
        setError('Movie details are unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) return <Loader />
  if (error) return <ErrorState title="Movie not found" message={error} />
  if (!movie) return <ErrorState title="Invalid movie ID" message="Please select a valid title from the catalog." />

  const inList = isInWatchlist(movie.id)

  return (
    <div className="page movie-details">
      <section
        className="movie-details__hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(11,11,15,.9), rgba(11,11,15,.3)), url(${movie.backdrop})` }}
      >
        <div className="movie-details__info">
          <img src={movie.poster} alt={movie.title} className="movie-details__poster" loading="lazy" />
          <div>
            <span className="eyebrow">{movie.type === 'tv' ? 'Series' : 'Movie'}</span>
            <h1>{movie.title}</h1>
            <div className="hero-banner__meta">
              <span>{movie.rating} ★</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
            <p>{movie.description}</p>
            <div className="hero-banner__actions">
              <Link className="primary-btn" to={`/watch/${movie.id}`}>
                <Play size={16} fill="currentColor" />
                Play
              </Link>
              <button type="button" className="secondary-btn" onClick={() => (inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id))}>
                <Bookmark size={16} />
                {inList ? 'Added' : 'Add to My List'}
              </button>
              <button type="button" className="secondary-btn" aria-label="Like movie">
                <Heart size={16} />
                Like
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="details-meta">
        <div>
          <h3>Genres</h3>
          <p>{movie.genres?.join(', ')}</p>
        </div>
        <div>
          <h3>Cast</h3>
          <p>{movie.cast?.join(', ')}</p>
        </div>
        <div>
          <h3>Director</h3>
          <p>{movie.director}</p>
        </div>
        <div>
          <h3>Languages</h3>
          <p>{movie.language}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>More Like This</h2>
        </div>
        <div className="movie-grid">
          {related.map((title) => (
            <MovieCard key={title.id} movie={title} />
          ))}
        </div>
      </section>
    </div>
  )
}
