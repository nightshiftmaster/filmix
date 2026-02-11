import { Link } from 'react-router-dom'
import React from 'react'

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center py-6 px-8 md:px-12 ">
      <Link to="/" onClick={scrollToTop}>
        <h1 className="text-white md:text-5xl text-4xl font-bold">Filmix</h1>
      </Link>
    </header>
  )
}
