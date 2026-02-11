import React, { useState } from 'react'
import MovieGrid from '../components/MovieGrid'
import HeroSection from '../components/HeroSection'
import FilterTabs from '../components/FilterTabs'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('popular')

  const categoryLabel =
    activeTab === 'popular'
      ? 'Popular'
      : activeTab === 'now_playing'
        ? 'Airing Now'
        : 'My Favorites'

  return (
    <div className="w-full min-h-full flex flex-col bg-black overflow-auto">
      <HeroSection />
      <div className="w-full md:px-20 px-4 pt-6">
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <MovieGrid category={categoryLabel} filterId={activeTab} />
      </div>
    </div>
  )
}
