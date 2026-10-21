# Celebrare — Frontend Intern Pre-Screening Assignment

A photo-gallery app built with **React + Vite + Tailwind CSS** (no other UI libraries), per the assignment PDF ("Celebrare — Frontend Intern Pre-Screening Assignment"). All components are functional components.

## What it does

- Fetches **30 photos** from `https://picsum.photos/v2/list?limit=30` on load
- Shows a **loading spinner** while fetching and an **error message** if the fetch fails
- **Responsive grid**: 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card shows the **photo, author name, and a heart icon button** to favourite it
- **Real-time search by author** — filters instantly, no page reload, no extra API calls
- **Favourites** are managed with `useReducer` (not `useState`) and **persisted in `localStorage`**, so they survive page refreshes

## Project structure

```
photo-gallery/
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
cd photo-gallery
npm install
npm run dev
```
Then open the URL Vite prints (usually http://localhost:5173).

## Push to GitHub (for the submission form)

```bash
cd photo-gallery
git init
git add .
git commit -m "Celebrare pre-screening assignment: photo gallery"
# create a PUBLIC repo named e.g. celebrare-photo-gallery on github.com, then:
git remote add origin https://github.com/<your-username>/celebrare-photo-gallery.git
git branch -M main
git push -u origin main
```

## 5-minute screen-recording script (mandatory)

Record your screen while you talk through the app. Suggested outline — adapt it to your own words, and **make sure you can explain every line** (the PDF says AI tools are allowed, but every line must be explainable):

1. **(0:00–1:00) App overview** — open the app, show the 30 photos loading, type in the search box to filter by author, click a heart, refresh the page and show the favourite is still saved.
2. **(1:00–2:00) The custom hook** — open `src/hooks/useFetchPhotos.js`. Explain: it fetches once on mount (`useEffect` with empty deps), returns `{ photos, loading, error }`, the `cancelled` flag avoids setting state after unmount, and `Gallery.jsx` consumes it with `const { photos, loading, error } = useFetchPhotos()`.
3. **(2:00–3:00) The reducer** — open `src/reducer/favoritesReducer.js`. Explain: favourites are a list of photo ids; `TOGGLE_FAVORITE` adds the id if absent and removes it if present; the reducer is initialized lazily with `loadFavorites()` which reads `localStorage`; a `useEffect` in `Gallery.jsx` writes back to `localStorage` on every change — that's how favourites persist.
4. **(3:00–4:00) useCallback + useMemo** — open `Gallery.jsx`. Explain: `handleSearch` is wrapped in `useCallback` with an empty dependency array so the function identity is stable; `filteredPhotos` is wrapped in `useMemo` depending on `[photos, query]`, so the author filter only recomputes when the photos or the search text change — searching never triggers a new API call or a page reload.
5. **(4:00–5:00) The difficult part** — pick ONE thing you genuinely found hardest and explain what you tried and what worked. (Write your own honest line for the form — see below.)

Upload the recording as **unlisted YouTube** or a **Google Drive link** (anyone with the link can view).

## Submission (Google Form, deadline 23 Oct 2026, 8 PM)

Form: https://forms.gle/fBdouZ18ZnUEtxjdA — you must be **signed in to your own Google account** to open it. It asks for:

1. **Public GitHub link** — the repo you pushed above
2. **Recording link** — the YouTube-unlisted or Drive link
3. **One line: the hardest part of the assignment** — write this in your own words. Honest options (pick the one that is true for you, or write your own):
   - "Getting the useReducer + localStorage sync right so favourites survive refreshes without stale state."
   - "Keeping the search fully client-side with useMemo so filtering by author never triggers a new API call."
   - "Understanding exactly when useCallback vs useMemo actually helps, and choosing the right dependency arrays."

## Requirement checklist (all 7 covered)

- [x] React + Vite project, Tailwind CSS for all styling, no other UI libraries
- [x] Fetch 30 photos on load from the picsum endpoint; loading spinner; error message
- [x] Responsive grid: desktop 4 cols / tablet 2 / mobile 1; card = photo + author + heart
- [x] Search input at top, filters by author in real time, no reload, no API call on search
- [x] Favourites with `useReducer`, persisted in `localStorage`
- [x] Custom hook `useFetchPhotos` returning `{ photos, loading, error }`, used by `Gallery`
- [x] `useCallback` on the search handler, `useMemo` for the filtered list, explained in the video

Verified: `npm run build` passes (vite 6.4.5, 33 modules transformed).
