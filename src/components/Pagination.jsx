import React, { useState } from 'react'
export default function Pagination({ setCurrentPage, pagesCount }) {
  const [currentIndex, setCurrentIndex] = useState(1)
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="text-white"
        onClick={() => {
          currentIndex > 1 && setCurrentIndex(currentIndex - 5)
        }}
      >
        Previous
      </button>
      {Array.from({ length: pagesCount })
        .slice(0, 5)
        .map((_, index) => (
          <button
            key={index}
            className="text-white px-4 py-2 font-bold bg-gray-800 rounded-md border border-gray-800 hover:bg-gray-500 hover:text-white"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + currentIndex}
          </button>
        ))}

      <button
        className="text-white"
        onClick={() => setCurrentIndex(currentIndex + 5)}
      >
        Next
      </button>
    </div>
  )
}
