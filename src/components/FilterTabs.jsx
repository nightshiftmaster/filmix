import React, { useRef, useEffect } from "react";
import { handleFilterTabsKeyDown } from "../utils/keyboard";

const TABS = [
  { id: "popular", label: "Popular" },
  { id: "now_playing", label: "Airing Now" },
  { id: "favorites", label: "My Favorites" },
];

export default function FilterTabs({ activeTab, onTabChange }) {
  const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
  const timerRef = useRef(null);
  const tabRef = useRef(null);
  const tabsRef = useRef(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    tabRef.current?.focus();
  }, []);

  useEffect(() => () => clear(), []);

  const focusActiveTab = () => tabRef.current?.focus();

  const isFocusFromOutsideTabs = (relatedTarget) =>
    relatedTarget && !tabsRef.current?.contains(relatedTarget);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={tabsRef}
        className="flex gap-0 border-b border-gray-700 justify-center items-center w-fit rounded-t-lg focus-within:outline-2 focus-within:outline-cyan-300 focus-within:animate-[tabsFocusPulse_1.2s_ease-in-out_infinite]"
        data-section="filter-tabs"
        onFocusCapture={() =>
          tabsRef.current?.scrollIntoView?.({
            block: "center",
            inline: "nearest",
            behavior: "smooth",
          })
        }
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            ref={tab.id === activeTab ? tabRef : null}
            aria-current={activeTab === tab.id ? "true" : undefined}
            onClick={() => {
              clear();
              onTabChange(tab.id);
            }}
            onFocus={(e) => {
              if (activeTab === tab.id) return;
              if (isFocusFromOutsideTabs(e.relatedTarget)) {
                focusActiveTab();
                return;
              }
              clear();
              timerRef.current = setTimeout(() => {
                timerRef.current = null;
                onTabChange(tab.id);
              }, 2000);
            }}
            onBlur={clear}
            onKeyDown={(e) =>
              handleFilterTabsKeyDown(e, {
                currentIndex,
                onTabChange,
                TABS,
                clear,
              })
            }
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
