import { useNavigate } from "react-router-dom";
import {
  Users, Trophy, Settings, User, Shield, Calendar,
  BarChart2, PlusCircle, Zap, MapPin, Radio, TrendingUp,
  Clock, ChevronRight, Star, Activity
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const participantes = [
  { id: 1, nome: "Carlos Mendes",   jogos: 12, vitorias: 9, empates: 2, derrotas: 1 },
  { id: 2, nome: "Ana Paula",       jogos: 12, vitorias: 8, empates: 3, derrotas: 1 },
  { id: 3, nome: "Ricardo Lima",    jogos: 12, vitorias: 7, empates: 3, derrotas: 2 },
  { id: 4, nome: "Fernanda Costa",  jogos: 12, vitorias: 6, empates: 4, derrotas: 2 },
  { id: 5, nome: "Thiago Rocha",    jogos: 12, vitorias: 5, empates: 3, derrotas: 4 },
  { id: 6, nome: "Juliana Ferraz",  jogos: 12, vitorias: 4, empates: 5, derrotas: 3 },
  { id: 7, nome: "Marcos Andrade",  jogos: 12, vitorias: 3, empates: 4, derrotas: 5 },
  { id: 8, nome: "Patrícia Nunes",  jogos: 12, vitorias: 2, empates: 3, derrotas: 7 },
];

const calcPontos = (p) => p.vitorias * 3 + p.empates;
const calcTaxa   = (p) => Math.round((p.vitorias / p.jogos) * 100);
const classificados = [...participantes].sort((a, b) => calcPontos(b) - calcPontos(a));

function formatarData(dataStr) {
  return new Date(dataStr + "T00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function getInitials(nome) {
  return nome.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent = false }) {
  return (
    <div className={`
      rounded-2xl p-5 flex items-center gap-4 border transition-all duration-200
      ${accent
        ? "bg-red-600 border-red-500 shadow-lg shadow-red-950/40"
        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
      }
    `}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
        ${accent ? "bg-red-500/40" : "bg-zinc-800"}`}>
        <Icon size={20} className={accent ? "text-white" : "text-red-400"} />
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-red-200" : "text-zinc-500"}`}>
          {label}
        </p>
        <p className={`text-2xl font-black leading-tight ${accent ? "text-white" : "text-white"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function PodiumCard({ participante, posicao }) {
  const medals = {
    1: { bg: "bg-red-600",    ring: "ring-2 ring-red-400",    pts: "text-red-400",    label: "1°", h: "h-28" },
    2: { bg: "bg-zinc-500",   ring: "ring-2 ring-zinc-400",   pts: "text-zinc-400",   label: "2°", h: "h-20" },
    3: { bg: "bg-amber-700",  ring: "ring-2 ring-amber-500",  pts: "text-amber-400",  label: "3°", h: "h-16" },
  };
  const m = medals[posicao];

  return (
    <div className={`flex flex-col items-center gap-3 ${posicao === 2 ? "order-1" : posicao === 1 ? "order-2" : "order-3"}`}>
      {posicao === 1 && (
        <Star size={16} className="text-red-400 fill-red-400" />
      )}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center
        font-black text-lg text-white bg-zinc-800 ${m.ring}
        ${posicao === 1 ? "w-20 h-20 text-xl shadow-lg shadow-red-950/30" : ""}
      `}>
        {getInitials(participante.nome)}
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-white leading-tight">
          {participante.nome.split(" ")[0]}
        </p>
        <p className={`text-xs font-black ${m.pts}`}>{calcPontos(participante)} pts</p>
      </div>
      <div className={`${m.h} w-20 ${m.bg} rounded-t-xl flex items-end justify-center pb-2`}>
        <span className="text-white text-xs font-black">{m.label}</span>
      </div>
    </div>
  );
}

function RankRow({ participante, index }) {
  const pos = index + 1;
  const pts = calcPontos(participante);
  const taxa = calcTaxa(participante);
  const barWidth = Math.round((pts / (classificados[0] ? calcPontos(classificados[0]) : 1)) * 100);

  const posStyle = pos === 1
    ? "bg-red-600 text-white"
    : pos === 2
    ? "bg-zinc-500 text-white"
    : pos === 3
    ? "bg-amber-700 text-white"
    : "bg-zinc-800 text-zinc-400";

  return (
    <tr className="group border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors duration-150">
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black ${posStyle}`}>
          {pos}
        </span>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
            {getInitials(participante.nome)}
          </div>
          <span className={`font-semibold text-sm ${pos <= 3 ? "text-white" : "text-zinc-300"}`}>
            {participante.nome}
          </span>
        </div>
      </td>
      <td className="py-3.5 px-4 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full w-20">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 w-8">{taxa}%</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-center text-xs text-zinc-500 hidden sm:table-cell">{participante.jogos}</td>
      <td className="py-3.5 px-4 text-center">
        <span className="text-xs font-bold text-emerald-400">{participante.vitorias}</span>
      </td>
      <td className="py-3.5 px-4 text-center hidden sm:table-cell">
        <span className="text-xs font-bold text-yellow-400">{participante.empates}</span>
      </td>
      <td className="py-3.5 px-4 text-center hidden sm:table-cell">
        <span className="text-xs font-bold text-red-400">{participante.derrotas}</span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <span className="text-sm font-black text-white">{pts}</span>
      </td>
    </tr>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────
function Home({ bolaoAtivo }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
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

          {/* Pill central */}
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Trophy size={13} className="text-red-500" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">Temporada 2026</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/participantes"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <Settings size={13} />
              Participantes
            </a>
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600/20 flex items-center justify-center transition-all duration-200 border border-zinc-800 hover:border-red-500/50"
              aria-label="Perfil"
            >
              <User size={15} className="text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">

        {/* ── Hero Banner (bolão ativo) ── */}
        {bolaoAtivo ? (
          <section className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/50 via-zinc-900 to-zinc-900 p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,38,0.12),transparent_60%)]" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <Radio size={24} className="text-red-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Ao vivo
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{bolaoAtivo.jogo}</h2>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Calendar size={11} />
                      {formatarData(bolaoAtivo.data)} às {bolaoAtivo.horario}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin size={11} />
                      {bolaoAtivo.estadio}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/ativar-bolao")}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-xl transition-all duration-200 self-start sm:self-center"
              >
                Gerenciar
                <ChevronRight size={14} />
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <Zap size={22} className="text-zinc-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-0.5">Sem bolão ativo</p>
                  <h2 className="text-xl font-black text-zinc-400">Nenhum bolão em andamento</h2>
                  <p className="text-sm text-zinc-600 mt-0.5">Ative um bolão para começar a apostar</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/ativar-bolao")}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-red-950/30 border border-red-500/50 self-start sm:self-center"
              >
                <Zap size={15} />
                Ativar Bolão
              </button>
            </div>
          </section>
        )}

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={Users}      label="Participantes"  value={participantes.length} />
          <StatCard icon={Trophy}     label="Jogos"          value="12" />
          <StatCard icon={Activity}   label="Líder"          value={classificados[0].nome.split(" ")[0]} />
          <StatCard icon={TrendingUp} label="Pontos líderes" value={calcPontos(classificados[0])} accent />
        </section>

        {/* ── Pódio ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy size={18} className="text-red-500" />
            <h2 className="text-lg font-black text-white tracking-tight">Pódio da Temporada</h2>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex justify-center items-end gap-6 sm:gap-12">
              <PodiumCard participante={classificados[1]} posicao={2} />
              <PodiumCard participante={classificados[0]} posicao={1} />
              <PodiumCard participante={classificados[2]} posicao={3} />
            </div>
          </div>
        </section>

        {/* ── Tabela Classificação ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 size={18} className="text-red-500" />
            <h2 className="text-lg font-black text-white tracking-tight">Classificação Completa</h2>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-12">#</th>
                    <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">Jogador</th>
                    <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500 hidden md:table-cell">Taxa</th>
                    <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 hidden sm:table-cell">J</th>
                    <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-emerald-600">V</th>
                    <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-yellow-600 hidden sm:table-cell">E</th>
                    <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-red-500 hidden sm:table-cell">D</th>
                    <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-white">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {classificados.map((p, i) => (
                    <RankRow key={p.id} participante={p} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Ações rápidas ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Zap size={16} className="text-red-500" />
            <h2 className="text-base font-black text-white tracking-tight">Ações Rápidas</h2>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="/cadastro-participante"
              className="group flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-colors duration-200">
                <Users size={20} className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">Novo Participante</p>
                <p className="text-xs text-zinc-500 mt-0.5">Cadastre um novo membro</p>
              </div>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200" />
            </a>
            <a
              href="/cadastro-bolao"
              className="group flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700 transition-colors duration-200">
                <PlusCircle size={20} className="text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">Novo Bolão</p>
                <p className="text-xs text-zinc-500 mt-0.5">Cadastre um novo jogo</p>
              </div>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200" />
            </a>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-600/20 flex items-center justify-center">
              <Shield size={12} className="text-red-500" />
            </div>
            <span className="text-xs font-bold text-zinc-600">Bolão Mengão</span>
          </div>
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} — Nação Rubro-Negra &hearts;
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;