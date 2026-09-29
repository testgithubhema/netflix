import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { WatchlistProvider } from './context/WatchlistContext'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Trending from './pages/Trending'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import Watch from './pages/Watch'
import MyList from './pages/MyList'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/watch/:id" element={<Watch />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </WatchlistProvider>
    </AuthProvider>
  )
}

export default App
