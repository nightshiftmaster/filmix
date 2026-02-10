import React from 'react'
import MovieRow from '../components/MovieRow'
import HeroSection from '../components/HeroSection'
export default function HomePage() {
  return (
    <div className="w-full min-h-full flex flex-col gap-8 bg-black overflow-auto">
      <HeroSection />
      <MovieRow category="Popular" />
    </div>
  )
}
