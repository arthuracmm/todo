import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Pendentes } from "./pages/Pendentes"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/pendentes" element={<Pendentes/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
