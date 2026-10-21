import { useState, useEffect } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

/**
 * Custom hook that fetches 30 photos once on mount.
 * Returns { photos, loading, error }.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) {
          setPhotos(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load photos')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    // Avoid setting state if the component unmounts mid-fetch.
    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading, error }
}
