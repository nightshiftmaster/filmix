import React from 'react'

export default function MovieSkeleton() {
  return (
    <div className="shrink-0 w-40 rounded-xl overflow-hidden bg-neutral-800 animate-pulse">
      <div className="w-full aspect-2/3 bg-neutral-700" />
      <div className="p-5 space-y-2">
        <div className="h-3 bg-neutral-700 rounded w-full" />
        <div className="h-3 bg-neutral-700 rounded w-3/4" />
      </div>
    </div>
  )
}
