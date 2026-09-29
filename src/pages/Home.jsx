import { useEffect, useMemo, useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import CategoryCard from '../components/CategoryCard'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import { useWatchlist } from '../hooks/useWatchlist'
import {
  getMovies,
  getPopularMovies,
  getRecommendedMovies,
  getTrendingMovies,
} from '../services/movieService'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [recommended, setRecommended] = useState([])
  const { continueWatching } = useWatchlist()

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true)
        const [allMovies, trendingMovies, popularMovies, recommendedMovies] = await Promise.all([
          getMovies(),
          getTrendingMovies(),
          getPopularMovies(),
          getRecommendedMovies(),
        ])

        setMovies(allMovies)
        setTrending(trendingMovies)
        setPopular(popularMovies)
        setRecommended(recommendedMovies)
      } catch {
        setError('Unable to load the home page right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeContent()
  }, [])

  const [muted, setMuted] = useState(true)

  const featuredMovie = useMemo(() => movies[0] || trending[0] || null, [movies, trending])

  const continueList = useMemo(
    () =>
      Object.entries(continueWatching)
        .map(([id, progress]) => ({ id: Number(id), progress }))
        .filter(({ id }) => movies.some((movie) => movie.id === id))
        .map(({ id, progress }) => {
          const movie = movies.find((item) => item.id === id)
          return movie ? { ...movie, progress } : null
        })
        .filter(Boolean),
    [continueWatching, movies],
  )

  const rows = [
    { title: 'Trending Now', movies: trending },
    { title: 'Popular Movies', movies: popular.slice(0, 12) },
    { title: 'Top Rated', movies: [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12) },
    { title: 'Action', movies: movies.filter((movie) => movie.genres?.includes('Action')).slice(0, 12) },
    { title: 'Comedy', movies: movies.filter((movie) => movie.genres?.includes('Comedy')).slice(0, 12) },
    { title: 'Drama', movies: movies.filter((movie) => movie.genres?.includes('Drama')).slice(0, 12) },
    { title: 'Sci-Fi', movies: movies.filter((movie) => movie.genres?.includes('Sci-Fi')).slice(0, 12) },
    { title: 'Thriller', movies: movies.filter((movie) => movie.genres?.includes('Thriller')).slice(0, 12) },
    { title: 'Indian Cinema', movies: movies.filter((movie) => ['Hindi', 'Tamil'].includes(movie.language)).slice(0, 12) },
    { title: 'Recommended For You', movies: recommended },
  ]

  if (loading) return <Loader />
  if (error) return <ErrorState title="Home content unavailable" message={error} />

  return (
    <div className="page home-page">
      <HeroBanner movie={featuredMovie} muted={muted} onToggleMute={() => setMuted((value) => !value)} />

      <section className="section-block">
        <div className="section-header">
          <h2>Browse by mood</h2>
        </div>
        <div className="categories-grid">
          <CategoryCard title="Action" subtitle="High intensity" href="/movies" />
          <CategoryCard title="Comedy" subtitle="Feel-good" href="/movies" />
          <CategoryCard title="Drama" subtitle="Character stories" href="/tv-shows" />
          <CategoryCard title="Sci-Fi" subtitle="Future worlds" href="/trending" />
        </div>
      </section>

      {continueList.length ? (
        <section className="section-block">
          <div className="section-header">
            <h2>Continue Watching</h2>
          </div>
          <div className="continue-list">
            {continueList.map((movie) => (
              <div className="continue-card" key={movie.id}>
                <img src={movie.poster} alt={movie.title} loading="lazy" />
                <div className="continue-card__body">
                  <div className="continue-card__topline">
                    <h3>{movie.title}</h3>
                    <span>{movie.progress}%</span>
                  </div>
                  <div className="progress-bar" aria-label={`${movie.progress}% completed`}>
                    <span style={{ width: `${movie.progress}%` }} />
                  </div>
                  <button type="button" className="primary-btn primary-btn--small" onClick={() => window.location.href = `/watch/${movie.id}`}>
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {rows.map((row) => (
        <MovieRow key={row.title} title={row.title} movies={row.movies} />
      ))}
    </div>
  )
}
