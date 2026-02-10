import React, { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import Footer from './components/Footer'
function App() {
  return (
    <div className="flex flex-col h-full  justify-between">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<MoviePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
