import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Shield, AlertCircle, LogIn } from "lucide-react";

function Login() {
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ nome: "", senha: "" });
  const [erro, setErro]       = useState("");
  const [loading, setLoading] = useState(false);

  const set = (campo) => (e) => {
    setErro("");
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 800);
  };

  // Estilos base do input
  const inputStyle = {
    width: "100%",
    backgroundColor: "#27272a",
    border: "1px solid #3f3f46",
    borderRadius: "8px",
    padding: "10px 16px",          // sem padding-left extra — sem ícone dentro
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#09090b" }}
      className="flex items-center justify-center px-4"
    >
      <div style={{ width: "100%", maxWidth: "400px" }} className="space-y-7">

        {/* ── Logo ── */}
        <div className="text-center space-y-2">
          <div
            style={{ backgroundColor: "#dc2626" }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-1"
          >
            <Shield size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Bolão <span style={{ color: "#ef4444" }}>Mengão</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Acesse sua conta
          </p>
        </div>

        {/* ── Card ── */}
        <div
          style={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "28px",
          }}
          className="shadow-2xl"
        >
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                <User size={12} className="text-zinc-500" />
                Nome
              </label>
              <input
                type="text"
                value={form.nome}
                onChange={set("nome")}
                placeholder="Digite seu nome"
                autoComplete="username"
                style={inputStyle}
                onFocus={(e)  => (e.target.style.borderColor = "#ef4444")}
                onBlur={(e)   => (e.target.style.borderColor = "#3f3f46")}
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                <Lock size={12} className="text-zinc-500" />
                Senha
              </label>
              <input
                type="password"
                value={form.senha}
                onChange={set("senha")}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                style={inputStyle}
                onFocus={(e)  => (e.target.style.borderColor = "#ef4444")}
                onBlur={(e)   => (e.target.style.borderColor = "#3f3f46")}
              />
            </div>

            {/* Erro */}
            {erro && (
              <div
                style={{
                  backgroundColor: "rgba(127,29,29,0.3)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                <p style={{ color: "#f87171", fontSize: "12px", fontWeight: 500 }}>
                  {erro}
                </p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#dc2626",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "12px",
                padding: "12px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background-color 0.2s",
                marginTop: "4px",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#b91c1c"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#dc2626"; }}
            >
              {loading ? (
                <span
                  style={{
                    width: "16px", height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              ) : (
                <><LogIn size={16} /> Entrar</>
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-zinc-700">
          Nação Rubro-Negra &copy; {new Date().getFullYear()}
        </p>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Login;