import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login    from "./pages/Login";
import Home     from "./pages/Home";
import Bolao    from "./pages/Bolao";
import Cadastro from "./pages/Cadastro";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"                 element={<Login />} />
        <Route path="/"                      element={<Home />} />
        <Route path="/cadastro-bolao"        element={<Bolao />} />
        <Route path="/cadastro-participante" element={<Cadastro />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
