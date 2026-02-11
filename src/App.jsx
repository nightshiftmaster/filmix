import React, { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="flex flex-col h-full justify-between">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
