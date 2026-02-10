import React from 'react'
import MovieGrid from '../components/MovieGrid'
import HeroSection from '../components/HeroSection'
export default function HomePage() {
  return (
    <div className="w-full min-h-full flex flex-col  bg-black overflow-auto">
      <HeroSection />
      <MovieGrid category="Popular" />
    </div>
  )
}
