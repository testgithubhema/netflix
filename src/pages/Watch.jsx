import { useEffect, useRef, useState } from 'react'
import { Info, Maximize, Pause, Play, Volume2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import MovieCard from '../components/MovieCard'
import { useWatchlist } from '../hooks/useWatchlist'
import { getMovieById, getRecommendedMovies } from '../services/movieService'

export default function Watch() {
  const { id } = useParams()
  const videoRef = useRef(null)
  const [movie, setMovie] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const { setProgress: saveProgress } = useWatchlist()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await getMovieById(id)
        if (!result) {
          setError('This title is not available in the player.')
          return
        }
        setMovie(result)
        setProgress(result.progress || 0)
        const suggestions = await getRecommendedMovies(result.id)
        setRelated(suggestions)
      } catch {
        setError('The player is temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  useEffect(() => {
    if (!movie) return
    saveProgress(movie.id, progress)
  }, [movie, progress, saveProgress])

  const handleTogglePlay = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      await videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration || 1
    const percent = Math.round((current / total) * 100)
    setProgress(percent)
  }

  const handleFullscreen = async () => {
    if (!videoRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      await videoRef.current.requestFullscreen()
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorState title="Video unavailable" message={error} />
  if (!movie) return <ErrorState title="Invalid title" message="Please pick a valid movie or episode." />

  return (
    <div className="page watch-page">
      <div className="watch-player-wrap">
        <video
          ref={videoRef}
          className="watch-player"
          controls
          poster={movie.backdrop}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={movie.trailer || 'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="watch-controls">
        <button type="button" className="icon-btn" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={handleTogglePlay}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
        </button>
        <button type="button" className="icon-btn" aria-label="Volume control">
          <Volume2 size={18} />
        </button>
        <button type="button" className="icon-btn" aria-label="Fullscreen" onClick={handleFullscreen}>
          <Maximize size={18} />
        </button>
        <div className="progress-bar progress-bar--wide" aria-label={`${progress}% watched`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% watched</span>
      </div>

      <section className="watch-details">
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
        </div>
        <div className="watch-details__meta">
          <p><strong>Cast:</strong> {movie.cast?.join(', ')}</p>
          <p><strong>Genre:</strong> {movie.genres?.join(', ')}</p>
        </div>
        <div className="watch-details__actions">
          <Link className="secondary-btn" to={`/movie/${movie.id}`}>
            <Info size={16} />
            View Details
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Related content</h2>
        </div>
        <div className="movie-grid">
          {related.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
