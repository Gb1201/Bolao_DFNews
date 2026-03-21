import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bolao from "./pages/Bolao";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-bolao" element={<Bolao />} />
        <Route path="/cadastro-participante" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
