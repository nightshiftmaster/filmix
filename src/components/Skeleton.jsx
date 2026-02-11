import React from 'react'

const pulseClass = 'bg-neutral-800 rounded animate-pulse'

export default function Skeleton({ variant = 'card' }) {
  if (variant === 'card') {
    return (
      <div className={`shrink-0 w-40 rounded-xl overflow-hidden ${pulseClass}`}>
        <div className="w-full aspect-2/3 bg-neutral-700" />
        <div className="p-5 space-y-2">
          <div className="h-3 bg-neutral-700 rounded w-full" />
          <div className="h-3 bg-neutral-700 rounded w-3/4" />
        </div>
      </div>
    )
  }

  if (variant === 'poster') {
    return (
      <div className={`w-full rounded-xl overflow-hidden ${pulseClass}`}>
        <div className="w-full aspect-2/3 bg-neutral-700" />
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className="flex flex-col gap-4 items-center w-full">
        <div className={`h-12 w-3/4 ${pulseClass}`} />
        <div className={`h-5 w-1/2 ${pulseClass}`} />
        <div className={`h-24 w-full max-w-[70%] ${pulseClass}`} />
        <div className={`h-12 w-40 ${pulseClass}`} />
      </div>
    )
  }

  return null
}
