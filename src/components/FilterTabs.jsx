import React, { useRef } from "react";

const TABS = [
  { id: "popular", label: "Popular" },
  { id: "now_playing", label: "Airing Now" },
  { id: "favorites", label: "My Favorites" },
];

export default function FilterTabs({ activeTab, onTabChange }) {
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = index > 0 ? index - 1 : TABS.length - 1;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = index < TABS.length - 1 ? index + 1 : 0;
    } else return;
    onTabChange(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center items-center">
      <div
        role="tablist"
        aria-label="Content filter"
        className="flex gap-0 border-b border-gray-700 justify-center items-center w-[85%]"
      >
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            type="button"
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              md:px-6 px-2 md:py-3 py-2 font-medium rounded-t-lg border border-gray-600 text-xs md:text-base border-b-0
              transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
              ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
