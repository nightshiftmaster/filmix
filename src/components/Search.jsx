import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'

export default function Search() {
  return (
    <div className="absolute bottom-30 z-100 left-0 right-0 w-[90%] md:w-full  md:max-w-lg mx-auto">
      <div className="relative w-full group">
        <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-focus-within:text-gray-700" />
        <input
          type="text"
          placeholder="Search for a movie"
          className="w-full p-2 px-10 text-white text-lg rounded-full bg-gray-600 outline-none focus:bg-white focus:text-gray-700"
        />
      </div>
    </div>
  )
}
