import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Calendar, MapPin, Zap, XCircle, ArrowLeft, CheckCircle, Radio } from "lucide-react";

// ─── Mock de bolões ───────────────────────────────────────────────────────────
const boloesMock = [
  { id: 1, jogo: "Flamengo x Vasco",      data: "2026-04-05", horario: "16:00", estadio: "Maracanã" },
  { id: 2, jogo: "Flamengo x Palmeiras",  data: "2026-04-12", horario: "18:30", estadio: "Maracanã" },
  { id: 3, jogo: "Flamengo x Corinthians",data: "2026-04-19", horario: "21:00", estadio: "Neo Química Arena" },
  { id: 4, jogo: "Flamengo x São Paulo",  data: "2026-04-26", horario: "17:00", estadio: "Maracanã" },
  { id: 5, jogo: "Flamengo x Atlético",   data: "2026-05-03", horario: "20:00", estadio: "Arena MRV" },
];

function formatarData(dataStr) {
  return new Date(dataStr + "T00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── BolaoCard ───────────────────────────────────────────────────────────────
function BolaoCard({ bolao, selecionado, ativo, onClick }) {
  const isSelecionado = selecionado?.id === bolao.id;
  const isAtivo       = ativo?.id === bolao.id;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200
        ${isAtivo
          ? "border-red-500 bg-red-950/20 shadow-lg shadow-red-950/30"
          : isSelecionado
          ? "border-red-500/70 bg-zinc-800/80 shadow-md"
          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-800/50"
        }`}
    >
      {/* Badge ativo */}
      {isAtivo && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
          <Radio size={9} />
          Ativo
        </div>
      )}

      {/* Badge selecionado */}
      {isSelecionado && !isAtivo && (
        <div className="absolute top-3 right-3">
          <CheckCircle size={18} className="text-red-400" />
        </div>
      )}

      <div className="flex items-start gap-3 pr-16">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
          ${isAtivo ? "bg-red-600/30 border border-red-500/40" : isSelecionado ? "bg-red-600/20 border border-red-500/30" : "bg-zinc-800 border border-zinc-700"}`}>
          <Zap size={17} className={isAtivo || isSelecionado ? "text-red-400" : "text-zinc-500"} />
        </div>
        <div className="space-y-1.5 min-w-0">
          <p className={`font-black text-base leading-tight ${isAtivo || isSelecionado ? "text-white" : "text-zinc-200"}`}>
            {bolao.jogo}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Calendar size={11} />
              {formatarData(bolao.data)} às {bolao.horario}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin size={11} />
              {bolao.estadio}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AtivarBolao ─────────────────────────────────────────────────────────────
function AtivarBolao({ bolaoAtivo, setBolaoAtivo }) {
  const navigate              = useNavigate();
  const [selecionado, setSelecionado] = useState(null);

  const handleSelecionar = (bolao) => {
    if (bolaoAtivo?.id === bolao.id) return;
    setSelecionado((prev) => prev?.id === bolao.id ? null : bolao);
  };

  const handleAtivar = () => {
    if (!selecionado) return;
    setBolaoAtivo(selecionado);   // ← sobe o estado para o App.jsx
    setSelecionado(null);
    setTimeout(() => navigate("/"), 600);
  };

  const handleCancelar = () => {
    setBolaoAtivo(null);          // ← limpa o estado global
    setSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800 shadow-xl shadow-black/50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-900/50">
              <Shield size={17} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">Sistema de</p>
              <h1 className="text-white font-black text-base tracking-tight">Bolão <span className="text-red-500">Mengão</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Zap size={13} className="text-red-500" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">Ativar Bolão</span>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16 space-y-6">

        {/* Banner bolão ativo */}
        {bolaoAtivo && (
          <div className="flex items-center justify-between gap-4 bg-red-950/30 border border-red-500/40 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div>
                <p className="text-xs uppercase tracking-widest text-red-400 font-semibold">Bolão em andamento</p>
                <p className="text-white font-black text-base">{bolaoAtivo.jogo}</p>
              </div>
            </div>
            <button
              onClick={handleCancelar}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-500/50 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <XCircle size={13} />
              Cancelar Bolão
            </button>
          </div>
        )}

        {/* Divisor */}
        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-zinc-800" />
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Bolões disponíveis</p>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {boloesMock.map((b) => (
            <BolaoCard
              key={b.id}
              bolao={b}
              selecionado={selecionado}
              ativo={bolaoAtivo}
              onClick={() => handleSelecionar(b)}
            />
          ))}
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAtivar}
            disabled={!selecionado}
            className={`flex-1 flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all duration-200 border
              ${selecionado
                ? "bg-red-600 hover:bg-red-700 text-white border-red-500/50 hover:border-red-400 hover:shadow-lg hover:shadow-red-950/50 cursor-pointer"
                : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed"
              }`}
          >
            <Zap size={16} />
            {selecionado ? `Ativar — ${selecionado.jogo}` : "Selecione um bolão"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="sm:w-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-5 py-3 rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Voltar
          </button>
        </div>

      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-700">
        Bolão Mengão &copy; {new Date().getFullYear()} — Nação Rubro-Negra
      </footer>
    </div>
  );
}

export default AtivarBolao;