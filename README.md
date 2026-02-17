# Filmix

Movie app that lists movies from TMDB, supports search, favorites (stored in Redux + localStorage), and movie detail page.

**Live:** [filmix-tau.vercel.app](https://filmix-tau.vercel.app/)

![App screen](public/app-screen.png)

## Tech stack

- **React**
- **Vite**
- **React Router**
- **Redux (Toolkit)**
- **Redux Saga**
- **Tailwind CSS**
- **Motion**
- **Vitest + Testing Library**

## Keyboard navigation

The application is fully navigable using the keyboard.

### Home
- `/` — Focus search
- `M` — Open menu
- `F` — Focus movies grid
- `P` — Focus pagination
- `Arrow keys` — Navigate between items
- `Enter` — Confirm selection

### Movie page
- `B` — Back to home
- `F` — Add to favorites
- `Esc` — Back to home

## Run

```bash
npm install
npm run dev
```

Tests: `npm run test`

Movies data comes from [TMDB](https://www.themoviedb.org/). Create a `.env` file and add your API token: `VITE_API_ACCESS_TOKEN=your_bearer_token`.
