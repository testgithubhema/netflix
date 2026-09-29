import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage('streamflix_watchlist', [])
  const [continueWatching, setContinueWatching] = useLocalStorage('streamflix_continue_watching', {})

  const addToWatchlist = (movieId) => {
    setWatchlist((current) => (current.includes(movieId) ? current : [...current, movieId]))
  }

  const removeFromWatchlist = (movieId) => {
    setWatchlist((current) => current.filter((id) => id !== movieId))
  }

  const isInWatchlist = (movieId) => watchlist.includes(movieId)

  const setProgress = (movieId, progress) => {
    setContinueWatching((current) => ({ ...current, [movieId]: progress }))
  }

  const value = {
    watchlist,
    continueWatching,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    setProgress,
  }

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

