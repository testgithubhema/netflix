import { Info, Play, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroBanner({ movie, muted, onToggleMute }) {
  if (!movie) return null

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(11, 11, 15, 0.9), rgba(11, 11, 15, 0.25)), url(${movie.backdrop})`,
      }}
    >
      <div className="hero-banner__content">
        <span className="eyebrow">Trending now</span>
        <h1>{movie.title}</h1>
        <div className="hero-banner__meta">
          <span>{movie.rating} ★</span>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span>{movie.type === 'tv' ? 'Series' : 'Movie'}</span>
        </div>
        <p>{movie.description}</p>
        <div className="hero-banner__genres">
          {movie.genres?.slice(0, 3).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
        <div className="hero-banner__actions">
          <Link className="primary-btn" to={`/watch/${movie.id}`}>
            <Play size={16} fill="currentColor" />
            Play Now
          </Link>
          <Link className="secondary-btn" to={`/movie/${movie.id}`}>
            <Info size={16} />
            More Info
          </Link>
          <button type="button" className="icon-pill" aria-label="Toggle mute" onClick={onToggleMute}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </section>
  )
}
