import Gallery from './components/Gallery.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-sm text-gray-500">
            Browse 30 photos · search by author · tap the heart to save favourites
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Gallery />
      </main>
    </div>
  )
}
