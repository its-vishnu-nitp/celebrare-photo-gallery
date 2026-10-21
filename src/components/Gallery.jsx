import { useState, useMemo, useCallback, useReducer, useEffect } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos.js'
import {
  favoritesReducer,
  loadFavorites,
  STORAGE_KEY,
} from '../reducer/favoritesReducer.js'
import SearchBar from './SearchBar.jsx'
import PhotoCard from './PhotoCard.jsx'
import Spinner from './Spinner.jsx'

export default function Gallery() {
  // Requirement 6: data comes from the custom hook.
  const { photos, loading, error } = useFetchPhotos()

  const [query, setQuery] = useState('')

  // Requirement 5: favourites via useReducer (not useState),
  // initialized from localStorage so they persist across refreshes.
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, loadFavorites)

  // Persist favourites whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Storage full or unavailable — favourites still work in-memory.
    }
  }, [favorites])

  // Requirement 7: stable search handler via useCallback.
  // It never changes identity, so child re-renders stay predictable.
  const handleSearch = useCallback((value) => {
    setQuery(value)
  }, [])

  // Requirement 4 + 7: filter by author in real time (no page reload,
  // no extra API calls). useMemo recomputes only when photos or query change.
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', id })
  }, [])

  // Requirement 2: loading spinner while fetching, error message on failure.
  if (loading) return <Spinner />
  if (error) {
    return (
      <p className="py-20 text-center text-red-600">
        Failed to load photos: {error}
      </p>
    )
  }

  return (
    <div>
      <SearchBar value={query} onChange={handleSearch} />
      {filteredPhotos.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          No photos match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        // Requirement 3: responsive grid — 1 col mobile, 2 tablet, 4 desktop.
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
