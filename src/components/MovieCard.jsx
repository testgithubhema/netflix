import { Bookmark, BookmarkCheck, Info, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../hooks/useWatchlist'

export default function MovieCard({ movie, compact = false }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inList = isInWatchlist(movie.id)

  const handleImageError = (event) => {
    event.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80'
  }

  return (
    <article className={`movie-card ${compact ? 'movie-card--compact' : ''}`}>
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onError={handleImageError}
        />
        <div className="movie-card__overlay" />
        <div className="movie-card__actions">
          <Link className="icon-btn icon-btn--play" to={`/watch/${movie.id}`} aria-label={`Play ${movie.title}`}>
            <Play size={15} fill="currentColor" />
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-label={inList ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`}
            onClick={() => (inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id))}
          >
            {inList ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          </button>
          <Link className="icon-btn" to={`/movie/${movie.id}`} aria-label={`More information about ${movie.title}`}>
            <Info size={15} />
          </Link>
        </div>
      </div>
      <div className="movie-card__content">
        <div className="movie-card__meta">
          <span className="movie-card__rating">★ {movie.rating}</span>
          <span>{movie.year}</span>
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.genres?.slice(0, 2).join(' • ')}</p>
      </div>
    </article>
  )
}
