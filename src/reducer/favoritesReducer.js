export const STORAGE_KEY = 'photo-gallery-favorites'

/**
 * Lazy initializer for useReducer: restores saved favourite ids
 * from localStorage so favourites survive page refreshes.
 */
export function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Reducer for favourite photo ids (array of photo id strings).
 * TOGGLE_FAVORITE adds the id if absent, removes it if present.
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}
