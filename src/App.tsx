import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Pendentes } from "./pages/Pendentes"
import { Concluidos } from "./pages/Concluidos"
import { ProximasTarefas } from "./pages/ProximasTarefas"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/proximas" element={<ProximasTarefas/>}/>
      <Route path="/pendentes" element={<Pendentes/>}/>
      <Route path="/concluidos" element={<Concluidos/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
