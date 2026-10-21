export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between px-4 py-3">
        <p className="truncate text-sm font-medium text-gray-800">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavorite}
          className={`rounded-full p-2 transition-colors ${
            isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
