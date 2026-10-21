# Photo Gallery

A responsive photo-gallery app built with **React + Vite + Tailwind CSS** (functional components only, no other UI libraries).

## Features

- Fetches **30 photos** from the Picsum Photos API (`https://picsum.photos/v2/list?limit=30`) on load, with a **loading spinner** and an **error message** if the fetch fails
- **Responsive grid** — 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card shows the **photo, author name, and a heart button** to favourite it
- **Real-time search by author** — filters instantly, with no page reload and no extra API calls
- **Favourites persist** across page refreshes via `localStorage`

## How it works

- **Custom hook** — `src/hooks/useFetchPhotos.js` fetches once on mount and returns `{ photos, loading, error }`; a `cancelled` flag avoids setting state after unmount.
- **Favourites state** — managed with `useReducer` (`src/reducer/favoritesReducer.js`). `TOGGLE_FAVORITE` adds a photo id if absent and removes it if present. The reducer initialises lazily from `localStorage`, and an effect writes the list back on every change — that's how favourites survive refreshes.
- **Search performance** — the search handler is wrapped in `useCallback` and the filtered list in `useMemo`, so filtering by author only recomputes when the photos or the search text change.

## Project structure

```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Page shell (header + Gallery)
    ├── index.css                 # Tailwind import
    ├── hooks/
    │   └── useFetchPhotos.js     # Custom hook → { photos, loading, error }
    ├── reducer/
    │   └── favoritesReducer.js   # useReducer logic + localStorage helpers
    └── components/
        ├── Gallery.jsx           # Main gallery (uses the hook; useCallback/useMemo)
        ├── PhotoCard.jsx         # Photo card with heart button
        ├── SearchBar.jsx         # Search input
        └── Spinner.jsx           # Loading spinner
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Live demo

https://its-vishnu-nitp.github.io/celebrare-photo-gallery/
