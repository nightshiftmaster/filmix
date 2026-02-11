import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full h-full bg-black p-10 ">
      <img src="/tmdb-logo.svg" alt="TMDB" className="mx-auto mb-2 w-24" />
      <p className="text-white text-center text-sm">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  )
}
