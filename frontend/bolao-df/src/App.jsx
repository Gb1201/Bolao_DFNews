import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home          from "./pages/Home";
import Bolao         from "./pages/Bolao";
import Cadastro      from "./pages/Cadastro";
import Login         from "./pages/Login";
import Profile       from "./pages/Profile";
import AtivarBolao   from "./pages/Ativarbolao";

function App() {
  // Estado global do bolão ativo — compartilhado entre Home e AtivarBolao
  const [bolaoAtivo, setBolaoAtivo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"                 element={<Login />} />
        <Route path="/"                      element={<Home bolaoAtivo={bolaoAtivo} />} />
        <Route path="/cadastro-bolao"        element={<Bolao />} />
        <Route path="/cadastro-participante" element={<Cadastro />} />
        <Route path="/profile"               element={<Profile />} />
        <Route
          path="/ativar-bolao"
          element={
            <AtivarBolao
              bolaoAtivo={bolaoAtivo}
              setBolaoAtivo={setBolaoAtivo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
