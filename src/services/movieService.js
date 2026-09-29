import movies from '../data/movies'

const delay = (value, timeout = 250) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout)
  })

export const getMovies = async () => {
  return delay(movies)
}

export const getMovieById = async (id) => {
  const movie = movies.find((item) => Number(item.id) === Number(id))
  return delay(movie || null)
}

export const searchMovies = async (query = '') => {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return delay(movies)
  }

  const filtered = movies.filter((movie) => {
    const haystack = [
      movie.title,
      movie.description,
      movie.language,
      movie.director,
      ...(movie.genres || []),
      ...(movie.cast || []),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })

  return delay(filtered)
}

export const getTrendingMovies = async () => delay(movies.filter((movie) => movie.trending))

export const getPopularMovies = async () =>
  delay([...movies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)))

export const getRecommendedMovies = async (excludeId = null) => {
  const filtered = movies.filter((movie) => Number(movie.id) !== Number(excludeId))
  return delay(filtered.slice(0, 8))
}

export const getMoviesByGenre = async (genre) =>
  delay(movies.filter((movie) => movie.genres?.includes(genre)))

export const getMoviesByType = async (type) => delay(movies.filter((movie) => movie.type === type))
