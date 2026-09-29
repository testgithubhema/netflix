import MovieCard from './MovieCard'

export default function MovieRow({ title, movies = [], compact = false }) {
  return (
    <section className="movie-row">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="movie-row__list">
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} compact={compact} />)
        ) : (
          <p className="row-empty">No titles in this row.</p>
        )}
      </div>
    </section>
  )
}
