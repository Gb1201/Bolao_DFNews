import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Calendar, MapPin, Zap, XCircle, ArrowLeft,
  CheckCircle, Radio, ChevronRight, Clock
} from "lucide-react";

// ─── Mock de bolões ───────────────────────────────────────────────────────────
const boloesMock = [
  { id: 1, jogo: "Flamengo x Vasco",       data: "2026-04-05", horario: "16:00", estadio: "Maracanã" },
  { id: 2, jogo: "Flamengo x Palmeiras",   data: "2026-04-12", horario: "18:30", estadio: "Maracanã" },
  { id: 3, jogo: "Flamengo x Corinthians", data: "2026-04-19", horario: "21:00", estadio: "Neo Química Arena" },
  { id: 4, jogo: "Flamengo x São Paulo",   data: "2026-04-26", horario: "17:00", estadio: "Maracanã" },
  { id: 5, jogo: "Flamengo x Atlético",    data: "2026-05-03", horario: "20:00", estadio: "Arena MRV" },
];

function formatarData(dataStr) {
  return new Date(dataStr + "T00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── BolaoCard ───────────────────────────────────────────────────────────────
function BolaoCard({ bolao, selecionado, ativo, onClick }) {
  const isAtivo      = ativo?.id === bolao.id;
  const isSelecionado = !isAtivo && selecionado?.id === bolao.id;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAtivo}
      className={`
        w-full text-left rounded-2xl border p-5 transition-all duration-200 outline-none
        focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
        ${isAtivo
          ? "border-red-500/60 bg-red-950/25 cursor-not-allowed"
          : isSelecionado
          ? "border-red-500 bg-zinc-800/60 shadow-lg shadow-red-950/20"
          : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-800/40 cursor-pointer"
        }
      `}
      aria-pressed={isSelecionado || isAtivo}
      aria-label={`Selecionar bolão: ${bolao.jogo}`}
    >
      <div className="flex items-center gap-4">

        {/* Ícone / status */}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
          ${isAtivo
            ? "bg-red-600/20 border border-red-500/30"
            : isSelecionado
            ? "bg-red-600/20 border border-red-500/30"
            : "bg-zinc-800 border border-zinc-700"
          }
        `}>
          {isAtivo
            ? <Radio size={20} className="text-red-400 animate-pulse" />
            : <Zap size={20} className={isSelecionado ? "text-red-400" : "text-zinc-500"} />
          }
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className={`font-black text-base leading-tight ${isSelecionado || isAtivo ? "text-white" : "text-zinc-200"}`}>
              {bolao.jogo}
            </p>
            {isAtivo && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Ativo
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Calendar size={11} />
              {formatarData(bolao.data)} às {bolao.horario}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin size={11} />
              {bolao.estadio}
            </span>
          </div>
        </div>

        {/* Check */}
        <div className="flex-shrink-0 ml-2">
          {isAtivo ? (
            <div className="w-6 h-6 rounded-full border-2 border-red-500/50 bg-red-600/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>
          ) : isSelecionado ? (
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-sm shadow-red-950/30">
              <CheckCircle size={14} className="text-white" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border border-zinc-700" />
          )}
        </div>

      </div>
    </button>
  );
}

// ─── AtivarBolao ─────────────────────────────────────────────────────────────
function AtivarBolao({ bolaoAtivo, setBolaoAtivo }) {
  const navigate               = useNavigate();
  const [selecionado, setSelecionado] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  const handleSelecionar = (bolao) => {
    if (bolaoAtivo?.id === bolao.id) return;
    setSelecionado((prev) => prev?.id === bolao.id ? null : bolao);
  };

  const handleAtivar = () => {
    if (!selecionado) return;
    setConfirmando(true);
    setTimeout(() => {
      setBolaoAtivo(selecionado);
      setSelecionado(null);
      setConfirmando(false);
      navigate("/");
    }, 700);
  };

  const handleCancelar = () => {
    setBolaoAtivo(null);
    setSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-950/50">
              <Shield size={18} className="text-white" />
            </div>
            <div className="leading-none">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest hidden sm:block">Sistema de</p>
              <h1 className="text-white font-black text-base tracking-tight">
                Bolão <span className="text-red-500">Mengão</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Zap size={13} className="text-red-500" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">Ativar Bolão</span>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-6">

        {/* Banner bolão ativo */}
        {bolaoAtivo && (
          <div className="flex items-center justify-between gap-4 bg-red-950/25 border border-red-500/40 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-0.5">Bolão em andamento</p>
                <p className="text-white font-black text-base leading-tight">{bolaoAtivo.jogo}</p>
              </div>
            </div>
            <button
              onClick={handleCancelar}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-red-950/30 border border-zinc-700 hover:border-red-500/40 px-3 py-1.5 rounded-xl transition-all duration-200 flex-shrink-0"
              aria-label="Cancelar bolão ativo"
            >
              <XCircle size={13} />
              Cancelar
            </button>
          </div>
        )}

        {/* Título seção */}
        <div>
          <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">
            Selecione um Bolão
          </h2>
          <p className="text-xs text-zinc-600">
            {selecionado ? `"${selecionado.jogo}" selecionado` : "Escolha um jogo para ativar"}
          </p>
        </div>

        {/* Lista de bolões */}
        <div className="space-y-3" role="listbox" aria-label="Lista de bolões disponíveis">
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
            type="button"
            onClick={handleAtivar}
            disabled={!selecionado || confirmando}
            className={`
              flex-1 flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-2xl
              transition-all duration-200 border outline-none
              focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
              ${selecionado && !confirmando
                ? "bg-red-600 hover:bg-red-700 text-white border-red-500/50 hover:border-red-400 shadow-lg shadow-red-950/30 cursor-pointer active:scale-[0.98]"
                : confirmando
                ? "bg-red-700 text-white border-red-600 cursor-wait"
                : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed"
              }
            `}
          >
            {confirmando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Ativando...
              </>
            ) : (
              <>
                <Zap size={16} />
                {selecionado ? `Ativar — ${selecionado.jogo}` : "Selecione um bolão"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="sm:w-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-6 py-3.5 rounded-2xl transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Voltar
          </button>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 py-8 text-center">
        <p className="text-xs text-zinc-700">
          Bolão Mengão &copy; {new Date().getFullYear()} — Nação Rubro-Negra
        </p>
      </footer>

    </div>
  );
}

export default AtivarBolao;