import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Calendar, MapPin, Zap, XCircle, ArrowLeft,
  CheckCircle, Radio
} from "lucide-react";

// 🔥 API
const API_URL = "http://localhost:8080/api/partidas";

function formatarData(dataStr) {
  return new Date(dataStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Card ─────────────────────────────────────────────────────────────
function BolaoCard({ bolao, selecionado, ativo, onClick }) {
  const isAtivo = ativo?.id === bolao.id;
  const isSelecionado = !isAtivo && selecionado?.id === bolao.id;

  return (
    <button
      onClick={onClick}
      disabled={isAtivo}
      className={`w-full text-left rounded-2xl border p-5
        ${isAtivo
          ? "border-red-500 bg-red-950/20"
          : isSelecionado
          ? "border-red-500 bg-zinc-800"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
        }`}
    >
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-800">
          {isAtivo
            ? <Radio size={20} className="text-red-400 animate-pulse" />
            : <Zap size={20} className={isSelecionado ? "text-red-400" : "text-zinc-500"} />
          }
        </div>

        <div className="flex-1">
          <p className="font-black text-white">
            {bolao.timeCasa} × {bolao.timeFora}
          </p>

          <div className="flex gap-4 text-xs text-zinc-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatarData(bolao.dataHora)}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {bolao.estadio || "—"}
            </span>
          </div>
        </div>

        {isSelecionado && (
          <CheckCircle size={18} className="text-red-500" />
        )}
      </div>
    </button>
  );
}

// ─── Tela ─────────────────────────────────────────────────────────────
function AtivarBolao() {
  const navigate = useNavigate();

  const [partidas, setPartidas] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [ativo, setAtivo] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 BUSCAR PARTIDAS
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPartidas(data))
      .catch(err => console.error(err));
  }, []);

  const handleSelecionar = (bolao) => {
    if (ativo?.id === bolao.id) return;
    setSelecionado(bolao);
  };

  // 🔥 ATIVAR PARTIDA
  const handleAtivar = async () => {
    if (!selecionado) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/${selecionado.id}/ativar`, {
        method: "PATCH"
      });

      const data = await res.json();

      setAtivo(data);
      setSelecionado(null);

    } catch (err) {
      console.error(err);
      alert("Erro ao ativar partida");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CANCELAR ATIVO
  const handleCancelar = async () => {
    try {
      await fetch(`${API_URL}/cancelar-ativo`, {
        method: "PATCH"
      });

      setAtivo(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-black">
            Bolão <span className="text-red-500">Mengão</span>
          </h1>

          <button onClick={() => navigate("/")} className="text-sm text-zinc-400">
            <ArrowLeft size={14} /> Voltar
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-20 space-y-6">

        {/* ATIVO */}
        {ativo && (
          <div className="bg-red-950/20 border border-red-500 p-4 rounded-xl flex justify-between">
            <div>
              <p className="text-xs text-red-400">Ativo</p>
              <p className="font-bold">
                {ativo.timeCasa} × {ativo.timeFora}
              </p>
            </div>

            <button onClick={handleCancelar} className="text-red-400">
              <XCircle size={18} />
            </button>
          </div>
        )}

        {/* LISTA */}
        <div className="space-y-3">
          {partidas.map((p) => (
            <BolaoCard
              key={p.id}
              bolao={p}
              selecionado={selecionado}
              ativo={ativo}
              onClick={() => handleSelecionar(p)}
            />
          ))}
        </div>

        {/* BOTÃO */}
        <button
          onClick={handleAtivar}
          disabled={!selecionado || loading}
          className="w-full py-3 bg-red-600 rounded-xl font-bold"
        >
          {loading ? "Ativando..." : "Ativar Partida"}
        </button>

      </main>
    </div>
  );
}

export default AtivarBolao;