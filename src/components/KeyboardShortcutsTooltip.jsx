import React from "react";

const kbdClass =
  "inline-flex items-center justify-center min-w-[1.25rem] px-1.5 py-0.5 rounded border border-white/25 bg-white/10 font-mono text-[0.7rem] text-white/90 shadow-sm";

function ShortcutRow({ keys, label }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-white/80">{label}</span>
      <span className="flex items-center gap-1 shrink-0">
        {keys.map((k) => (
          <kbd key={k} className={kbdClass}>
            {k}
          </kbd>
        ))}
      </span>
    </div>
  );
}

export default function KeyboardShortcutsTooltip() {
  return (
    <div className="relative group">
      <span
        className="inline-block text-white/70 group-hover:text-white p-1.5 rounded-2xl border border-white/30 group-hover:border-white/50 text-sm font-mono min-w-8 text-center cursor-default"
        aria-label="Keyboard shortcuts"
      >
        ?
      </span>
      <div className="absolute right-0 top-full mt-2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50">
        <div className="bg-gray-900/95 border border-white/10 rounded-xl py-3 px-4 text-xs shadow-2xl backdrop-blur-sm w-64">
          <p className="text-white/50 text-[0.65rem] uppercase tracking-widest font-medium mb-2.5 px-0.5">
            Home
          </p>
          <div className="space-y-0.5">
            <ShortcutRow keys={["/"]} label="Search" />
            <ShortcutRow keys={["M"]} label="Menu" />
            <ShortcutRow keys={["F"]} label="Films" />
            <ShortcutRow keys={["P"]} label="Pagination" />
            <ShortcutRow keys={["↑", "↓", "←", "→"]} label="Navigte(arrows)" />
            <ShortcutRow keys={["Enter"]} label="Confirm selection" />
          </div>
          <div className="border-t border-white/10 my-2.5" />
          <p className="text-white/50 text-[0.65rem] uppercase tracking-widest font-medium mb-2.5 px-0.5">
            Movie page
          </p>
          <div className="space-y-0.5">
            <ShortcutRow keys={["B"]} label="Back to home" />
            <ShortcutRow keys={["F"]} label="Add to favorites" />
            <ShortcutRow keys={["Esc"]} label="Back to home" />
          </div>
        </div>
      </div>
    </div>
  );
}
