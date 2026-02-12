# Filmix

Movie app that lists movies from TMDB, supports search, favorites (stored in Redux + localStorage), and movie detail page.

**Live:** [filmix-tau.vercel.app](https://filmix-tau.vercel.app/)

![App screen](public/app-screen.png)

## Tech stack

- **React** —
- **Vite** —
- **React Router** —
- **Redux (Toolkit)**
- **Redux Saga**
- **Tailwind CSS**
- **Vitest + Testing Library**

Data: TMDB API (Bearer token in `.env` as `VITE_API_ACCESS_TOKEN`).

## Run

```bash
npm install
npm run dev
```

Tests: `npm run test`
