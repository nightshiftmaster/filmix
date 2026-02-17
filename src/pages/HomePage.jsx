import React, { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import HeroSection from "../components/HeroSection";
import FilterTabs from "../components/FilterTabs";
import { useHomePageKeyboard } from "../hooks/usePageKeyboard";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("popular");
  useHomePageKeyboard();

  return (
    <div className="w-full min-h-full flex flex-col bg-black overflow-auto">
      <HeroSection />
      <div className="relative z-0 w-full md:px-20 px-4 pt-6">
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <MovieGrid filterId={activeTab} />
      </div>
    </div>
  );
}
