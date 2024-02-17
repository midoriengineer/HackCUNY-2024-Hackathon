import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Testing from "./pages/Testing"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/testing' element={<Testing />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
