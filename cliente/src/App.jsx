import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

function App() {

  return (
    <>
    <h1>hola</h1>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
    </>
  )
}

export default App
