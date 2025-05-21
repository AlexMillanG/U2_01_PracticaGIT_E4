import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Navbar from './shared/Navbar'
import { Automoviles } from './pages/compPrueba/Automoviles'
import { Cars } from './pages/cars/Cars'
import { Provider } from './pages/Provider/Provider'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/proveedores" element={<Provider />} />
      <Route path="/automoviles" element={<Automoviles />} />

      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
       <Route path="/cars" element={<Cars />} />

       {/* <Route path="/contact" element={<Contact />} />  */}
    </Routes>
    </>
  )
}

export default App
