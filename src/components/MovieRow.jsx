import React from 'react'

export default function MovieRow({ category = 'popular' }) {
  return (
    <div className="w-full h-full">
      <h1 className="text-5xl font-bold text-white">{category}</h1>
    </div>
  )
}
