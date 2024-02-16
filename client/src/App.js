import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" />
            <Route path='/login' />
            <Route path='/signup' />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
