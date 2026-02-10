import React from 'react'
import Search from './Search'

export default function HeroSection() {
  return (
    <div className="relative h-[60vh] w-full shrink-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.webp"
          alt="hero"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex mt-10 ml-25">
        <h1 className="text-white z-10 md:text-5xl text-4xl font-bold">
          Filmix
        </h1>
      </div>

      <div className="relative z-10 bottom-3 flex justify-center items-center h-[calc(100%-5rem)]">
        <h1 className="text-white md:text-6xl text-4xl font-bold text-center">
          The best movies <br /> in one place
        </h1>
      </div>
      <Search />
    </div>
  )
}
