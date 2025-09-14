import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import PropertyPage from './PropertyPage'
import './styles.css'

function Root(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/property" element={<PropertyPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<Root/>)
