import React, { useRef, useEffect } from "react";
import { handleTabsKeysNavigation } from "../utils/keyboard";

const TABS = [
  { id: "popular", label: "Popular" },
  { id: "now_playing", label: "Airing Now" },
  { id: "favorites", label: "My Favorites" },
];

export default function FilterTabs({ activeTab, onTabChange }) {
  const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
  const timerRef = useRef(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => () => clear(), []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-0 border-b border-gray-700 justify-center items-center w-[85%]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              clear();
              onTabChange(tab.id);
            }}
            onFocus={() => {
              clear();
              timerRef.current = setTimeout(() => {
                timerRef.current = null;
                onTabChange(tab.id);
              }, 2000);
            }}
            onBlur={clear}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") clear();
              handleTabsKeysNavigation(e, onTabChange, currentIndex, TABS);
            }}
            className={`
                 outline-none focus:outline-none focus-visible:outline-none
              md:px-6 px-2 md:py-3 py-2 font-medium rounded-t-lg border border-gray-600 text-xs md:text-base border-b-0
              transition-colors
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
